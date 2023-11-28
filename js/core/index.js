import { ImageResource } from "../ui/resource";
import { drawTips } from "../ui";
import { Bird } from "./entity";
export class Game {
  constructor() {
    const myCanvas = document.getElementById("myCanvas");

    this.ctx = myCanvas.getContext("2d");
    this.width = 290;
    this.height = 510;
    this.imageResource = new ImageResource();
    this.bird = new Bird(this.ctx, this.imageResource);

    this.gameOver = false;
    this.start = false;
  }

  run() {
    this.#initEvent();

    this.#render();
  }

  update() {
    //开始渲染小鸟
    this.ctx.clearRect(0, 0, 290, 510);

    if (this.start) {
      //先绘制背景板
      this.drawBack();
      this.bird.update();
    } else {
      //先绘制背景板
      this.drawBack();
      //如果游戏还没有开始,则渲染提示菜单
      drawTips(this.ctx, this.imageResource);
    }

    this.#render();
  }

  drawBack() {
    //绘制背景
    this.ctx.drawImage(this.imageResource.background, 0, 0);

    //绘制滚动的地面
    const time = new Date();
    const offset = (time.getMilliseconds() / 10) % 50;
    this.ctx.drawImage(
      this.imageResource.base,
      offset,
      0,
      288,
      410,
      0,
      410,
      288,
      410
    );
  }

  #initEvent() {
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        this.start = true;
      }

      if (this.start) {
        this.bird.fly();
      }
    });

    document.addEventListener("click", (e) => {
      if (e.isTrusted) {
        this.start = true;
      }
    });
  }

  #render() {
    window.requestAnimationFrame(this.update.bind(this));
  }
}
