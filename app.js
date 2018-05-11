const createNamedTuple = require('named-tuple')

const Point = createNamedTuple('Point', 'x', 'y')

class Robot {

  /**
   * @param number x - x coord
   * @param number y - y coord
   * @param char orientation - N, E, S, or W
   */
  constructor(x, y, orientation) {
    this.orientations = {
      'N': 0,
      'E': 1,
      'S': 2,
      'W': 3
    };
    this.orientationChars = ['N', 'E', 'S', 'W']
    this.position = new Point(x, y);
    this.orientation = this.orientations[orientation];
  }

  /**
   * Turns the robot to the left.
   */
  turnLeft() {
    this.orientation = (this.orientation + 1) & 3;
  }

  /**
   * Turns the robot to the right.
   */
  turnRight() {
    this.orientation = (this.orientation - 1) & 3;
  }

  /**
   * @return char - The character for the current robot orientation (N, E, S, or W)
   */
  orientationChar() {
    return this.orientationChars[this.orientation];
  }
}

module.exports = {
  Robot: Robot,
  Point: Point
}
