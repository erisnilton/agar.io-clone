export function between(min: number, value: number, max: number) {
  return value >= min && value <= max;
}

export function generateColor() {
  return (
    "#" +
    Math.round(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
