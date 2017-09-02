import * as Core from '../lib/core';

function distance(aPosition, bPosition) {
  return Math.sqrt(
    Math.pow(bPosition.x - aPosition.x, 2) +
    Math.pow(bPosition.y - aPosition.y, 2)
  );
}
const digits = '0123456789abcdef';
const randDigit = () => digits.charAt(Math.floor(Math.random() * digits.length));

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
      debugText: false,
      debugPath: true,
      positionSystemName: 'Position'
    };
  }

  initialize() {
    this.positionSystem = this.world.getSystem(this.options.positionSystemName);
    this.mapNeighbor = this.mapNeighbor.bind(this);

    this.debugT = document.createElement('textarea');
    document.body.appendChild(this.debugT);
    Object.assign(this.debugT.style, {
      width: '400px', height: '300px',
      display: 'block', position: 'absolute',
      zIndex: 1000, bottom: '0px', right: '0px',
      color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.7)',
    });
  }

  update(/* timeDelta */) {
    let entityId;

    const roadItems = this.world.get('Road');
    for (entityId in roadItems) {
      const road = roadItems[entityId];
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

    const runners = this.world.get('Runner');
    for (entityId in runners) {
      const runner = runners[entityId];
      const position = this.world.get('Position', entityId);
      const range = runner.range;
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
      const neighbors = Object.entries(runner.neighbors);
      runner.nearest = (neighbors.length === 0)
        ? null
        : neighbors.sort((a, b) => a[1] - b[1]).shift()[0];

      if (runner.nearest && runner.destination) {
        runner.path = this.astar(runner.nearest, runner.destination);
      } else {
        runner.path = null;
      }
    }
  }

  mapNeighbor(neighborPosition, [range, road, position]) {
    const neighborId = neighborPosition.entityId;
    if (position.entityId === neighborId) { return; }

    const neighborRoad = this.world.get('Road', neighborId);
    if (!neighborRoad) { return; }

    const dist = distance(position, neighborPosition);
    if (dist < range) { road.neighbors[neighborId] = dist; }
  }

  // https://en.wikipedia.org/wiki/A-star
  astar(startId, goalId) {
    const INFINITY = 1000000000;

    const roads = this.world.get('Road');

    const heuristic_cost_estimate = (startId, goalId)  => {
      return distance(
        this.world.get('Position', startId),
        this.world.get('Position', goalId)
      );
    };

    const reconstruct_path = (cameFrom, startId) => {
      let currentId = startId;
      const total_path = [currentId];
      while (cameFrom.has(currentId)) {
        currentId = cameFrom.get(currentId);
        total_path.push(currentId);
      }
      return total_path;
    };

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
    fScore.set(startId, heuristic_cost_estimate(startId, goalId));

    while (openSet.size > 0) {
      const currentId = [...openSet]
        .map(key => [key, fScore.has(key) ? fScore.get(key) : INFINITY])
        .sort((a, b) => a[1] - b[1])
        .shift()[0];

      if (currentId === goalId) {
        this.debugT.value = JSON.stringify({
          path: reconstruct_path(cameFrom, currentId),
          startId, goalId, cameFrom, openSet, closedSet, gScore, fScore
        });
        return reconstruct_path(cameFrom, currentId);
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
          gScore.get(neighborId) + heuristic_cost_estimate(neighborId, goalId));
      }
    }

    this.debugT.value = JSON.stringify({
      path: null,
      startId, goalId, cameFrom, openSet, closedSet, gScore, fScore
    });

    return null;
  }

  drawDebug(timeDelta, g) {
    if (!this.options.debug) { return; }

    this.debugT.style.display = (this.options.debugText)
      ? 'block'
      : 'none';

    const roadItems = this.world.get('Road');
    for (const entityId in roadItems) {
      const road = roadItems[entityId];
      const position = this.world.get('Position', entityId);
      if (!road.debugColor) {
        road.debugColor = '#' +
          randDigit() + randDigit() +
          randDigit() + randDigit() +
          randDigit() + randDigit();
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
          runner.debugColor = '#' +
            randDigit() + randDigit() +
            randDigit() + randDigit() +
            randDigit() + randDigit();
        }

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

        if (this.options.debugPath && runner.path) {
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
