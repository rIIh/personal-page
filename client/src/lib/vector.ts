import { shuffleArray } from './array-utils';

export interface Vector2 {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export type Point = Vector2;

export class Direction {
  static get shuffled(): Vector2[] {
    return shuffleArray([
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ]);
  }
}
