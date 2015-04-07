/**
 * jKif - 2015
 * disjunctionnode.js
 * @file AST DisjunctionNode constructor for representing disjunctions
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {Array} disjuncts
 * @constructor
 */
function DisjunctionNode(locationData, disjuncts) {
  BaseNode.call(this, 'DisjunctionNode', locationData);
  this.disjuncts = this.disjuncts || [];
  this.disjuncts = this.disjuncts.concat(disjuncts);
}


/**
 *
 * @type {DisjunctionNode}
 */
module.exports = DisjunctionNode;
