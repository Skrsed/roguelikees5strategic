var uuidModule = require('uuidv4')

function Enemy(gameField, x, y) {
    this.gameField = gameField

    this.uuid = uuidModule.uuid()
    this.realX = this.gameField.RealXFromCell(x)
    this.realY = this.gameField.RealYFromCell(y)

    this.x = x
    this.y = y
    this.alowedFieldTypes = [
        //this.gameField.fields.Floor
        0
    ]

    this.Move.bind(this)
}

Enemy.prototype.Move = function () {
    var strategy = this.gameField.chiff.GetStrategy(this.uuid)

    console.log({ strategy })

    if (!strategy) {
        return
    }

    var p = this.gameField.DeMove(this, this.x, this.y, strategy.x, strategy.y, 1000)

    p.then(function () {
        //console.log("move atom is done")
    })
}

module.exports = Enemy
