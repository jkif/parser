var BaseNode = require('./ast_constructor_base');


function EquivalenceNode(locationData, firstExpr, secondExpr) {
  BaseNode.call(this, 'EquivalenceNode', locationData);
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(firstExpr, secondExpr);
}

module.exports = EquivalenceNode;
