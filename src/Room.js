function Room(matrix) {
    this.vSize = randomIntFromInterval(3, 8)
    this.hSize = randomIntFromInterval(3, 8)

    this.x = randomIntFromInterval(0, matrix.length - this.vSize)
    this.y = randomIntFromInterval(0, matrix[0].length - this.hSize)

    console.log({ x: this.x, y: this.y })
    console.log({ v: this.vSize, h: this.hSize })

    for (var i = 0; i <= this.vSize; i++) {
        for (var j = 0; j <= this.hSize; j++) {
            if (i >= 0 && i < this.vSize && j >= 0 && j < this.hSize) {
                matrix[i + this.x][j + this.y] = 0
                continue
            }

            matrix[i][j] = 1
        }
    }

    var vertcalWallsCount = randomIntFromInterval(3, Math.min(5, this.vSize))
    var verticalWalls = []
    while (verticalWalls.length !== vertcalWallsCount) {
        i = randomIntFromInterval(this.x, this.x + this.vSize)
        if (verticalWalls.includes(i)) {
            console.log("continue")
            continue
        }

        console.log("push")

        verticalWalls.push(i)
        for (i = 0; i < matrix.length; i++) {
            if (i > this.x && i < this.vSize + 1) {
                continue
            }
            if (matrix[i][j] === 0) {
                break;
            }
            matrix[i][j] = 0
        }
    }

    console.log({ matrix })

    // varticalWalls = vertcalWalls.slice(1, vertcalWalls.length - 2)

    // console.log({ vertcalWalls })

    // var vertacalEntrancesC = randomIntFromInterval(1, 4)
    // var horizontalEntrances = randomIntFromInterval(1, 4)

    // vEntrances = []

    // while (vEntrances.length !== vertacalEntrancesC) {
    //     var makeAHole = randomIntFromInterval(0, vertcalWalls.length - 1)
    //     console.log(makeAHole)
    //     var row = vertcalWalls[makeAHole][0]
    //     var col = vertcalWalls[makeAHole][1]
    //     res[row][col] = 0
    //     vEntrances.push([row, col])

    //     vertcalWalls = vertcalWalls.filter(function (_, index) {
    //         return index !== makeAHole
    //     })
    // }

    // console.log(res)
    // console.log(vEntrances)

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = Room