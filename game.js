import { ResourceLoader } from "./js/resources-loader.js";
import { App } from "./app.js";
import { updateScore } from "./js/utils/update-maxscore-util.js";

export class Game {
  constructor() {
    //控制帧数
    this.fps = 60;
    this.interval = 1000 / this.fps;
    this.lastTime = 0;
  }

  async run() {
    //先加载资源
    const resourceLoader = new ResourceLoader();
    const gameObject = await resourceLoader.initGameObjects();
    const ui = await resourceLoader.initUIs();
    const sound = await resourceLoader.initSound();

    this.app = new App(gameObject, ui, sound);

    this.loop();
  }

  loop(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    if (deltaTime > this.interval) {
      this.lastTime = timeStamp - (deltaTime % this.interval);
      this.app.run();
    }
    this.#render();
  }

  #render() {
    window.requestAnimationFrame(this.loop.bind(this));
  }
}

updateScore()

const game = new Game();
game.run();
