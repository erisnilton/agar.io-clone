import { Rect } from "./rect";
export class Vector {
  constructor(public x = 0, public y = x) {}

  set(x: number, y = x) {
    this.x = x;
    this.y = y;
    return this;
  }

  get magnitude() {
    return Math.hypot(this.x, this.y);
  }

  get int() {
    return new Vector(Math.ceil(this.x), Math.ceil(this.y));
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  copyTo(other: Vector) {
    other.set(this.x, this.y);
    return other;
  }

  copyFrom(other: Vector) {
    this.set(other.x, other.y);
    return this;
  }

  add(other: Vector) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  scale(other: Vector) {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  }

  sub(other: Vector) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  div(other: Vector) {
    this.x /= other.x;
    this.y /= other.y;
    return this;
  }

  normalize() {
    return this.div(new Vector(this.magnitude));
  }

  static random(area: Rect) {
    return new Vector(
      Math.random() * area.width + area.x,
      Math.random() * area.height + area.y
    );
  }
}
