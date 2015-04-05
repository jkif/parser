var BaseNode = require('./ast_constructor_base');


function StringLiteralNode(locationData, rawString) {
  BaseNode.call(this, 'StringLiteralNode');
  this.rawString = rawString;
  this.chars = rawString.substring(1, rawString.length - 1);
  this.locationData = locationData;
}

module.exports = StringLiteralNode;
