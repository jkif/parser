/**
 * jKif - 2015
 * conjunctionnode.js
 * @file AST ConjunctionNode constructor for representing conjunctions
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {Array} conjuncts
 * @constructor
 */
function ConjunctionNode(locationData, conjuncts) {
  BaseNode.call(this, 'ConjunctionNode', locationData);
  this.conjuncts = this.conjuncts || [];
  this.conjuncts = this.conjuncts.concat(conjuncts);
}


/**
 *
 * @type {ConjunctionNode}
 */
module.exports = ConjunctionNode;
