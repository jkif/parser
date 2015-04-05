var BaseNode = require('./ast_constructor_base');


function ConjunctionNode(locationData, conjuncts) {
  BaseNode.call(this, 'ConjunctionNode', locationData);
  this.conjuncts = this.conjuncts || [];
  this.conjuncts = this.conjuncts.concat(conjuncts);
}

module.exports = ConjunctionNode;
