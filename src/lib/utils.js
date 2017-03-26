// Linear interpolation from v0 to v1 over t[0..1]
export function lerp(v0, v1, t) {
  return (1-t)*v0 + t*v1;
}
