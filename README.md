### 启动方式

> 因为浏览器的限制,不能再通过直接打开index.html的方式运行


如果是用vscode打开的，可以下一个 `Live Server`

如果你用的python，可以在本项目根目录下，快速启动一个http服务
```
 python -m http.server 5500
```

然后访问 <a>127.0.0.1:5500/index.html</a>

### 目录结构

```
----flappy-bird\
    |----assets\ 游戏资源
    |----js\
    |    |----entity\
    |         |----background.js 游戏背景图，ui等
    |         |----pipe.js 管道障碍物,得分计算，碰撞逻辑等
    |         |----player.js 玩家(小鸟)
    |    |----utils\
    |         |----random-util.js
    |         |----update-maxscore-util.js
    |         |----physics-util.js 简单的物理引擎，控制小鸟重力加速度
    |    |----game-canvas.js 获取canvas
    |    |----resources-loader.js 资源加载器
    |    |----resources.js 资源实体类
    |
    |----index.html
    |----game.js 游戏入口，负责加载资源，控制显示器帧数等
    |----app.js  游戏渲染引擎，负责交互以及画面渲染
    |----LICENSE
    |----README.md
    |----style.css
```
