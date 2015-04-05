var BaseNode = require('./ast_constructor_base');


function EquationNode(locationData, firstTerm, secondTerm) {
  BaseNode.call(this, 'EquationNode', locationData);
  this.terms = this.terms || [];
  this.terms = this.terms.concat(firstTerm, secondTerm);
}

module.exports = EquationNode;
