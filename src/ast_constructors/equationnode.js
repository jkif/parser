function EquationNode(firstTerm, secondTerm) {
  this.type = 'EquationNode';
  this.terms = this.terms || [];
  this.terms = this.terms.concat(firstTerm, secondTerm);
}

module.exports = EquationNode;
