export class GameBackground {
  constructor(windwoWidth, windowHeight, gameObjects, ui) {
    //图像资源
    this.backgroundImg = gameObjects.background;
    this.baseImg = gameObjects.base;
    this.messageImg = ui.message;
    this.gameoverImg = ui.gameover;
    this.numberImgs = ui.numbers;

    //基础参数
    this.windwoWidth = windwoWidth;
    this.windowHeight = windowHeight;

    //地面复位最大长度
    this.baseMaxWidth = this.baseImg.width - this.windwoWidth;
    this.baseOffsetX = 0;
    //地面滚动速度
    this.baseSpeed = 2.2;
    //地面高度
    this.baseHeight = this.windowHeight * 0.8;

    //菜单坐标
    this.menuDx = 50;
    this.menuDy = 50;

    //分数坐标
    this.scoreDx = this.windwoWidth - 24 - 5;
    console.log("初始分数坐标",this.scoreDx);
    this.scoreDy = 10;

    //游戏结束坐标
    this.gameoverDx = 50;
    this.gameoverDy = this.windowHeight * 0.4;
  }

  get background() {
    return {
      img: this.backgroundImg,
      sx: 0,
      sy: 0,
      sWidth: this.windwoWidth,
      sHeight: this.windowHeight,
      dx: 0,
      dy: 0,
      dWidth: this.windwoWidth,
      dHeight: this.windowHeight,
    };
  }

  get base() {
    const data = {
      img: this.baseImg,
      sx: this.baseOffsetX % this.baseMaxWidth,
      sy: 0,
      sWidth: this.windwoWidth,
      sHeight: this.baseHeight,
      dx: 0,
      dy: this.baseHeight,
      dWidth: this.windwoWidth,
      dHeight: this.baseHeight,
    };

    this.baseOffsetX = this.baseOffsetX + this.baseSpeed;
    if (this.baseOffsetX > this.baseMaxWidth) {
      this.baseOffsetX = 0;
    }

    return data;
  }

  get menu() {
    return {
      img: this.messageImg,
      dx: this.menuDx,
      dy: this.menuDy,
    };
  }

  get gameover() {
    return {
      img: this.gameoverImg,
      dx: this.gameoverDx,
      dy: this.gameoverDy,
    };
  }

  calcScore(score) {
    if (score == 0) {
      return [
        {
          img: this.numberImgs[0],
          dx: this.scoreDx,
          dy: this.scoreDy,
        },
      ];
    }
    const numbers = [];
    while (score > 0) {
      const tmp = score % 10;
      numbers.push(tmp);
      score = Math.floor(score / 10);
    }
    const results = [];
    let cnt = 1;
    for (const num of numbers) {
      const tmpImg = this.numberImgs[num];
      const dx = cnt > 1 ? this.scoreDx - tmpImg.width - 1 : this.scoreDx;
      results.push({
        img: tmpImg,
        dx: dx,
        dy: this.scoreDy,
      });
      cnt += 1;
    }

    return results
  }
}
