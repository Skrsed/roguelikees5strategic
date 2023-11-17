function Room(matrix, x = null, y = null) {
    this.vSize = randomIntFromInterval(3, 8)
    this.hSize = randomIntFromInterval(3, 8)

    this.x = x ?? randomIntFromInterval(0, matrix[0].length - this.vSize)
    this.y = y ?? randomIntFromInterval(0, matrix.length - this.hSize)


    for (var i = 0; i < this.hSize; i++) {
        for (var j = 0; j < this.vSize; j++) {
            if (j >= 0 && j < this.vSize && i >= 0 && i < this.hSize) {
                console.log({ m: matrix, x: i + this.y, y: j + this.x })

                matrix[i + this.y][j + this.x] = 0
                continue
            }

            matrix[i][j] = 1
        }
    }

    var verticalPassesCount = randomIntFromInterval(3, Math.min(5, this.vSize))
    var verticalPasses = []
    while (verticalPasses.length !== verticalPassesCount) {
        var passVIndex = randomIntFromInterval(this.x, this.x + this.vSize - 1)
        if (verticalPasses.includes(passVIndex)) {
            continue
        }
        verticalPasses.push(passVIndex)

        for (var i = this.y - 1; i >= 0; i--) {
            if (matrix[i][passVIndex] === 0) {
                break
            }

            matrix[i][passVIndex] = 0
        }

        for (var i = this.hSize + this.y; i < matrix.length; i++) {
            if (matrix[i][passVIndex] === 0) {
                break
            }

            matrix[i][passVIndex] = 0
        }
    }

    var horizontalPassesCount = randomIntFromInterval(3, Math.min(5, this.hSize))
    var horizontalPasses = []
    while (horizontalPasses.length !== horizontalPassesCount) {
        var passHIndex = randomIntFromInterval(this.y, this.y + this.hSize - 1)
        if (horizontalPasses.includes(passHIndex)) {
            console.log('continue', { hz: this.hSize, horizontalPassesCount, horizontalPasses })
            continue
        }
        horizontalPasses.push(passHIndex)

        for (var i = this.x - 1; i >= 0; i--) {
            if (matrix[passHIndex][i] === 0) {
                break
            }

            matrix[passHIndex][i] = 0
        }

        for (var i = this.vSize + this.x; i < matrix[0].length; i++) {
            if (matrix[passHIndex][i] === 0) {
                break
            }

            matrix[passHIndex][i] = 0
        }
    }
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = Room