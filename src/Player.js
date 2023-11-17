function Player(gameField, x, y) {
    this.gameField = gameField

    this.realX = this.gameField.RealXFromCell(x)
    this.realY = this.gameField.RealYFromCell(y)

    // console.log({
    //     y,
    //     pry: this.realY
    // })

    this.x = x
    this.y = y
    this.alowedFieldTypes = [
        //this.gameField.fields.Floor
        0
    ]

    this.Move.bind(this)
}

Player.prototype.Move = function () {
    var destX = this.x
    var destY = this.y

    //console.log({ input: this.gameField.input, x: this.x, y: this.y, inc: this.gameField.input.includes("W") })

    // TODO: case insensetive
    if (this.gameField.input.includes("w")) destY--

    if (this.gameField.input.includes("s")) destY++

    if (this.gameField.input.includes("d")) destX++

    if (this.gameField.input.includes("a")) destX--

    //console.log("try move", { destX, x: this.x })

    if (!this.isMoving && (destX !== this.x || destY !== this.y)) {
        this.isMoving = true
        var p = this.gameField.DeMove(this, this.x, this.y, destX, destY, 200)
        p.then(function () {
            setTimeout(function () {
                this.isMoving = false
            }.bind(this), 200)

            //console.log("player move atom is done")
        }.bind(this))
    }
}

module.exports = Player