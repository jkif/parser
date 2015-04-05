var BaseNode = require('./ast_constructor_base');


function KIFNode(locationData, kifExpressions) {
  BaseNode.call(this, 'KIFNode', locationData);
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(kifExpressions);
}

module.exports = KIFNode;
