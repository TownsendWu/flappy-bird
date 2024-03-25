/**
 * 简单的物理引擎
 */

export class Physics {
  constructor() {
    this.g = 0.25 ;
    this.fps = 60;
  }

  /**
   * 重力加速度
   * @param {number} velocityY 初始速度
   * @param {number} y 当前y坐标
   * @returns y
   */
  calcY(velocityY, height) {
    // 计算自上次更新以来经过的时间
    // 更新速度和位置
    velocityY += this.g; // v = u + at
    height += velocityY
    return [velocityY, height];
  }
}
