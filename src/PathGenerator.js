function PathGenerator(matrx, startX, startY) {
    this.pathes = []

    this.make.bind(this)
    this.findPaths.bind(this)
}

PathGenerator.prototype.Make = function (matrix, startX, startY, endX, endY) {
    findPaths(matrix, startX, startY, endX, endY);

    return this.pathes
}

PathGenerator.prototype.store = function (path) {
    for (let i = 0; i < path.length; i++) {
        this.pathes.push(path[i]);
        if (!path[i]) {
            respath = null;

            return;
        }
    }
    //console.log(respath);
}

PathGenerator.prototype.findPaths = function (matrix, startX, startY, endX, endY) {
    var endX = matrix.length
    var endY = matrix[0].length
    var path = []

    if (startX === endX - 1 && startY === endY - 1) {
        path.push(matrix[startX][startY]);
        this.store(path)
        path.pop();
        return;
    }

    // Boundary cases: Check if we are out of the matrix
    if (startX < 0 || startX >= endX || startY < 0 || startY >= endY) {
        return;
    }

    // Include the current cell in the path
    path.push(matrix[startX][startY]);

    // Move right in the matrix
    if (startY + 1 < endY) {
        findPaths(matrix, path, startX, startY + 1);
    }

    // Move down in the matrix
    if (startX + 1 < endX) {
        findPaths(matrix, path, startX + 1, startY);
    }

    // Backtrack: Remove the current cell from the current path
    path.pop();
}