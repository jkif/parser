var BaseNode = require('./ast_constructor_base');


function KIFNode(locationData, kifExpressions) {
  BaseNode.call(this, 'KIFNode');
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(kifExpressions);
  this.locationData = locationData;
}

module.exports = KIFNode;
