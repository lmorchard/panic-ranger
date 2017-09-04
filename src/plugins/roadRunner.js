import * as Core from '../lib/core';
import { distance, cacheCall } from '../lib/utils';

export const MSG_DESTINATION_REACHED = 'roadRunnerDestinationReached';

const INFINITY = 1000000000;

export class Road extends Core.Component {
  static defaults() {
    return {
      type: 'main',
      range: 1000,
      neighbors: {}
    };
  }
}

Core.registerComponent('Road', Road);

export class Runner extends Core.Component {
  static defaults() {
    return {
      target: 'main',
      range: 1000,
    };
  }
}

Core.registerComponent('Runner', Runner);

export class RoadRunnerSystem extends Core.System {

  defaultOptions() {
    return {
      debug: true,
      debugRange: false,
      debugRoads: true,
      debugRunners: true,
      debugPath: true,
      positionSystemName: 'Position',
      floydWarshallTTL: 1000,
      astarCacheTTL: 1000,
      pathfindingStrategy: 'cachedAstar'
    };
  }

  initialize() {
    this.positionSystem = this.world.getSystem(this.options.positionSystemName);
    this.mapNeighbor = this.mapNeighbor.bind(this);
    this.findNearest = this.findNearest.bind(this);
    this.floydWarshallInit();
  }

  update(timeDelta) {
    this.updateRoads(timeDelta);
    this.updateRunners(timeDelta);
  }

  updateRoads(timeDelta) {
    const measure = this.options.debug && Math.random() < 0.1;

    if (measure) console.time('updateRoads');
    const roads = this.world.get('Road');
    for (const entityId in roads) {
      const road = roads[entityId];
      const position = this.world.get('Position', entityId);
      const range = road.range;
      road.neighbors = {};
      this.positionSystem.quadtree.iterate(
        {
          left: position.left - range,
          top: position.top - range,
          right: position.right + range,
          bottom: position.bottom + range
        },
        this.mapNeighbor,
        [range, road, position]
      );
    }
    if (this.options.pathfindingStrategy === 'floydWarshall') {
      this.floydWarshallUpdate(timeDelta);
    }
    if (measure) console.timeEnd('updateRoads');
  }

  updateRunners(timeDelta) {
    const measure = this.options.debug && Math.random() < 0.1;

    if (measure) console.time('updateRunners');
    const runners = this.world.get('Runner');
    for (const entityId in runners) {
      // Find throttle & seeker for steering, otherwise bail out.
      const thruster = this.world.get('Thruster', entityId);
      const seeker = this.world.get('Seeker', entityId);
      if (!seeker || !thruster) { continue; }

      // If we don't have a destination, bail out.
      const runner = runners[entityId];
      if (!runner.destination) { continue; }

      // Find nearby path elements
      const position = this.world.get('Position', entityId);
      const range = runner.range;
      runner.nearestDist = null;
      runner.nearest = null;
      this.positionSystem.quadtree.iterate(
        {
          left: position.left - range,
          top: position.top - range,
          right: position.right + range,
          bottom: position.bottom + range
        },
        this.findNearest,
        [range, runner, position]
      );
      if (!runner.nearest) { continue; }

      // Update our path from nearest path element to destination
      runner.path = null;
      switch (this.options.pathfindingStrategy) {
        case 'floydWarshall':
          runner.path = this.floydWarshallPath(runner.nearest, runner.destination);
          break;
        case 'cachedAstar':
          runner.path = cacheCall(
            this.options.astarCacheTTL,
            `astar:${runner.nearest}:${runner.destination}`,
            this, 'astar',
            runner.nearest, runner.destination
          );
          break;
        case 'astar':
        default:
          runner.path = this.astar(runner.nearest, runner.destination);
      }
      if (runner.path === null) { continue; }

      // If we have a next step in the path, seek it.
      const nextId = runner.path[1];
      if (nextId) {
        thruster.throttle = 1.0;
        seeker.active = true;
        seeker.targetEntityId = nextId;
        continue;
      }

      // We're down to the last step in the path, time for a landing.
      const destinationPosition =
        this.world.get('Position', runner.destination);
      const distanceToDestination =
        distance(position, destinationPosition);
      if (distanceToDestination > 100) {
        // Close but not yet at the destination, so throttle back to help
        // prevent just orbiting it.
        thruster.throttle = 0.25;
        seeker.active = true;
        seeker.targetEntityId = runner.destination;
      } else {
        // Close enough to the destination, so stop seeking and call it.
        seeker.active = false;
        seeker.targetEntityId = null;
        this.world.publish(MSG_DESTINATION_REACHED, entityId);
      }
    }
    if (measure) console.timeEnd('updateRunners');
  }

