function findWay(position, end, matrix) {
    var queue = [];

    matrix[position[0]][position[1]] = 1;
    queue.push([position]); // store a path, not just a position

    while (queue.length > 0) {
        var path = queue.shift(); // get the path out of the queue
        var pos = path[path.length - 1]; // ... and then the last position from it
        var direction = [
            [pos[0] + 1, pos[1]],
            [pos[0], pos[1] + 1],
            [pos[0] - 1, pos[1]],
            [pos[0], pos[1] - 1]
        ];

        for (var i = 0; i < direction.length; i++) {
            // Perform this check first:
            if (direction[i][0] == end[0] && direction[i][1] == end[1]) {
                // return the path that led to the find
                return path.concat([end]);
            }

            if (direction[i][0] < 0 || direction[i][0] >= matrix.length
                || direction[i][1] < 0 || direction[i][1] >= matrix[0].length
                || matrix[direction[i][0]][direction[i][1]] != 0) {
                continue;
            }

            matrix[direction[i][0]][direction[i][1]] = 1;
            // extend and push the path on the queue
            queue.push(path.concat([direction[i]]));
        }
    }
}

module.exports = findWay
