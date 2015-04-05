var BaseNode = require('./ast_constructor_base');


function DisjunctionNode(disjuncts) {
  BaseNode.call(this, 'DisjunctionNode');
  this.disjuncts = this.disjuncts || [];
  this.disjuncts = this.disjuncts.concat(disjuncts);
}

module.exports = DisjunctionNode;
