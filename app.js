import { GameBackground } from "./js/background.js";
import { GameCanvas } from "./js/game-canvas.js";
import { Player } from "./js/player.js";
import { Pipe } from "./js/pipe.js";
import { updateScore } from "./js/utils/update-maxscore-util.js";

export class App {
  constructor(gameObject, ui, sound) {
    //注册事件
    this.#initEvent();

    //获取画布和游戏基本配置
    const gameCanvas = new GameCanvas();
    this.canvas = gameCanvas.canvas;
    this.ctx = gameCanvas.ctx;

    //游戏窗口大小
    this.windowWidth = gameCanvas.width;
    this.windowHeight = gameCanvas.height;

    //加载游戏资源
    this.gameObject = gameObject;
    this.ui = ui;
    this.sound = sound;

    //游戏背景
    this.gameBackGround = new GameBackground(
      this.windowWidth,
      this.windowHeight,
      this.gameObject,
      this.ui
    );

    //小鸟玩家
    this.player = new Player(
      this.windowWidth,
      this.windowHeight,
      this.gameObject,
      this.sound
    );

    //管道障碍物
    this.pipe = new Pipe(
      this.windowWidth,
      this.windowHeight,
      this.gameObject,
      this.sound
    );

    //初始游戏状态
    this.isStart = false;
    this.gameover = false;
    this.isCollision = false;
    this.score = 0;
    this.maxScore = Number(localStorage.getItem("flappy:maxScore")) || 0;
  }

  run() {
    this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
    if (this.isStart && !this.gameover) {
      this.#drawBackground();
      this.#drawBase();
      this.#drawPlayerFlap();
      this.#drawPipe();
      this.#drawScore();

      this.gameover = this.pipe.collision(this.player.dx, this.player.dy);
      const scoreOrNot = this.pipe.calcSocre(this.player.dx, this.player.dy);
      // console.log(scoreOrNot);
      if (!this.gameover && scoreOrNot) {
        this.score += 1;
        this.maxScore = Math.max(this.score, this.maxScore);
      }

      return;
    }

    if (this.gameover) {
      this.#drawBackground();
      this.#drawBase();
      this.#drawPlayerFlap();
      this.#drawPipe();
      this.#drawScore();
      this.#drawGameover();
      if (this.score >= this.maxScore) {
        localStorage.setItem("flappy:maxScore", this.maxScore.toString());
        updateScore();
      }
      return;
    }

    this.#drawBackground();
    this.#drawBase();
    this.#drawMessage();
  }

  #resetStatus() {
    this.player.reset();
    this.pipe.reset();
    this.isStart = false;
    this.gameover = false;
    this.score = 0;
  }

  #drawBackground() {
    const { img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } =
      this.gameBackGround.background;
    this.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  #drawBase() {
    const { img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } =
      this.gameBackGround.base;
    this.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  #drawMessage() {
    const { img, dx, dy } = this.gameBackGround.menu;
    this.ctx.drawImage(img, dx, dy);
  }

  #drawGameover() {
    const { img, dx, dy } = this.gameBackGround.gameover;
    this.ctx.drawImage(img, dx, dy);
  }

  #drawPlayerFlap() {
    const { img, dx, dy, rotation } = this.player.update(this.gameover);
    // this.ctx.save();

    // this.ctx.translate(this.player.dX, this.player.dY);
    // this.ctx.rotate(rotation);
    // this.ctx.rotate((Math.PI / 180) * 25);
    this.ctx.drawImage(img, dx, dy);
    // this.ctx.restore();
  }

  #drawScore() {
    const results = this.gameBackGround.calcScore(this.score);
    for (const item of results) {
      const { img, dx, dy } = item;
      this.ctx.drawImage(img, dx, dy);
    }
  }

  #drawPipe() {
    const { img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight } =
      this.pipe.update(this.gameover);
    this.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  #initEvent() {
    document.addEventListener("keydown", (e) => {
      // console.log(e);
      if (e.code === "Space") {
        //如果当前是游戏结束状态，则再次按下空格 就重开游戏
        if (this.gameover) {
          this.#resetStatus();
        } else {
          this.isStart = true;
          this.player.jump();
        }
      } else if (e.code === "KeyR") {
        this.#resetStatus();
      }
    });

    document.addEventListener("click", (e) => {
      if (e.isTrusted) {
        if (this.gameover) {
          this.#resetStatus();
        } else {
          this.isStart = true;
          this.player.jump();
        }
      }
    });
  }
}
