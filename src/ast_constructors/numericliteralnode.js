function NumericLiteralNode(rawNumber) {
  this.type = 'NumericLiteralNode';
  this.number = +rawNumber;
}

module.exports = NumericLiteralNode;
