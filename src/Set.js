function Set() {
    this._data = {};

    this.add.bind(this)
    this.has.bind(this)
}

Set.prototype.add = function (value) {
    this._data[value] = true

    return this
}

Set.prototype.has = function (value) {
    return !!this._data[value]
}

module.exports = Set