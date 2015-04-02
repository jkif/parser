function KIFNode(kifExpressions) {
  this.type = 'KIFNode';
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(kifExpressions);
}

function WordNode(identifier) {
  this.type = 'WordNode';
  this.word = identifier;
}

function VariableNode(identifier, variableType) {
  this.type = 'VariableNode';
  this.variableType = variableType || 'IND';
  this.variableName = identifier;
}

module.exports = {
  KIFNode: KIFNode,
  WordNode: WordNode,
  VariableNode: VariableNode
};
