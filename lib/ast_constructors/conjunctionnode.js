var BaseNode = require('./ast_constructor_base');


function ConjunctionNode(conjuncts) {
  BaseNode.call(this, 'ConjunctionNode');
  this.conjuncts = this.conjuncts || [];
  this.conjuncts = this.conjuncts.concat(conjuncts);
}

module.exports = ConjunctionNode;
