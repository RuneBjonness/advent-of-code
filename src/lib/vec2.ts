export type Vec2 = { x: number; y: number };

export const vec2 = (x = 0, y = 0): Vec2 => {
  return { x, y };
};

export const add = (a: Vec2, b: Vec2): Vec2 => {
  return vec2(a.x + b.x, a.y + b.y);
};
