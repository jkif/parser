var BaseNode = require('./ast_constructor_base');


function NumericLiteralNode(locationData, rawNumber) {
  BaseNode.call(this, 'NumericLiteralNode', locationData);
  this.number = +rawNumber;
}

module.exports = NumericLiteralNode;
