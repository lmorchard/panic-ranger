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
export function cacheCall(timeDelta, defaultTTL, key, self, fn, ...args) {
  if (key in cachedResults) {
    cachedValue = cachedResults[key];
    cachedValue.ttl -= timeDelta;
    if (cachedValue.ttl > 0) { return cachedValue.result; }
  }
  cachedValue = {
    ttl: defaultTTL,
    result: self[fn](...args)
  };
  cachedResults[key] = cachedValue;
  return cachedValue.result;
}
