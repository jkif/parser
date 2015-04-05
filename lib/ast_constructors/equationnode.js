var BaseNode = require('./ast_constructor_base');


function EquationNode(firstTerm, secondTerm) {
  BaseNode.call(this, 'EquationNode');
  this.terms = this.terms || [];
  this.terms = this.terms.concat(firstTerm, secondTerm);
}

module.exports = EquationNode;
