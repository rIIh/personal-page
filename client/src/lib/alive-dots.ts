import { Grid, GridItemFactory } from './grid';
import { Dot } from './dot';
import { Direction, Size, Vector2 } from './vector';
import anime from 'animejs';
import React from 'react';

interface Busy {}

export class AliveDots {
  dots: Grid<Dot | null>;
  private emptyNodes: Vector2[] = [];
  private active: boolean = true;
  private mousePosition: Vector2 = { x: -3000, y: -3000 };

  screenToGrid(value: number) {
    if(value < 0) {
      console.log(value);
    }
    return Math.floor(value / this.gap) + 1;
  }

  gridToScreen(i: number) {
    return i * this.gap;
  }

  gap: number;

  interval: NodeJS.Timeout;
  update = async () => {
    if (this.emptyNodes.length === 0) {
      return;
    }
    let emptyNodeID = anime.random(0, this.emptyNodes.length - 1);
    let emptyNode = this.emptyNodes[emptyNodeID];
    let neighbour: Dot | undefined;
    let neighbourID: Vector2 | undefined;

    for (let direction of Direction.shuffled) {
      let id = {
        x: emptyNode.x + direction.x,
        y: emptyNode.y + direction.y,
      };
      let testNeighbour = this.dots.get(id);
      if (testNeighbour !== null) {
        neighbour = testNeighbour;
        neighbourID = id;
        break;
      }
    }
    await neighbour?.ready;
    if (neighbour && neighbourID) {
      this.dots.set(emptyNode, neighbour);
      this.emptyNodes.splice(emptyNodeID, 1);
      setTimeout(async () => {
        await neighbour!.moveTo({ x: this.gridToScreen(emptyNode.x), y: this.gridToScreen(emptyNode.y) });
        neighbour!.gridState = Object.assign(neighbour?.gridState, { x: emptyNode.x, y: emptyNode.y });
        if (this.dots.validateID(neighbourID!)) {
          this.dots.set(neighbourID!, null);
          this.emptyNodes.push(neighbourID!);
        }
      }, anime.random(0, 2000));
    }
  };

  margin: number = 0;

  resize(size: Size) {
    let lastWCount = this.dots.getWidth();
    let lastHCount = this.dots.getHeight();

    let lastWidth = lastWCount * this.gap;
    let lastHeight = (lastHCount * this.gap);

    let deltaWCount = Math.floor((size.width - lastWidth) / this.gap) + 1;
    let deltaHCount = Math.floor((size.height - lastHeight) / this.gap) + 1;

    let newWCount = lastWCount + deltaWCount;
    this.margin = (size.width - (newWCount - 1) * this.gap) / 2;

    if (deltaWCount < 0) {
      this.dots.removeColumn(this.dots.getWidth() + deltaWCount, -deltaWCount);
    }

    if (deltaHCount < 0) {
      this.dots.removeRow(this.dots.getHeight() + deltaHCount, -deltaHCount);
    }

    this.emptyNodes = this.emptyNodes.filter(node => this.dots.validateID(node) && this.dots.get(node) === null);

    if (deltaWCount > 0) {
      this.dots.addColumn(deltaWCount, this.randomlyKilledDot);
    }

    if (deltaHCount > 0) {
      this.dots.addRow(deltaHCount, this.randomlyKilledDot);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let { object: dot, x, y } of this.dots) {
      dot?.draw(ctx, { x: this.margin, y: this.margin });
    }
  }

  randomlyKilledDot: GridItemFactory<Dot> = (x, y) => {
    const isKilled = Math.random() > 0.85;
    const dot = new Dot( () => this.mousePosition,() => !this.active, this.gridToScreen(x), this.gridToScreen(y));
    if (isKilled) {
      setTimeout(async () => {
        await dot?.ready;
        await dot?.kill();
        if(this.dots.validateID({ x, y })) {
          this.dots.set({ x, y }, null);
          this.emptyNodes.push({ x, y });
        }
      }, anime.random(500, 3000));
    }
    return dot;
  };

  constructor(gap: number = 68) {
    this.gap = gap;
    let gridSize = {
      width: this.screenToGrid(window.innerWidth),
      height: this.screenToGrid(window.innerHeight),
    };
    this.dots = new Grid(gridSize, this.randomlyKilledDot);

    this.interval = setInterval(this.update, 500);
  }

  onBlurred() {
    this.active = false;
  }

  onFocus() {
    this.active = true;
  }

  mouseMovementHandler({ clientX: x, clientY: y }: MouseEvent) {
    this.mousePosition = { x, y };
  }
}
