var BaseNode = require('./ast_constructor_base');


function NegationNode(locationData, negatedExpression) {
  BaseNode.call(this, 'NegationNode');
  this.negatedExpression = negatedExpression;
  this.locationData = locationData;
}

module.exports = NegationNode;
