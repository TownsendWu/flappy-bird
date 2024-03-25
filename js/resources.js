/**
 * 资源类，以便拿资源
 */

export class GameObjects {
  constructor(background, base, pipe, birdUpflap, birdMidflap, birdDownflap) {
    this.background = background;
    this.base = base;
    this.pipe = pipe;
    this.birdUpflap = birdUpflap;
    this.birdMidflap = birdMidflap;
    this.birdDownflap = birdDownflap;
  }
}

export class UI {
  constructor(message, gameover, numbers) {
    this.message = message;
    this.gameover = gameover;
    this.numbers = numbers;
  }
}

export class Sound {
  constructor(dieOgg, hitOgg, pointOgg, swooshOgg, wingOgg) {
    this.dieOgg = new Audio(dieOgg);
    this.hitOgg = new Audio(hitOgg);
    this.pointOgg = new Audio(pointOgg);
    this.swooshOgg = new Audio(swooshOgg);
    this.wingOgg = new Audio(wingOgg);
  }
}
