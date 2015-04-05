var BaseNode = require('./ast_constructor_base');


function EquationNode(locationData, firstTerm, secondTerm) {
  BaseNode.call(this, 'EquationNode');
  this.terms = this.terms || [];
  this.terms = this.terms.concat(firstTerm, secondTerm);
  this.locationData = locationData;
}

module.exports = EquationNode;
