module.exports = {
  findById: function (array, id) {
    return array.find((i) => i.id === id)
  }
}
