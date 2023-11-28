import BackgroundImg from "../../assert/GameObjects/background-day.png";
import BaseImg from "../../assert/GameObjects/base.png";
import PipeImg from "../../assert/GameObjects/pipe-green.png";

import BirdDownflapImg from "../../assert/GameObjects/yellowbird-downflap.png";
import BirdMidflapImg from "../../assert/GameObjects/yellowbird-midflap.png";
import BirdUpflapImg from "../../assert/GameObjects/yellowbird-upflap.png";

import MessageImg from "../../assert/UI/message.png";
import GameoverImg from "../../assert/UI/gameover.png";

import ZeroImg from "../../assert/UI/Numbers/0.png";
import OneImg from "../../assert/UI/Numbers/1.png";
import TwoImg from "../../assert/UI/Numbers/2.png";
import ThreeImg from "../../assert/UI/Numbers/3.png";
import FourImg from "../../assert/UI/Numbers/4.png";
import FiveImg from "../../assert/UI/Numbers/5.png";
import SixImg from "../../assert/UI/Numbers/6.png";
import SevenImg from "../../assert/UI/Numbers/7.png";
import EightImg from "../../assert/UI/Numbers/8.png";
import NineImg from "../../assert/UI/Numbers/9.png";

export class ImageResource {
  constructor() {
    /**
     * 游戏背景
     */
    this.background = new Image();
    this.background.src = BackgroundImg;

    /**
     * 地面
     */
    this.base = new Image();
    this.base.src = BaseImg;

    /**
     * 管道
     */
    this.pipe = new Image();
    this.pipe.src = PipeImg;

    /**
     * 鸟
     */
    this.birdDownflap = new Image();
    this.birdDownflap.src = BirdDownflapImg;

    this.birdMidflap = new Image();
    this.birdMidflap.src = BirdMidflapImg;

    this.birdUpflap = new Image();
    this.birdUpflap.src = BirdUpflapImg;

    /**
     * ui 提示菜单
     */
    this.tipMenu = new Image();
    this.tipMenu.src = MessageImg;

    /**
     * ui 游戏结束
     */
    this.gameover = new Image();
    this.gameover.src = GameoverImg;

    /**
     * ui 数字
     */
    this.zero = new Image();
    this.zero.src = ZeroImg;

    this.one = new Image();
    this.one.src = OneImg;

    this.two = new Image();
    this.two.src = TwoImg;

    this.three = new Image();
    this.three.src = ThreeImg;

    this.four = new Image();
    this.four.src = FourImg;

    this.five = new Image();
    this.five.src = FiveImg;

    this.six = new Image();
    this.six.src = SixImg;

    this.seven = new Image();
    this.seven.src = SevenImg;

    this.eight = new Image();
    this.eight.src = EightImg;

    this.nine = new Image();
    this.nine.src = NineImg;
  }
}

export class AudioResource {}
