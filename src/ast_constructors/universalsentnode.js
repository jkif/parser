function UniversalSentNode(variableList, quantifiedSent) {
  this.type = 'UniversalSentNode';
  this.variableList = this.variableList || [];
  this.variableList = this.variableList.concat(variableList);
  this.quantifiedSent = quantifiedSent;
}

module.exports = UniversalSentNode;
