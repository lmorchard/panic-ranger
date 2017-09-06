// Linear interpolation from v0 to v1 over t[0..1]
export function lerp(v0, v1, t) {
  return (1-t)*v0 + t*v1;
}

export function squareDistance(aPosition, bPosition) {
  return Math.pow(bPosition.x - aPosition.x, 2) +
         Math.pow(bPosition.y - aPosition.y, 2);
}

export function distance(aPosition, bPosition) {
  return Math.sqrt(squareDistance(aPosition, bPosition));
}

const cachedResults = {};

let cachedValue;

export function cacheCall(ttl, key, self, fn, ...args) {
  const now = Date.now();
  if (key in cachedResults) {
    cachedValue = cachedResults[key];
    if (now - cachedValue.time < ttl) {
      return cachedValue.result;
    }
  }
  cachedValue = {
    time: now,
    result: self[fn](...args)
  };
  cachedResults[key] = cachedValue;
  return cachedValue.result;
}

const times = {};

export function timeStart(name) {
  const now = performance.now();
  if (!times[name]) {
    times[name] = { acc: 0, count: 0, lastConsole: now };
  }
  times[name].last = now;
}

export function timeEnd(name, throttle=2000) {
  const now = performance.now();
  if (!times[name]) { return; }

  const time = times[name];
  const duration = now - time.last;

  if (time.count > 1000) {
    time.acc = 0;
    time.count = 0;
  }

  time.last = now;
  time.acc += duration;
  time.count++;

  if (now - time.lastConsole > throttle) {
    time.lastConsole = now;
    // eslint-disable-next-line no-console
    console.log(
      name, time.count,
      Math.floor(duration * 1000),
      Math.floor((time.acc / time.count) * 1000)
    );
  }
}
