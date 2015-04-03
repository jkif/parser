function ConjunctionNode(conjuncts) {
  this.type = 'ConjunctionNode';
  this.conjuncts = this.conjuncts || [];
  this.conjuncts = this.conjuncts.concat(conjuncts);
}

module.exports = ConjunctionNode;
