var center, bg, sun;
var planets = [];
var orbits = [];

function setup() {
  createCanvas(264, 561);
  frameRate(150);
  center = createVector(windowWidth/6, windowHeight/3);
  sun = new Sun();
  for(i=0; i<random(10, 200); i++) {
    planets[i] = new Planet();
  }
  bg = new backgroundView(0, 50, 250);
}

function draw() {
  bg.display();
  sun.display();
  translate(center.x, center.y);
  for(o=0; o<orbits.length; o++) {
    orbits[o].display();
  }
  for(p=0; p<planets.length; p++) {
    planets[p].move();
    planets[p].display();
  }
}

function backgroundView(space, starsPoints) {
  this.space = space;
  this.starsPoints = starsPoints;
  
  this.stars = [];
  
  for(s=0; s<this.starsPoints; s++) {
    this.x = random(0, windowWidth);
    this.y = random(0, windowHeight);
    this.stars[s] = createVector(this.x, this.y);
  }
  
  this.display = function() {
    background(this.space);
    stroke(255);
    strokeWeight(3);
    for(s=0; s<this.starsPoints; s++) {
      console.log(this.stars[s]);
      point(this.stars[s].x, this.stars[s].y);
    }
  };
}

function Sun() {
  this.center = center;
  this.diameter = 0.15 * min(windowWidth, windowHeight);
  this.stroke = color(255, 255, 100);
  this.fill = color(255, 255, 100);
  
  this.display = function() {
    stroke(this.stroke);
    fill(this.fill);
    ellipse(this.center.x, this.center.y, this.diameter, this.diameter);
  };
}

function Planet() {
  this.orbitRadius = random(0.1 * min(windowWidth, windowHeight), 1.5 * min(windowWidth, windowHeight));
  orbits.push(new Orbit(this.orbitRadius));
  this.orbitVelocity = TWO_PI / random(1000, 600);
  this.diameter = random(0.01 * min(windowWidth, windowHeight), 0.15 * min(windowWidth, windowHeight));
  this.theta = random(0, TWO_PI);
  this.fill = color(random(0, 10), random(100, 200), random(100, 200, 33), 255);
  this.stroke = this.fill;
  
  this.move = function() {
    this.theta += this.orbitVelocity;
  };
  
  this.display = function() {
    stroke(this.stroke);
    fill(this.fill);
    this.x = this.orbitRadius * cos(this.theta);
    this.y = this.orbitRadius * sin(this.theta);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function Orbit(orbitRadius) {
  this.orbitRadius = orbitRadius;
  
  this.display = function() {
    stroke(255, 25);
    noFill();
    ellipse(0, 0, 2 * this.orbitRadius, 2 * this.orbitRadius);
  }
}