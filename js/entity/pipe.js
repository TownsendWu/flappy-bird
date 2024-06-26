import { randomRange } from "../utils/random-util.js";

export class Pipe {
  constructor(windwoWidth, windowHeight, gameObjects, sound, dx = 310) {
    this.windwoWidth = windwoWidth;
    this.windowHeight = windowHeight;
    this.pipeImg = gameObjects.pipe;
    this.sound = sound;

    //小鸟的长度
    this.birdWidth = 33;
    this.birdHeight = 25;

    //上下两个管道之间的空隙
    this.pipeSpace = 85;

    //地面高度
    this.baseHeight = this.windowHeight * 0.8;
    this.initDx = dx;
    this.dx = dx;
    this.speed = 1.8;
    this.dy = randomRange(150, 350);
  }

  update(gameover = false) {
    if (gameover) {
      this.speed = 0;
      return [
        {
          img: this.pipeImg,
          sx: 0,
          sy: 0,
          sWidth: this.pipeImg.width,
          sHeight: this.baseHeight - this.dy,
          dx: this.dx,
          dy: this.dy,
          dWidth: this.pipeImg.width,
          dHeight: this.baseHeight - this.dy,
        },
        {
          img: this.pipeImg,
          sx: 0,
          sy: 0,
          sWidth: this.pipeImg.width,
          sHeight: this.dy - this.pipeSpace,
          dx: this.dx,
          dy: 0,
          dWidth: this.pipeImg.width,
          dHeight: this.dy - this.pipeSpace,
        },
      ];
    }

    this.dx -= this.speed;
    if (this.dx < -100) {
      this.dx = 310;
      this.dy = randomRange(150, 350);
    }
    return [
      {
        img: this.pipeImg,
        sx: 0,
        sy: 0,
        sWidth: this.pipeImg.width,
        sHeight: this.baseHeight - this.dy,
        dx: this.dx,
        dy: this.dy,
        dWidth: this.pipeImg.width,
        dHeight: this.baseHeight - this.dy,
      },
      {
        img: this.pipeImg,
        sx: 0,
        sy: 0,
        sWidth: this.pipeImg.width,
        sHeight: this.dy - this.pipeSpace,
        dx: this.dx,
        dy: 0,
        dWidth: this.pipeImg.width,
        dHeight: this.dy - this.pipeSpace,
      },
    ];
  }

  reset() {
    this.dx = this.initDx;
    this.speed = 1.8;
    this.dy = randomRange(150, 350);
  }

  collision(birdX, birdY) {
    //检测是否碰到地面
    if (birdY + this.birdHeight >= this.baseHeight) {
      this.sound.hitOgg.play();
      this.sound.dieOgg.play();
      return true;
    }

    //检测是否碰到下管道
    if (
      birdX + this.birdWidth >= this.dx &&
      birdX - 1 <= this.dx + this.pipeImg.width &&
      birdY + this.birdHeight >= this.dy
    ) {
      this.sound.hitOgg.play();
      this.sound.dieOgg.play();
      return true;
    }

    //检测是否碰到上管道
    // 检测是否碰到上管道
    if (
      birdX + this.birdWidth >= this.dx &&
      birdX <= this.dx + this.pipeImg.width &&
      birdY <= this.dy - this.pipeSpace
    ) {
      this.sound.hitOgg.play();
      this.sound.dieOgg.play();
      return true;
    }

    return false;
  }

  calcSocre(birdX, birdY) {
    const distance = birdX - this.dx - this.pipeImg.width;
    const scoreOrNot =
      birdY + this.birdHeight < this.baseHeight && distance > 2 && distance < 4;

    if (scoreOrNot) {
      this.sound.pointOgg.play();
      // console.log(distance, birdX, this.dx, this.pipeImg.width);
    }
    return scoreOrNot;
  }
}
