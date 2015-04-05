var BaseNode = require('./ast_constructor_base');


function StringLiteralNode(rawString) {
  BaseNode.call(this, 'StringLiteralNode');
  this.rawString = rawString;
  this.chars = rawString.substring(1, rawString.length - 1);
}

module.exports = StringLiteralNode;
