export type Vec3 = { x: number; y: number; z: number };

export const vec3 = (x = 0, y = 0, z = 0): Vec3 => {
  return { x, y, z };
};

export const add = (a: Vec3, b: Vec3): Vec3 => {
  return vec3(a.x + b.x, a.y + b.y, a.z + b.z);
};

export const distance = (a: Vec3, b: Vec3): number => {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
};
