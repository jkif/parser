/**
 * jKif - 2015
 * node_sent.js
 * @file NodeSent Constructor
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var _ = require('ramda'), NODE_TACTUS = 1;


/**
 *
 * @params {Object} proposition
 * @params {Number} idx
 * @params {Object} rRule
 * @constructor
 */
function NodeSent(proposition, idx, rRule) {
  this.line = idx;
  this.checked = false;
  this.proposition = proposition;
  this._id = this.setId();
  this.rRule = rRule || { fromLine: null, name: 'initialSentence' };
}


/**
 *
 * @description prototype setup, constructor cleanup, method delegation, and registry constants
 */
NodeSent.prototype = {
  constructor: NodeSent,
  registry: {
    'ConjunctionNode': true,
    'DisjunctionNode': true,
    'ImplicationNode': true,
    'EquivalenceNode': true
  }
};


/**
 *
 * @public
 * @returns {Number|String}
 */
NodeSent.prototype.setId = function() {
  if (this.proposition.type === 'NegationNode') return 'negation';
  else if (this.proposition.type in this.registry) return 'molecule';
  else return NODE_TACTUS++;
};


/**
 *
 * @public
 * @returns {Array}
 */
NodeSent.prototype.decompose = function() {
  switch (_.type(this._id)) {
    case 'Number':
      this.checked = true;
      return [];
      break;
    case 'String':
      if (this._id === 'molecule') {
        this.checked = true;
        if (this.proposition.type === 'ConjunctionNode') return this.decomposeConjunction();
      } else if (this._id === 'negation') {
        this.checked = true;
        return this.decomposeNegation();
      }
      break;
    default:
      return [];
      break;
  }
};


/**
 *
 * @public
 * @returns {Array}
 */
NodeSent.prototype.decomposeConjunction = function() {
  return ['conjunction', this.proposition.conjuncts];
};


/**
 *
 * @public
 * @returns {Array}
 */
NodeSent.prototype.decomposeNegation = function() {
  return ['negation', this.proposition.negatedExpression];
};


/**
 *
 * @type {{(NodeSent|Function), NODE_TACTUS: (Number)}}
 */
module.exports = {
  NodeSent: NodeSent,
  NODE_TACTUS: NODE_TACTUS
};
