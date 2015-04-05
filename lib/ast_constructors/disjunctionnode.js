var BaseNode = require('./ast_constructor_base');


function DisjunctionNode(locationData, disjuncts) {
  BaseNode.call(this, 'DisjunctionNode');
  this.disjuncts = this.disjuncts || [];
  this.disjuncts = this.disjuncts.concat(disjuncts);
  this.locationData = locationData;
}

module.exports = DisjunctionNode;
