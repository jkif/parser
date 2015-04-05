var BaseNode = require('./ast_constructor_base');


function KIFNode(kifExpressions) {
  BaseNode.call(this, 'KIFNode');
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(kifExpressions);
}

module.exports = KIFNode;
