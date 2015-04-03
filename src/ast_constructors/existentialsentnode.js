function ExistentialSentNode(variableList, quantifiedSent) {
  this.type = 'ExistentialSentNode';
  this.variableList = this.variableList || [];
  this.variableList = this.variableList.concat(variableList);
  this.quantifiedSent = quantifiedSent;
}

module.exports = ExistentialSentNode;
