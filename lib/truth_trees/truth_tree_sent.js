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


/**
 *
 * @private
 * @param {TruthTreeSent} tree
 * @returns {Object}
 */
function decompose(tree) {
  propositions = tree.trunk || [];

  var decomposerFunc = function(props, boolFlag) {
    props.forEach(function(proposition) {
      if (!(proposition.type in moleculeRegistry)) {
        tree.paths.open.push({ prop: proposition, value: boolFlag });
        tree.stepCount++;
      } else {
        var decomposed = decomposeMolecule(proposition, boolFlag);
        decomposerFunc(decomposed.decomped, decomposed.boolFlag);
      }
    });
  };

  decomposerFunc(propositions, true);
  return tree;
}


/**
 *
 * @private
 * @param {ASTNode} molecule
 * @param {Boolean} boolFlag
 * @returns {Object}
 */
function decomposeMolecule(molecule, boolFlag) {
  switch (molecule.type) {
    case 'NegationNode':
      return {
        decomped: [molecule.negatedExpression],
        boolFlag: !boolFlag
      };
      break;
    case 'ConjunctionNode':
      return {
        decomped: molecule.conjuncts,
        boolFlag: boolFlag
      };
      break;
    case 'DisjunctionNode':
      return {
        decomped: molecule.disjuncts,
        boolFlag: boolFlag
      };
      break;
    default:
      return { decomped: [], boolFlag: boolFlag };
      break;
  }
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
