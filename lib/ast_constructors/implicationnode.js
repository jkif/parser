var BaseNode = require('./ast_constructor_base');


function ImplicationNode(locationData, antecedent, consequent) {
  BaseNode.call(this, 'ImplicationNode', locationData);
  this.antecedent = antecedent;
  this.consequent = consequent;
}

module.exports = ImplicationNode;