  mapNeighbor(neighborPosition, [range, road, position]) {
    const neighborId = neighborPosition.entityId;
    if (position.entityId === neighborId) { return; }

    const neighborRoad = this.world.get('Road', neighborId);
    if (!neighborRoad) { return; }

    const dist = distance(position, neighborPosition);
    if (dist > range) { return; }

    road.neighbors[neighborId] = dist;
  }

  findNearest(neighborPosition, [range, runner, position]) {
    const neighborId = neighborPosition.entityId;
    if (position.entityId === neighborId) { return; }

    const neighborRoad = this.world.get('Road', neighborId);
    if (!neighborRoad) { return; }

    const dist = distance(position, neighborPosition);
    if (runner.nearestDist !== null && dist > runner.nearestDist) { return; }

    runner.nearest = neighborId;
    runner.nearestDist = dist;
  }

  // https://en.wikipedia.org/wiki/A-star#Pseudocode
  astar(startId, goalId) {
    const roads = this.world.get('Road');

    // The set of nodes already evaluated
    const closedSet = new Set();

    // The set of currently discovered nodes that are not evaluated yet.
    // Initially, only the start node is known.
    const openSet = new Set([startId]);

    // For each node, which node it can most efficiently be reached from.
    // If a node can be reached from many nodes, cameFrom will eventually contain the
    // most efficient previous step.
    const cameFrom = new Map();

    // For each node, the cost of getting from the start node to that node.
    const gScore = new Map();

    // The cost of going from start to start is zero.
    gScore.set(startId, 0);

    // For each node, the total cost of getting from the start node to the goal
    // by passing by that node. That value is partly known, partly heuristic.
    const fScore = new Map();

    // For the first node, that value is completely heuristic.
    fScore.set(startId, this.astarHeuristicCostEstimate(startId, goalId));

    while (openSet.size > 0) {
      // Find the node in openSet having the lowest fScore[] value
      let currentId = null;
      let currentCost = INFINITY;
      for (const key of openSet) {
        const itemCost = fScore.has(key) ? fScore.get(key) : INFINITY;
        if (itemCost < currentCost) {
          currentCost = itemCost;
          currentId = key;
        }
      }

      if (currentId === goalId) {
        return this.astarReconstructPath(cameFrom, currentId);
      }

      openSet.delete(currentId);
      closedSet.add(currentId);

      const neighbors = roads[currentId].neighbors || {};
      for (const neighborId in neighbors) {
        if (closedSet.has(neighborId)) {
          // Ignore the neighbor which is already evaluated.
          continue;
        }

        if (!closedSet.has(neighborId)) {
          // Discover a new node
          openSet.add(neighborId);
        }

        // The distance from start to a neighbor
        const tentative_gScore =
          gScore.get(currentId) + neighbors[neighborId];
        const neighbor_gScore = gScore.has(neighborId)
          ? gScore.get(neighborId) : INFINITY;
        if (tentative_gScore >= neighbor_gScore) {
          // This is not a better path.
          continue;
        }

        // This path is the best until now. Record it!
        cameFrom.set(neighborId, currentId);
        gScore.set(neighborId, tentative_gScore);
        fScore.set(neighborId,
          gScore.get(neighborId)
          + this.astarHeuristicCostEstimate(neighborId, goalId));
      }
    }

    return null;
  }

  astarHeuristicCostEstimate(startId, goalId) {
    return distance(
      this.world.get('Position', startId),
      this.world.get('Position', goalId)
    );
  }

  astarReconstructPath(cameFrom, startId) {
    let pathId = startId;
    const totalPath = [pathId];
    while (cameFrom.has(pathId)) {
      pathId = cameFrom.get(pathId);
      totalPath.unshift(pathId);
    }
    return totalPath;
  }

  // https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm#Path_reconstruction
  floydWarshallInit() {
    this.floydWarshallLastUpdate = Date.now();
    this.fwDist = new Map();
    this.fwNext = new Map();
  }

  floydWarshallKey(u, v) {
    return [u, v].sort().join(':');
  }

