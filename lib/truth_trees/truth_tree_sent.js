/**
 * jKif - 2015
 * truth_tree_sent.js
 * @file TruthTreeSent Constructor
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var TruthTreeBase = require('./truth_tree_base'),
    moleculeRegistry = {
      'NegationNode': true,
      'ConjunctionNode': true,
      'DisjunctionNode': true,
      'ImplicationNode': true,
      'EquivalenceNode': true
    };


/**
 *
 * @params {Array} kwBase
 * @constructor
 */
function TruthTreeSent(kwBase) {
  TruthTreeBase.call(this, kwBase);
  this.tree = constructTree(kwBase);
}


/**
 *
 * @description prototype setup, constructor cleanup, and method delegation
 */
TruthTreeSent.prototype = Object.create(TruthTreeBase.prototype);
TruthTreeSent.prototype.constructor = TruthTreeSent;
TruthTreeSent.prototype.isConsistent = isConsistent;


/**
 *
 * @public
 * @returns {Boolean}
 */
function isConsistent() {
  return consistentTree(this.tree);
}


/**
 *
 * @private
 * @param {Array} kwBase
 * @returns {Object}
 */
function constructTree(kwBase) {
  var tree = {};
  tree.trunk = kwBase.slice();
  tree.paths = { open: [], closed: [] };
  tree.stepCount = tree.stepCount || 0;
  tree.propMap = {};
  return decompose(tree);
}


function decompose(tree) {
  return tree;
}


/**
 *
 * @private
 * @param {Object} tree
 * @returns {Boolean}
 */
function consistentTree(tree) {
  // return inconsistent or consistent
  return tree; // for algorithm dev
}


/**
 *
 * @type {TruthTreeSent}
 */
module.exports = TruthTreeSent;
