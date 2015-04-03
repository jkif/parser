function KIFNode(kifExpressions) {
  this.type = 'KIFNode';
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(kifExpressions);
}

module.exports = KIFNode;
