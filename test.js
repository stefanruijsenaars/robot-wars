const app = require('./app');
const expect = require('chai').expect;

describe('Robot', () => {
  it('should return the right orientation & position', () => { 
    const robot = new app.Robot(0,0, 'N')
    expect(robot.orientation).to.equal(0)
    expect(robot.orientationChar()).to.equal('N')
    expect(robot.position).to.eql(new app.Point(0,0))
  });
});


