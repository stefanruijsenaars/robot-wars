const app = require('./app');
const expect = require('chai').expect;

describe('Robot', () => {
  it('should return the right orientation & position', () => { 
    const grid = new app.Grid(2, 2)
    const robot = new app.Robot(0,0, 'N', grid)
    expect(robot.orientation).to.equal(0)
    expect(robot.orientationChar()).to.equal('N')
    expect(robot.position).to.eql(new app.Point(0,0))
  });

  it('should turn left / right', () => { 
    const grid = new app.Grid(2, 2)
    const robot = new app.Robot(0,0, 'N', grid)
    expect(robot.orientation).to.equal(0)
    expect(robot.orientationChar()).to.equal('N')
    robot.turnLeft();
    expect(robot.orientation).to.equal(3)
    expect(robot.orientationChar()).to.equal('W')
    robot.turnLeft();
    expect(robot.orientation).to.equal(2)
    expect(robot.orientationChar()).to.equal('S')
    robot.turnLeft();
    expect(robot.orientation).to.equal(1)
    expect(robot.orientationChar()).to.equal('E')
    robot.turnLeft();
    expect(robot.orientation).to.equal(0)
    expect(robot.orientationChar()).to.equal('N')
    robot.turnRight();
    expect(robot.orientation).to.equal(1)
    expect(robot.orientationChar()).to.equal('E')
    robot.turnRight();
    expect(robot.orientation).to.equal(2)
    expect(robot.orientationChar()).to.equal('S')
    robot.turnRight();
    expect(robot.orientation).to.equal(3)
    expect(robot.orientationChar()).to.equal('W')
    robot.turnRight();
    expect(robot.orientation).to.equal(0)
    expect(robot.orientationChar()).to.equal('N')
  });

  it('should move forward', () => { 
    const grid = new app.Grid(2, 2)
    const robot = new app.Robot(0,0, 'N', grid)
    expect(robot.position).to.eql(new app.Point(0,0))
    expect(robot.orientation).to.equal(0)
    expect(robot.orientationChar()).to.equal('N')
    robot.moveForward();
    expect(robot.orientation).to.equal(0)
    expect(robot.orientationChar()).to.equal('N')
    expect(robot.position).to.eql(new app.Point(0,1))
    robot.moveForward();
    expect(robot.position).to.eql(new app.Point(0,2))
    robot.moveForward();
    expect(robot.position).to.eql(new app.Point(0,2))
    robot.moveForward();
    expect(robot.position).to.eql(new app.Point(0,2))
    robot.turnLeft();
    robot.moveForward();
    expect(robot.position).to.eql(new app.Point(0,2))
    robot.turnRight();
    robot.turnRight();
    robot.moveForward();
    expect(robot.position).to.eql(new app.Point(1,2))
    robot.moveForward();
    expect(robot.position).to.eql(new app.Point(2,2))
    robot.moveForward();
    expect(robot.position).to.eql(new app.Point(2,2))
  });
});

describe('Simulation', () => {
  it('should take input and give output', (done) => {
    const simulation = new app.Simulation();
    simulation.parseFile((out) => {
      expect(out[0]).to.equal('1 3 N');
      expect(out[1]).to.equal('5 1 E');
      expect(out.length).to.equal(2);
      done();
    });
  });
});


