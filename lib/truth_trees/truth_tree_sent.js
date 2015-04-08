/**
 * jKif - 2015
 * truth_tree_sent.js
 * @file TruthTreeSent Constructor
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var TruthTreeBase = require('./truth_tree_base');


/**
 *
 * @private
 * @param {Array} kwBase
 * @returns {Object}
 */
function constructTree(kwBase) {
  var tree = {};
  // stack sentences
  // decompose sentence via decomp rules
  return tree;
}


/**
 *
 * @private
 * @param {Object} tree
 * @returns {Boolean}
 */
function consistentTree(tree) {
  return false || true; // inconsistent or consistent
}


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
 * @type {TruthTreeSent}
 */
module.exports = TruthTreeSent;
