function StringLiteralNode(rawString) {
  this.type = 'StringLiteralNode';
  this.rawString = rawString;
  this.chars = rawString.substring(1, rawString.length - 1);
}

module.exports = StringLiteralNode;
