var Room = require("./Room.js");

function GameField(matrix, desc, cells, player) {
    this.matrix = matrix
    this.width = matrix[0].length
    this.height = matrix.length
    this.desc = desc
    this.cells = cells
    this.player = player
    this.queue = []
    this.input = []
    this.enemies = []

    this.fieldTypes = {
        floor: 0,
        wall: 1,
        flask: 2,
        hero: 3,
        enemy: 4
    }

    this.alowedFieldTypes = [
        this.fieldTypes.floor,
        this.fieldTypes.sword,
        this.fieldTypes.flask
    ]

    this.Generate.bind(this)
    this.Move.bind(this)
    this.DeMove.bind(this)
    this.RealXFromCell.bind(this)
    this.RealYFromCell.bind(this)
    this.moveMatrix.bind(this)
    this.RandomEmptyField.bind(this)

    this.Generate()
}

GameField.prototype.Generate = function () {
    for (var i = 0; i < this.roomCount; i++) {
        new Room(matrix)
    }
}

GameField.prototype.Move = function (gameEntity, fromPos, toPos) {
    if (toPos.x >= this.matrix[0].length) {
        return
    }
    if (toPos.y >= this.matrix.length) {
        return
    }
    if (gameObject.alowedFieldTypes.includes(matrix[toPos.y][toPos.x])) {

    }
}

GameField.prototype.RandomEmptyField = function () {
    var emptyField = null

    //console.log({ matrix: this.matrix })

    while (!emptyField) {
        var y = randomIntFromInterval(0, this.matrix.length - 1)
        var x = randomIntFromInterval(0, this.matrix[0].length - 1)

        if (this.matrix[y][x] === 0) {
            emptyField = {
                x,
                y
            }
        }
    }

    return emptyField
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

GameField.prototype.RealXFromCell = function (cellX) {
    return this.cells[0][0].offsetWidth * cellX
}

GameField.prototype.RealYFromCell = function (cellY) {
    return this.cells[0][0].offsetHeight * cellY
}

GameField.prototype.DeMove = function (gameObject, fromX, fromY, toX, toY, duration) {
    var p = new Promise(function (resolve) {
        //console.log("make promise", fromX, toX)
        this.queue.push({
            isDone: false,
            startTime: new Date(),
            duration,
            Do: function (dt) {
                gameObject.realX = this.RealXFromCell(fromX) + ((this.RealXFromCell(toX) - this.RealXFromCell(fromX)) * dt / duration)
                gameObject.realY = this.RealYFromCell(fromY) + ((this.RealYFromCell(toY) - this.RealYFromCell(fromY)) * dt / duration)
                gameObject.x = toX
                gameObject.y = toY

                // console.log({ gameObject, self: this, rx: this.RealXFromCell(toX) })
            }.bind(this),
            Done: function () {
                resolve()
            }.bind(this)
        })
    }.bind(this))

    //console.log({ q: this.queue })

    return p
}

GameField.prototype.moveMatrix = function (alowedFieldTypes) {
    var moveMatrix = []
    for (var i = 0; i < this.height; i++) {
        var moveRow = []
        for (var j = 0; j < this.width; j++) {
            var cell = alowedFieldTypes.includes(this.matrix[i][j]) ? "B" : "B"
            moveRow.push(cell)
        }
        moveMatrix.push(moveRow)
    }

    return moveMatrix
}

module.exports = GameField