import { Size, Vector2 } from './vector';

export type GridItemFactory<T> = (x: number, y: number) => T;

export class Grid<T> implements Iterable<{ object: T; x: number; y: number }> {
  private grid: T[][] = [];

  constructor({ width, height }: Size, factory: GridItemFactory<T>) {
    for (let x = 0; x < width; x++) {
      this.grid[x] = [];
      for (let y = 0; y < height; y++) {
        this.grid[x][y] = factory(x, y);
      }
    }
  }

  getWidth() {
    return this.grid.length;
  }

  getHeight() {
    return this.grid.length > 0 ? this.grid[0].length : 0;
  }

  get(id: Vector2) {
    if (this.grid.length === 0 ||
        id.x >= this.grid.length ||
        id.y >= this.grid[0].length ||
        id.x < 0 || id.y < 0) {
      return null;
    } else {
      return this.grid[id.x][id.y];
    }
  }

  set(id: Vector2, value: T) {
    this.grid[id.x][id.y] = value;
  }

  validateID(id: Vector2): boolean {
    return id.x > 0 && id.x < this.getWidth() && id.y > 0 && id.y < this.getHeight();
  }

  addRow(count: number, factory: GridItemFactory<T>) {
    for (let x = 0; x < this.getWidth(); x++) {
      let height = this.getHeight();
      for (let y = height; y < height + count; y++) {
        this.grid[x][y] = factory(x, y);
      }
    }
  }

  addColumn(count: number, factory: GridItemFactory<T>) {
    let width = this.getWidth();
    for (let x = width; x < width + count; x++) {
      this.grid[x] = [];
      for (let y = 0; y < this.getHeight(); y++) {
        this.grid[x][y] = factory(x, y);
      }
    }
  }

  removeRow(atIndex: number, count: number = 1): T[] {
    if (atIndex < 0 || atIndex >= this.getHeight()) {
      throw new Error('index out of range exception');
    } else if (count < 0 || count > this.getHeight()) {
      throw new Error('count out of range exception');
    }
    const deleted: T[] = [];
    for (let col of this.grid) {
      deleted.push(...col.splice(atIndex, count));
    }
    return deleted;
  }

  removeColumn(atIndex: number, count: number = 1): T[] {
    if (atIndex < 0 || atIndex >= this.getWidth()) {
      throw new Error('index out of range exception');
    } else if (count < 0 || count > this.getWidth()) {
      throw new Error('count out of range exception');
    }
    const deleted = this.grid.splice(atIndex, count);
    return deleted.reduce((acc, rows) => {
      acc.push(...rows);
      return acc;
    });
  }

  [Symbol.iterator](): Iterator<{ object: T; x: number; y: number }> {
    let x = 0, y = 0;
    return {
      next: () => {
        if (x >= this.grid.length) {
          return {
            value: null,
            done: true,
          };
        }

        let value = {
          value: {
            object: this.grid[x][y],
            x: x,
            y: y,
          },
          done: false,
        };
        y++;
        if (y >= this.grid[0].length) {
          x++;
          y = 0;
        }
        return value;
      },
    };
  }
}
