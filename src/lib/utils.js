// Linear interpolation from v0 to v1 over t[0..1]
export function lerp(v0, v1, t) {
  return (1-t)*v0 + t*v1;
}

export function distance(aPosition, bPosition) {
  return Math.sqrt(
    Math.pow(bPosition.x - aPosition.x, 2) +
    Math.pow(bPosition.y - aPosition.y, 2)
  );
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
