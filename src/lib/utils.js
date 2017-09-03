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

const cachedResults = new Map();

export function cacheCall(timeDelta, defaultTTL, key, self, fn, ...args) {
  let value;
  if (cachedResults.has(key)) {
    value = cachedResults.get(key);
    value.ttl -= timeDelta;
    if (value.ttl > 0) {
      cachedResults.set(key, value);
      return value.result;
    }
  }
  value = {
    ttl: defaultTTL,
    result: self[fn](...args)
  };
  cachedResults.set(key, value);
  return value.result;
}
