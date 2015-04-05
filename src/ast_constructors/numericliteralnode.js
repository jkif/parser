var BaseNode = require('./ast_constructor_base');


function NumericLiteralNode(rawNumber) {
  BaseNode.call(this, 'NumericLiteralNode');
  this.number = +rawNumber;
}

module.exports = NumericLiteralNode;
