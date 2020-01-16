import anime from 'animejs';
import { Point, Vector2 } from './vector';
import { lerp } from './math-utils';

const MOUSE_SPY_RADIUS = 512;

export class Dot implements Point {
  constructor(
      // ! Remove this
      mPosGetter: () => Vector2,
      blurred: () => boolean,

      x: number      = 0,
      y: number      = 0,
      radius: number = 1,
      color: string  = '#555',
) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mousePosition = mPosGetter;
    this.blurred = blurred;
    this.initialState = {
      color,
      radius,
    };
    this.ready = anime({
      targets: this,
      y: [this.y - 10, this.y],
      radius: [0, this.initialState.radius],
      delay: anime.random(0, 1000),
    }).finished;
  }

  initialState: {
    radius: number;
    color: string;
  };

  // ! Maybe replace with RxJS ?
  blurred: () => boolean;
  mousePosition: () => Vector2;

  mouseSpyRadiusEffect = 1;
  resetting: Promise<void> | undefined;

  resetMouseSpyRadiusEffect() {
    return anime({
      targets: this,
      mouseSpyRadiusEffect: 1,
      easing: 'linear',
      duration: 250,
    });
  }

  recalculateEffect(mousePosition: Vector2) {
    let { x1, x2, y1, y2 } = {
      x1: mousePosition.x - MOUSE_SPY_RADIUS / 2,
      x2: mousePosition.x + MOUSE_SPY_RADIUS / 2,
      y1: mousePosition.y - MOUSE_SPY_RADIUS / 2,
      y2: mousePosition.y + MOUSE_SPY_RADIUS / 2,
    };

    if (this.blurred() || this.x > x2 || this.x < x1 || this.y > y2 || this.y < y1) {
      if (this.mouseSpyRadiusEffect !== this.initialState.radius && this.resetting === undefined) {
        this.resetting = this.resetMouseSpyRadiusEffect().finished;
        this.resetting.then(() => this.resetting = undefined);
      }
    } else {
      let deltaX = this.x - mousePosition.x;
      let deltaY = this.y - mousePosition.y;
      let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      let maxRadius = 10;
      this.mouseSpyRadiusEffect = lerp(this.mouseSpyRadiusEffect, Math.max(1, maxRadius - distance / (MOUSE_SPY_RADIUS / maxRadius / 2)), 0.2);
    }
  }

  ready: Promise<void>;
  moving: Promise<void> | undefined;

  x: number;
  y: number;
  radius: number;
  color: string;

  async kill() {
    return await anime({
      targets: this,
      radius: [
        { value: 2 },
        { value: 0 },
      ],
      color: '#fff',
      easing: 'linear',
    }).finished;
  }

  async moveTo({ x, y }: Vector2) {
    this.moving = anime({
      targets: this,
      x: [
        { value: x, duration: 1500 },
      ],
      y: [
        { value: y, duration: 1500 },
      ],
      radius: [
        { value: 2, duration: 200 },
        { value: this.initialState.radius, duration: 400 },
      ],
      color: [
        { value: '#fff', duration: 200 },
        { value: this.initialState.color, duration: 400 },
      ],
      duration: 1000,
    }).finished;
    await this.moving.then(() => {
      this.moving = undefined;
    });
    return;
  }


  draw(ctx: CanvasRenderingContext2D, { x, y }: Vector2) {
    this.recalculateEffect(this.mousePosition());
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.arc(
        this.x + x,
        this.y + y,
        (this.radius < 0 ? 0 : this.radius) * this.mouseSpyRadiusEffect,
        0, 2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();
  }
}
