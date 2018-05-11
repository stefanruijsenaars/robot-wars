const createNamedTuple = require('named-tuple');

const Point = createNamedTuple('Point', 'x', 'y');
const Grid = createNamedTuple('Grid', 'xSize', 'ySize');
const Shift = createNamedTuple('Shift', 'shiftX', 'shiftY');

class Robot {

  /**
   * @param number x - x coord
   * @param number y - y coord
   * @param number maxX - max x coord
   * @param number maxY - max y coord
   * @param char orientation - N, E, S, or W
   */
  constructor(x, y, orientation, grid) {
    this.grid = grid;
    this.orientations = {
      'N': 0,
      'E': 1,
      'S': 2,
      'W': 3
    };
    this.orientationChars = ['N', 'E', 'S', 'W'];
    this.shifts = [new Shift(0,1), new Shift(1,0), new Shift(0,-1), new Shift(-1,0)];
    this.position = new Point(x, y);
    this.orientation = this.orientations[orientation];
  }

  /**
   * Turns the robot to the left.
   */
  turnLeft() {
    this.orientation = (this.orientation - 1) & 3;
  }

  /**
   * Turns the robot to the right.
   */
  turnRight() {
    this.orientation = (this.orientation + 1) & 3;
  }

  /**
   * @return char - The character for the current robot orientation (N, E, S, or W)
   */
  orientationChar() {
    return this.orientationChars[this.orientation];
  }

  moveForward() {
    const nextPosition = new Point(this.position.x + this.shifts[this.orientation].shiftX, this.position.y + this.shifts[this.orientation].shiftY);
    // prevent robot moving off the grid
    if ((nextPosition.x >= 0) && (nextPosition.x < this.grid.xSize) && (nextPosition.y >= 0) && (nextPosition.y < this.grid.ySize)) {
      this.position = nextPosition;
    }
  }
}

module.exports = {
  Robot: Robot,
  Point: Point,
  Grid: Grid
}
