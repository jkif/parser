var BaseNode = require('./ast_constructor_base');


function DisjunctionNode(locationData, disjuncts) {
  BaseNode.call(this, 'DisjunctionNode', locationData);
  this.disjuncts = this.disjuncts || [];
  this.disjuncts = this.disjuncts.concat(disjuncts);
}

module.exports = DisjunctionNode;
