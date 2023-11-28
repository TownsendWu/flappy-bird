import { randomRange } from "../utils/random";
/**
 * 鸟
 */
export class Bird {
  constructor(ctx, imageResource) {
    this.ctx = ctx;

    //初始动画状态
    this.index = 0;

    //小鸟的起始位置
    this.dX = 125;
    this.dY = 220;

    //挥动翅膀的速度
    this.flapSpeed = 0.15;

    //动画状态
    this.imgs = [
      imageResource.birdDownflap,
      imageResource.birdMidflap,
      imageResource.birdUpflap,
    ];
  }

  update() {
    this.#drawBird(this.dX, this.dY);
    this.dY += 3;
  }

  fly() {
    this.dY -= 40;
  }

  #drawBird(dx, dy) {
    const i = Math.round(this.index) % 3;
    const img = this.imgs[i];
    this.ctx.drawImage(img, dx, dy);
    this.index += this.flapSpeed;
    this.index = this.index % 150;
  }
}

/**
 * 管道
 */
export class Pipe {}
