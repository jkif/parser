function EquivalenceNode(firstExpr, secondExpr) {
  this.type = 'EquivalenceNode';
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(firstExpr, secondExpr);
}

module.exports = EquivalenceNode;
