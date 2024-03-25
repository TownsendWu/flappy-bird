/**
 * 资源加载类，会保证图片都加载完
 */

import { GameObjects, UI, Sound } from "./resources.js"

const BASE_OBJECTS_PATH = "../assets/objects/"
const BASE_SOUNDS_PATH = "../assets/sounds/"
const BASE_UI_PATH = "../assets/ui/"
const BASE_UI_NUMBERS_PATH = "../assets/ui/numbers/"

export class ResourceLoader {
    constructor() {
        this.objects = [
            `${BASE_OBJECTS_PATH}background-day.png`,
            `${BASE_OBJECTS_PATH}base.png`,
            `${BASE_OBJECTS_PATH}pipe-green.png`,
            `${BASE_OBJECTS_PATH}yellowbird-upflap.png`,
            `${BASE_OBJECTS_PATH}yellowbird-midflap.png`,
            `${BASE_OBJECTS_PATH}yellowbird-downflap.png`
        ]

        this.uis = [
            `${BASE_UI_PATH}message.png`,
            `${BASE_UI_PATH}gameover.png`,
            `${BASE_UI_NUMBERS_PATH}0.png`,
            `${BASE_UI_NUMBERS_PATH}1.png`,
            `${BASE_UI_NUMBERS_PATH}2.png`,
            `${BASE_UI_NUMBERS_PATH}3.png`,
            `${BASE_UI_NUMBERS_PATH}4.png`,
            `${BASE_UI_NUMBERS_PATH}5.png`,
            `${BASE_UI_NUMBERS_PATH}6.png`,
            `${BASE_UI_NUMBERS_PATH}7.png`,
            `${BASE_UI_NUMBERS_PATH}8.png`,
            `${BASE_UI_NUMBERS_PATH}9.png`,
        ]

        this.sounds = [
            `${BASE_SOUNDS_PATH}die.ogg`,
            `${BASE_SOUNDS_PATH}hit.ogg`,
            `${BASE_SOUNDS_PATH}point.ogg`,
            `${BASE_SOUNDS_PATH}swoosh.ogg`,
            `${BASE_SOUNDS_PATH}wing.ogg`
        ]
    }

    async initGameObjects() {
        const images = await this.#loadResource(this.objects)
        if (images.length == 0) {
            throw new Error("资源加载失败")
        }
        return new GameObjects(
            images[0],
            images[1],
            images[2],
            images[3],
            images[4],
            images[5],
        )

    }
    async initUIs() {
        const images = await this.#loadResource(this.uis)
        if (images.length == 0) {
            throw new Error("资源加载失败")
        }
        return new UI(
            images[0],
            images[1],
            [
                images[2],
                images[3],
                images[4],
                images[5],
                images[6],
                images[7],
                images[8],
                images[9],
                images[10],
                images[11],
            ]
        )
    }

    async initSound() {
        return new Sound(
            this.sounds[0],
            this.sounds[1],
            this.sounds[2],
            this.sounds[3],
            this.sounds[4]
        )
    }

    async #loadResource(srcs) {
        return Promise.all(srcs.map(this.#loadImage)).then(results => {
            return results
        }).catch(err => {
            console.error(err);
            throw new Error(err);
        })
    }

    #loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload(resolve(img))
            img.onerror = reject
        })
    }
}