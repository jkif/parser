var BaseNode = require('./ast_constructor_base');


function ConjunctionNode(locationData, conjuncts) {
  BaseNode.call(this, 'ConjunctionNode');
  this.conjuncts = this.conjuncts || [];
  this.conjuncts = this.conjuncts.concat(conjuncts);
  this.locationData = locationData;
}

module.exports = ConjunctionNode;
