GAMEFIELD_W = 40
GAMEFIELD_H = 24
var WALL = require("images/tile-W.png")
var FLOOR = require("images/tile-.png")
var ENEMY = require("images/tEnemy.png")
var PLAYER = require("images/tPlayer.png")
var PathGenerator = require("./PathGenerator.js");
const bfs = require("./ShortestPath.js");
const Room = require("./Room.js");
const GameField = require("./GameField.js")
const Enemy = require("./Enemy.js")
var test = require("./test.js")
const Player = require("./Player.js")
const Chiff = require("./Chiff.js")

// quick string formating tool
Object.assign(String.prototype, {
    fmt() {
        var res = this
        for (var i = 0; i < arguments.length; i++) {
            res = res.replace("$" + (i + 1), arguments[i])
        }

        return res
    }
});

function Game() {
    this.gameCells = []
    this.matrix = []
    this.enemies = []

    this.canvas = null

    this.Init.bind(this)
    this.DeTick.bind(this)
    this.Loop.bind(this)
}

Game.prototype.Init = function () {
    this.canvas = document.getElementById("gamefield")

    Object.assign(this.canvas.style, {
        "aspect-ratio": "calc($1 / $2)".fmt(GAMEFIELD_W, GAMEFIELD_H),
        "width": "100%",
        "display": "grid",
        "grid-template-columns": "repeat($1, 1fr)".fmt(GAMEFIELD_W),
        "grid-template-rows": "repeat($1, 1fr)".fmt(GAMEFIELD_H)
    })

    for (var i = 0; i < GAMEFIELD_H; i++) {
        this.matrix[i] = []
        this.gameCells[i] = []
        for (var j = 0; j < GAMEFIELD_W; j++) {
            var gameCell = document.createElement("img")
            Object.assign(gameCell.style, {
                "width": "100%",
                "height": "100%"
            });
            //console.log(WALL)
            gameCell.src = WALL

            this.canvas.appendChild(gameCell)

            this.gameCells[i].push(gameCell)
            this.matrix[i].push(1)
        }
    }

    // var m = [
    //     [0, 1, 0, 1, 0],
    //     [0, 0, 1, 0, 0],
    //     [0, 0, 1, 1, 0],
    //     [0, 0, 0, 0, 0],
    //     [0, 1, 0, 1, 0]
    // ];

    // var start = [4, 0];
    // var end = [3, 4];

    // console.log(bfs([0, 0], [4, 4], m))
    var roomCount = randomIntFromInterval(5, 10)
    for (var i = 0; i < roomCount; i++) {
        new Room(this.matrix)
    }

    this.matrix = test.matrix

    for (var i = 0; i < this.matrix.length; i++) {
        for (var j = 0; j < this.matrix[0].length; j++) {
            this.gameCells[i][j].src = this.matrix[i][j] ? WALL : FLOOR
        }
    }

    //var htmlCanvas = document.getElementById("canvas")
    this.offscreen = document.createElement('canvas');
    this.gl = this.offscreen.getContext("2d");

    this.enemyPng = new Image()
    this.enemyPng.src = ENEMY

    this.playerPng = new Image()
    this.playerPng.src = PLAYER

    //this.canvasCtx = htmlCanvas.getContext("2d")
    // this.enemyPng.onload = function () {
    //     //ctx.canvas.style.imageRendering = 'pixelated';//default
    //     this.canvasCtx.canvas.width = this.canvas.offsetWidth * 10
    //     this.canvasCtx.canvas.height = this.canvas.offsetHeight * 10
    //     this.canvasCtx.imageSmoothingEnabled = true
    //     this.canvasCtx.drawImage(this.enemyPng, 10, 10, this.gameCells[0][0].width * 10, this.gameCells[0][0].height * 10)
    //     console.log("drawImage")
    // }.bind(this)

    //console.log({ indexM: this.matrix })



    this.gameField = new GameField(this.matrix, this.canvas, this.gameCells)

    var position = [
        this.gameField.RandomEmptyField(),
        this.gameField.RandomEmptyField(),
        this.gameField.RandomEmptyField(),
        this.gameField.RandomEmptyField(),
        this.gameField.RandomEmptyField(),
        this.gameField.RandomEmptyField(),
        this.gameField.RandomEmptyField()
    ]
    var destination = this.gameField.RandomEmptyField()

    this.gameField.player = new Player(this.gameField, destination.x, destination.y)
    this.gameField.chiff = new Chiff(this.gameField)


    for (var i = 0; i < position.length; i++) {
        this.gameField.enemies.push(
            new Enemy(this.gameField, position[i].x, position[i].y)
        )
    }

    //console.log({ gf: this.gameField, e: this.enemies })

    this.Loop(new Date())
}

