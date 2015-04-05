var BaseNode = require('./ast_constructor_base');


function ImplicationNode(antecedent, consequent) {
  BaseNode.call(this, 'ImplicationNode');
  this.antecedent = antecedent;
  this.consequent = consequent;
}

module.exports = ImplicationNode;
