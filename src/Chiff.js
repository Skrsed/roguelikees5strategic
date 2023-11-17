var bfs = require("./ShortestPath.js");

function Chiff(gameField) {
    this.gameField = gameField
    this.strategies = {}

    this.MakeStrategy.bind(this)
    this.GetStrategy.bind(this)
}

Chiff.prototype.MakeStrategy = function () {
    var matrixCopy = JSON.parse(JSON.stringify(this.gameField.matrix))

    var destX = this.gameField.player.x
    var destY = this.gameField.player.y

    //console.log(this.gameField.enemies.length)
    var enemies = this.gameField.enemies

    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i]



        var path = bfs(
            [enemy.y, enemy.x],
            [destY, destX],
            JSON.parse(JSON.stringify(matrixCopy))
        )

        if (!path) {
            this.strategies[enemy.uuid] = null

        } else {
            var strategy = {
                x: path[1][1],
                y: path[1][0]
            }

            this.strategies[enemy.uuid] = strategy
            matrixCopy[strategy.y][strategy.x] = 1
        }

        matrixCopy[enemy.y][enemy.x] = 1

    }
}

Chiff.prototype.GetStrategy = function (uuid) {
    console.log({ s: this.strategies })
    for (var strategy in this.strategies) {
        if (strategy.uuid === uuid) {
            return {
                x: strategy.dest[1],
                y: strategy.dest[0]
            }
        }
    }

    if (this.strategies.hasOwnProperty(uuid)) {
        return this.strategies[uuid]
    }

    return null
}

module.exports = Chiff