function draw(offScreenCanvas, width, height) {
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d');

    console.log('draw')

    // The cause of the problem ===================================
    // Either one of the following lines will clear the canvas
    canvas.width = width * 10
    canvas.height = height * 10
    //=============================================================

    ctx.drawImage(offScreenCanvas, 0, 0);
}

Game.prototype.Loop = function (timestamp) {
    this.gameField.player.Move()
    this.gameField.chiff.MakeStrategy()

    this.gameField.queue = this.gameField.queue.filter(function (element) {
        // console.log(element.isDone)
        return !element.isDone
    })

    //console.log({ queue: this.gameField.queue })

    for (var i = 0; i < this.gameField.queue.length; i++) {
        // console.log({
        //     duration: this.gameField.queue[i].duration,
        //     st: this.gameField.queue[i].startTime,
        //     diff: new Date() - this.gameField.queue[i].startTime,
        //     len: this.gameField.queue.length
        // })
        if (this.gameField.queue[i].duration <= new Date() - this.gameField.queue[i].startTime) {
            //console.log("done")
            this.gameField.queue[i].Done()
            this.gameField.queue[i].isDone = true

            continue
        }
        this.gameField.queue[i].Do(new Date() - this.gameField.queue[i].startTime)
    }

    if (this.enemyPng.complete && this.enemyPng.naturalHeight !== 0) {
        this.gl.canvas.width = this.canvas.offsetWidth * 10
        this.gl.canvas.height = this.canvas.offsetHeight * 10
        this.gl.imageSmoothingEnabled = true

        for (var i = 0; i < this.gameField.enemies.length; i++) {
            this.gl.drawImage(
                this.enemyPng,
                Math.round(this.gameField.enemies[i].realX * 10),
                Math.round(this.gameField.enemies[i].realY * 10),
                this.gameCells[0][0].width * 10,
                this.gameCells[0][0].height * 10
            )
        }
    }

    if (this.playerPng.complete && this.playerPng.naturalHeight !== 0) {
        // console.log("draw player", {
        //     rx: this.gameField.player.realX,
        //     ry: this.gameField.player.realY
        // })

        this.gl.drawImage(
            this.playerPng,
            Math.round(this.gameField.RealXFromCell(this.gameField.player.x)) * 10,
            Math.round(this.gameField.RealXFromCell(this.gameField.player.y)) * 10,
            this.gameCells[0][0].width * 10,
            this.gameCells[0][0].height * 10
        )
    }

    //console.log({ can: this.canvasCtx, off: this.offscreen.transferToImageBitmap() })

    draw(this.offscreen, this.gameCells[0][0].width * 40, this.gameCells[0][0].height * 24)

    //this.canvasCtx.drawImage(this.offscreen.transferToImageBitmap(), this.gameCells[0][0].width * 2, this.gameCells[0][0].height * 2)
    window.requestAnimationFrame(this.Loop.bind(this))
}

Game.prototype.DeTick = function () {
    for (var i = 0; i < this.gameField.enemies.length; i++) {
        this.gameField.enemies[i].Move()
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var game = new Game();
game.Init();

setInterval(function () {
    game.DeTick()
}, 1000)

addEventListener("keydown", function (event) {
    if (!game.gameField.input.includes(event.key)) {
        game.gameField.input.push(event.key)
    }
})

addEventListener("keyup", function (event) {
    if (game.gameField.input.includes(event.key)) {
        game.gameField.input = game.gameField.input
            .filter(function (key) {
                return key !== event.key
            })
    }
})