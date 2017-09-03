import * as Core from '../lib/core';
import { distance, cacheCall } from '../lib/utils';

let entityId, roads, road, runners, runner, thruster, seeker, position, range,
  neighbors, neighborId, nextId, destinationPosition, distanceToDestination,
  neighborRoad, dist;

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
      astarCacheTTL: 1.0,
      debug: true,
      debugRange: false,
      debugRoads: true,
      debugRunners: true,
      debugPath: true,
      positionSystemName: 'Position'
    };
  }

  initialize() {
    this.positionSystem = this.world.getSystem(this.options.positionSystemName);
    this.mapNeighbor = this.mapNeighbor.bind(this);
  }

  update(timeDelta) {
    this.updateRoads(timeDelta);
    this.updateRunners(timeDelta);
  }

  updateRoads(/* timeDelta */) {
    roads = this.world.get('Road');
    for (entityId in roads) {
      road = roads[entityId];
      position = this.world.get('Position', entityId);
      range = road.range;
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
  }

  updateRunners(timeDelta) {

    runners = this.world.get('Runner');
    for (entityId in runners) {
      // Find throttle & seeker for steering, otherwise bail out.
      thruster = this.world.get('Thruster', entityId);
      seeker = this.world.get('Seeker', entityId);
      if (!seeker || !thruster) { continue; }

      // If we don't have a destination, bail out.
      runner = runners[entityId];
      if (!runner.destination) { continue; }

      // Find nearby path elements
      position = this.world.get('Position', entityId);
      range = runner.range;
      runner.neighbors = {};
      this.positionSystem.quadtree.iterate(
        {
          left: position.left - range,
          top: position.top - range,
          right: position.right + range,
          bottom: position.bottom + range
        },
        this.mapNeighbor,
        [range, runner, position]
      );

      // Find nearest path element, bail if none
      neighbors = Object.entries(runner.neighbors);
      runner.nearest = (neighbors.length === 0)
        ? null
        : neighbors.sort((a, b) => a[1] - b[1]).shift()[0];
      if (!runner.nearest) { continue; }

      // Update our path from nearest path element to destination
      // runner.path = this.astar(runner.nearest, runner.destination);
      runner.path = cacheCall(
        timeDelta, this.options.astarCacheTTL,
        `astar:${runner.nearest}:${runner.destination}`,
        this, 'astar',
        runner.nearest, runner.destination
      );
      if (runner.path === null) { continue; }

      // If we have a next step in the path, seek it.
      nextId = runner.path[1];
      if (nextId) {
        thruster.throttle = 1.0;
        seeker.active = true;
        seeker.targetEntityId = nextId;
        continue;
      }

      // We're down to the last step in the path, time for a landing.
      destinationPosition =
        this.world.get('Position', runner.destination);
      distanceToDestination =
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
  }

  mapNeighbor(neighborPosition, [range, road, position]) {
    neighborId = neighborPosition.entityId;
    if (position.entityId === neighborId) { return; }

    neighborRoad = this.world.get('Road', neighborId);
    if (!neighborRoad) { return; }

    dist = distance(position, neighborPosition);
    if (dist < range) { road.neighbors[neighborId] = dist; }
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
