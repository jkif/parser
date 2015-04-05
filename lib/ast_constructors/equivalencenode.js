var BaseNode = require('./ast_constructor_base');


function EquivalenceNode(locationData, firstExpr, secondExpr) {
  BaseNode.call(this, 'EquivalenceNode');
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(firstExpr, secondExpr);
  this.locationData = locationData;
}

module.exports = EquivalenceNode;
