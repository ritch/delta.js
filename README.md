# delta.js

Create 3D particle simulations in your browser.

## In Development

Still in active development.

## Earth / Moon Example

This example will roughly simulate the gravitational interaction between the earth and the moon.

    var timeScale = 100000;
    var universeScale = 0.00001;
    var sim = new delta.Simulation(timeScale, universeScale);
  
    var EARTH_RADIUS = 6378100; // in meters
    var MOON_RADIUS = 1737400;
    var EM_DISTANCE = 406700000;

    var earth = sim.createParticle(EARTH_RADIUS);
    var moon = sim.createParticle(MOON_RADIUS);
    
    // mass in kg
    earth.mass = 5.97219 * Math.pow(10, 24);
    moon.mass = 7.34767309 * Math.pow(10, 22);

    // rough initial velocity of the moon
    // leaving the earth at rest
    moon.pos.x = EM_DISTANCE + EARTH_RADIUS + MOON_RADIUS;
    moon.vel.y = 20000;
    moon.vel.x = -10000;


  