  floydWarshallUpdate(timeDelta) {
    const now = Date.now();
    if (now - this.floydWarshallLastUpdate < this.options.floydWarshallTTL) { return; }
    this.floydWarshallLastUpdate = now;

    console.time('floydWarshallUpdate');
    const roads = this.world.get('Road');
    this.fwDist.clear();
    this.fwNext.clear();
    for (const roadId in roads) {
      const road = roads[roadId];
      for (const neighborId in road.neighbors) {
        const key = `${roadId}:${neighborId}`;
        this.fwDist.set(key, road.neighbors[neighborId]);
        this.fwNext.set(key, neighborId);
      }
    }
    for (const k in roads) {
      for (const i in roads) {
        for (const j in roads) {
          const ij = `${i}:${j}`;
          const ik = `${i}:${k}`;
          const kj = `${k}:${j}`;
          const dij = this.fwDist.get(ij) || INFINITY;
          const dik = this.fwDist.get(ik) || INFINITY;
          const dkj = this.fwDist.get(kj) || INFINITY;
          if (dij > dik + dkj) {
            this.fwDist.set(ij, dik + dkj);
            this.fwNext.set(ij, this.fwNext.get(ik));
          }
        }
      }
    }
    console.timeEnd('floydWarshallUpdate');
  }

  floydWarshallPath(u, v) {
    if (!this.fwNext.has(`${u}:${v}`)) {
      return null;
    }
    const path = [u];
    while (u !== v) {
      u = this.fwNext.get(`${u}:${v}`);
      path.push(u);
    }
    return path;
  }

  drawDebug(timeDelta, g) {
    if (!this.options.debug) { return; }

    const roads = this.world.get('Road');
    for (const entityId in roads) {
      const road = roads[entityId];
      const position = this.world.get('Position', entityId);
      if (!road.debugColor) {
        road.debugColor = randColor();
      }

      if (this.options.debugRange) {
        g.beginPath();
        g.setLineDash([5, 15]);
        g.moveTo(position.x + road.range, position.y);
        g.arc(position.x, position.y, road.range, 0, Math.PI * 2);
        g.lineWidth = 4;
        g.strokeStyle = road.debugColor;
        g.stroke();
      }

      if (this.options.debugRoads) {
        g.font = '128px monospace';
        g.strokeStyle = road.debugColor;
        g.fillStyle = road.debugColor;
        g.fillText('#' + entityId, position.x + 96, position.y + 96);

        for (const neighborId in road.neighbors) {
          const neighborPosition = this.world.get('Position', neighborId);
          g.beginPath();
          g.setLineDash([15, 5]);
          g.moveTo(
            position.x + Math.random() * 10,
            position.y + Math.random() * 10
          );
          g.lineTo(
            neighborPosition.x + Math.random() * 10,
            neighborPosition.y + Math.random() * 10
          );
          g.lineWidth = 4;
          g.strokeStyle = road.debugColor;
          g.stroke();
        }
      }
    }

    if (this.options.debugRunners) {
      const runners = this.world.get('Runner');
      for (const entityId in runners) {
        const runner = runners[entityId];
        if (!runner.debugColor) {
          runner.debugColor = randColor();
        }

        if (this.options.debugPath && runner.path) {
          const circleSize = 220 + 10 * Math.random();
          [runner.nearest, runner.destination].forEach(entityId => {
            if (entityId) {
              const position = this.world.get('Position', entityId);
              g.beginPath();
              g.setLineDash([15, 15]);
              g.moveTo(position.x + circleSize, position.y);
              g.arc(position.x, position.y, circleSize, 0, Math.PI * 2);
              g.lineWidth = 4;
              g.strokeStyle = runner.debugColor;
              g.stroke();
            }
          });

          let last = runner.path[0];
          for (let idx = 1; idx < runner.path.length; idx++) {
            const current = runner.path[idx];

            const lastPosition = this.world.get('Position', last);
            const currentPosition = this.world.get('Position', current);

            g.beginPath();
            g.setLineDash([5, 5]);
            g.moveTo(
              lastPosition.x + Math.random() * 10,
              lastPosition.y + Math.random() * 10
            );
            g.lineTo(
              currentPosition.x + Math.random() * 10,
              currentPosition.y + Math.random() * 10
            );
            g.lineWidth = 48;
            g.strokeStyle = runner.debugColor;
            g.stroke();

            last = current;
          }
        }
      }
    }

  }

}

Core.registerSystem('RoadRunner', RoadRunnerSystem);

const digits = '0123456789abcdef';
const randDigit = () => digits.charAt(Math.floor(Math.random() * digits.length));
const randColor = () => '#' + randDigit() + randDigit() + randDigit() + randDigit() + randDigit() + randDigit();
