function RelSentNode(variable, args) {
  this.type = 'RelSentNode';
  this.variable = variable;
  this.argumentList = this.argumentList || [];
  this.argumentList = this.argumentList.concat(args);
}

module.exports = RelSentNode;
