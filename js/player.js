import { Physics } from "./physics.js";

export class Player {
  constructor(windwoWidth, windowHeight, gameObjects, sound) {
    this.windwoWidth = windwoWidth;
    this.windowHeight = windowHeight;

    this.birds = [
      gameObjects.birdUpflap,
      gameObjects.birdMidflap,
      gameObjects.birdDownflap,
    ];
    this.sound = sound;
    this.physics = new Physics();

    //通用状态参数
    //是否点击了开始
    this.start = false;

    //地面高度
    this.baseHeight = this.windowHeight * 0.8 - 25;

    //小鸟的身体旋转角度
    this.rotation = 0;

    //小鸟的起始位置
    this.dx = 90;
    this.dy = 220;
    //初始速度
    this.velocityY = 0;
    this.jumpSpeed = -4.5;

    //挥动翅膀的状态
    this.flyStatus = 0;
    //挥动翅膀的速度
    this.flapSpeed = 0.2;
  }

  update() {
    const i = Math.round(this.flyStatus) % 3;
    const img = this.birds[i];
    this.rotation = Math.atan2(this.velocityY, 6);

    [this.velocityY, this.dy] = this.physics.calcY(this.velocityY, this.dy);
    // this.dy += this.velocityY

    if (this.dy >= this.baseHeight) {
      this.dy = this.baseHeight;
    }
    const data = {
      img: img,
      dx: this.dx,
      dy: this.dy,
      rotation: this.rotation,
    };
    this.flyStatus = this.flyStatus + this.flapSpeed;
    if (this.flyStatus > this.birds.length - 1) {
      this.flyStatus = 0;
    }

    return data;
  }

  reset() {
    //小鸟的起始位置
    this.dx = 90;
    this.dy = 220;
    //初始速度
    this.velocityY = 0;

    //挥动翅膀的状态
    this.flyStatus = 0;
    //挥动翅膀的速度
    this.flapSpeed = 0.2;
  }

  jump() {
    this.velocityY = this.jumpSpeed;
    this.sound.wingOgg.play()
  }
}
