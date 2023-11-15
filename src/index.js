GAMEFIELD_W = 40
GAMEFIELD_H = 24
var WALL = require("images/tile-W.png")
var PathGenerator = require("./PathGenerator.js");
const bfs = require("./ShortestPath.js");
const Room = require("./Room.js");

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
    this.canvas = null

    this.Init.bind(this)
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

    for (var i = 0; i < GAMEFIELD_W; i++) {
        this.matrix[i] = []
        this.gameCells[i] = []
        for (var j = 0; j < GAMEFIELD_H; j++) {
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

    const m = [
        ["A", "A", "A", "B", "A"],
        ["B", "B", "B", "B", "B"],
        ["A", "B", "A", "A", "A"],
        ["A", "B", "B", "B", "B"],
        ["A", "A", "A", "A", "A"]
    ]

    console.log(bfs([0, 0], [4, 4], m))

    console.log({ m: this.matrix })

    var room = new Room(this.matrix)


    // var roomCount = randomIntFromInterval(5,10)
    // for (var i = 0; i < roomCount; i++) {
    //     var room = new Room() // random size, random (3-5)h exits and (3-5)v exits 

    // } 

    // for (var i = 1; i < GAMEFIELD_W - 1; i++) {
    //     for (var j = 1; j < GAMEFIELD_H - 1; j++) {

    //     }
    // }


}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var game = new Game();
game.Init();