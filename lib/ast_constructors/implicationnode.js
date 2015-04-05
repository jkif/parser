var BaseNode = require('./ast_constructor_base');


function ImplicationNode(locationData, antecedent, consequent) {
  BaseNode.call(this, 'ImplicationNode');
  this.antecedent = antecedent;
  this.consequent = consequent;
  this.locationData = locationData;
}

module.exports = ImplicationNode;
