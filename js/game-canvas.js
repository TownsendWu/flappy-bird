export class GameCanvas {
  constructor() {
    this.canvas = document.getElementById("gameBox");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width
    this.height = this.canvas.height
  }
}
