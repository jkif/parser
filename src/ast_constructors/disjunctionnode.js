function DisjunctionNode(disjuncts) {
  this.type = 'DisjunctionNode';
  this.disjuncts = this.disjuncts || [];
  this.disjuncts = this.disjuncts.concat(disjuncts);
}

module.exports = DisjunctionNode;
