import { GameCanvas } from "./js/game-canvas.js";
import { GameBackground } from "./js/entity/background.js";
import { Player } from "./js/entity/player.js";
import { Pipe } from "./js/entity/pipe.js";
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
    this.pipe1 = new Pipe(
      this.windowWidth,
      this.windowHeight,
      this.gameObject,
      this.sound
    );

    this.pipe2 = new Pipe(
      this.windowWidth,
      this.windowHeight,
      this.gameObject,
      this.sound,
      this.pipe1.initDx + 200
    );

    //初始游戏状态
    this.isStart = false;
    this.gameover = false;
    this.score = 0;
    this.maxScore = Number(localStorage.getItem("flappy:maxScore")) || 0;
  }

  run() {
    this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
    if (this.isStart && !this.gameover) {
      this.#drawBackground();
      this.#drawBase();
      this.#drawPlayerFlap();
      this.#drawPipeGroup();
      this.#drawScore();

      //判断是否碰撞，碰撞则游戏结束
      this.gameover =
        this.pipe1.collision(this.player.dx, this.player.dy) ||
        this.pipe2.collision(this.player.dx, this.player.dy);
      //判断是否得分
      const scoreOrNot =
        this.pipe1.calcSocre(this.player.dx, this.player.dy) ||
        this.pipe2.calcSocre(this.player.dx, this.player.dy);
      
      //如果得分了
      if (!this.gameover && scoreOrNot) {
        this.score += 1;
      }

      return;
    }
    //如果游戏结束
    if (this.gameover) {
      this.#drawBackground();
      this.#drawBase();
      this.#drawPlayerFlap();
      this.#drawPipeGroup();
      this.#drawScore();
      this.#drawGameover();

      //如果分数大于最高分，则更新最高分
      if (this.score > this.maxScore) {
        this.maxScore = Math.max(this.score, this.maxScore);
        localStorage.setItem("flappy:maxScore", this.maxScore.toString());
        updateScore();
      }
      return;
    }

    //游戏未开始
    this.#drawBackground();
    this.#drawBase();
    this.#drawMessage();
  }

  #resetStatus() {
    this.player.reset();
    this.pipe1.reset();
    this.pipe2.reset();
    this.isStart = false;
    this.gameover = false;
    this.score = 0;
  }
  #drawPipeGroup() {
    this.#drawPipe(1);
    this.#drawPipe(2);
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

  #drawPipe(vlaue) {
    const pipes =
      vlaue == 1
        ? this.pipe1.update(this.gameover)
        : this.pipe2.update(this.gameover);
    const downPipe = pipes[0];
    this.ctx.drawImage(
      downPipe.img,
      downPipe.sx,
      downPipe.sy,
      downPipe.sWidth,
      downPipe.sHeight,
      downPipe.dx,
      downPipe.dy,
      downPipe.dWidth,
      downPipe.dHeight
    );
    this.ctx.save();

    const topPipe = pipes[1];
    // 将画布原点移动到上面管道的中心
    this.ctx.translate(
      topPipe.dx + topPipe.dWidth / 2,
      topPipe.dy + topPipe.dHeight / 2
    );

    this.ctx.rotate(Math.PI);

    this.ctx.drawImage(
      topPipe.img,
      topPipe.sx,
      topPipe.sy,
      topPipe.sWidth,
      topPipe.sHeight,
      -topPipe.dWidth / 2,
      -topPipe.dHeight / 2,
      topPipe.dWidth,
      topPipe.dHeight
    );

    this.ctx.restore();
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
