var BaseNode = require('./ast_constructor_base');


function NumericLiteralNode(locationData, rawNumber) {
  BaseNode.call(this, 'NumericLiteralNode');
  this.number = +rawNumber;
  this.locationData = locationData;
}

module.exports = NumericLiteralNode;
