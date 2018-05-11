const createNamedTuple = require('named-tuple');
const lineReader = require('line-reader');

const Point = createNamedTuple('Point', 'x', 'y');
const Shift = createNamedTuple('Shift', 'shiftX', 'shiftY');

// Can be turned into an object if needed
const Grid = createNamedTuple('Grid', 'maxX', 'maxY');

class Robot {

  /**
   * @param number x - x coord
   * @param number y - y coord
   * @param Grid grid - grid for this robot
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

  /**
   * Moves the robot forward by 1 square (if possible).
   *
   * Assumption: the robot cannot move off the grid.
   */
  moveForward() {
    const nextPosition = new Point(this.position.x + this.shifts[this.orientation].shiftX, this.position.y + this.shifts[this.orientation].shiftY);
    // prevent robot moving off the grid
    if ((nextPosition.x >= 0) && (nextPosition.x <= this.grid.maxX) && (nextPosition.y >= 0) && (nextPosition.y <= this.grid.maxY)) {
      this.position = nextPosition;
    }
  }
}

class Simulation {

  constructor() {
    this.robots = [];
    this.grid = null;
  }

  /**
   * Parses the input file.
   *
   * @param function cb - callback to call with an array of output
   */
  parseFile(cb) {
    // assumes valid input.
    let out = [];
    let first = true; // first line contains grid info
    let robotInfo = true; // next lines alternate between robot info and commands
    lineReader.eachLine('input.txt', (line, last) => {
      if (first) {
        const xy = line.split(' ');
        this.grid = new Grid(parseInt(xy[0]), parseInt(xy[1]));
        first = false;
      } else {
        if (robotInfo) {
          const xyp = line.split(' ');
          this.robots.push(new Robot(parseInt(xyp[0]), parseInt(xyp[1]), xyp[2], this.grid));
        } else {
          // parse commands
          const commands = line.split('');
          const currentRobot = this.robots[this.robots.length-1];
          commands.forEach(command => {
            if (command == 'L') {
              currentRobot.turnLeft();
            } else if (command == 'R') {
              currentRobot.turnRight();
            } else if (command == 'M') {
              currentRobot.moveForward();
            } else {
              console.error(`Invalid command: ${command}`);
            }
          });
          // Output state for robot
          out.push(`${currentRobot.position.x} ${currentRobot.position.y} ${currentRobot.orientationChar()}`);
        }
        robotInfo = !robotInfo;
      }
      if (last) {
        cb(out);
      }
    });
  }

  /**
   * Runs the simulation by parsing input.txt and outputting to stdout.
   */
  run() {
    this.parseFile(out => out.forEach(item => console.log(item)));
  }
}

module.exports = {
  Robot: Robot,
  Point: Point,
  Grid: Grid,
  Simulation: Simulation
}
