/**
 * jKif - 2015
 * utility.js
 * jKif.Utility
 * @file Semantic Analysis of SUO-KIF via JavaScript
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var ast = require('./ast_constructors/ast_constructors'),
    nodeRegistry = Object.keys(ast).reduce(registerNode, {}),
    atomRegistry = {
      'WordNode': true,
      'VariableNode': true,
      'StringLiteralNode': true,
      'NumericLiteralNode': true
    },
    moleculeRegistry = {
      'KIFNode': true,
      'EquationNode': true,
      'RelSentNode': true,
      'NegationNode': true,
      'ConjunctionNode': true,
      'DisjunctionNode': true,
      'ImplicationNode': true,
      'EquivalenceNode': true,
      'UniversalSentNode': true,
      'ExistentialSentNode': true
    };


/** @private */
function validateJkif(jkif) {
  if (!isMember(jkif, nodeRegistry)) {
    return new Error('Input must be a KIFNode (parsed KIF)');
  }
}


/** @private */
function registerNode(reg, key) {
  reg[key] = key;
  return reg;
}


/** @private */
function isMember(node, registry) {
  return node.type in registry;
}


/** @private */
function typeMatch(node, type) {
  return (isMember(node, nodeRegistry) && node.type === type) ? 1 : 0;
}


/** @private */
function reduceExprs(jkif, cb, start) {
  return getExprs(jkif).reduce(cb, start);
}


/** @private */
function jkifLengthCb(total, expression) {
  return total + jkifLength(expression) + 1;
}


/** @private */
function numOfNodesCb(nodeType, total, expression) {
  return total + numOfNode(expression, nodeType);
}


/** @private */
function countNodesClassCb(jkif, cb) {
  var nodes = 0;
  eachNode(jkif, function(node) { if (cb(node)) nodes++; });
  return nodes;
}


/** @private */
function getExprs(node) {
  switch (node.type) {
    case 'KIFNode':
      return node.expressions;
      break;
    case 'EquivalenceNode':
      return node.expressions;
      break;
    case 'ConjunctionNode':
      return node.conjuncts;
      break;
    case 'DisjunctionNode':
      return node.disjuncts;
      break;
    case 'EquationNode':
      return node.terms;
      break;
    case 'UniversalSentNode':
      return node.variableList.concat(node.quantifiedSent);
      break;
    case 'ExistentialSentNode':
      return node.variableList.concat(node.quantifiedSent);
      break;
    case 'ImplicationNode':
      return [].concat(node.antecedent, node.consequent);
      break;
    case 'NegationNode':
      return [].concat(node.negatedExpression);
      break;
    case 'RelSentNode':
      return node.argumentList.concat(node.constant);
      break;
    default:
      return [];
      break;
  }
}


/**
 *
 * @public
 * @param {*} candidate
 * @returns {Boolean}
 */
function isJkif(candidate) {
  return isMember(candidate, nodeRegistry);
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @returns {Number}
 */
function jkifLength(jkif) {
  validateJkif(jkif);
  return reduceExprs(jkif, jkifLengthCb, 0);
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @param {String} nodeType
 * @returns {Number}
 */
function numOfNode(jkif, nodeType) {
  validateJkif(jkif);
  var cb = function(total, expression) {
    return numOfNodesCb(nodeType, total, expression);
  };
  return reduceExprs(jkif, cb, typeMatch(jkif, nodeType));
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @param {Function} cb
 */
function eachNode(jkif, cb) {
  validateJkif(jkif);
  getExprs(jkif).forEach(function(expression) {
    cb(expression);
    eachNode(expression, cb);
  });
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @returns {Boolean}
 */
function isAtom(jkif) {
  validateJkif(jkif);
  return isMember(jkif, atomRegistry);
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @returns {Boolean}
 */
function isMolecule(jkif) {
  validateJkif(jkif);
  return isMember(jkif, moleculeRegistry);
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @returns {Number}
 */
function numAtoms(jkif) {
  validateJkif(jkif);
  return countNodesClassCb(jkif, isAtom);
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @returns {Number}
 */
function numMolecules(jkif) {
  validateJkif(jkif);
  return countNodesClassCb(jkif, isMolecule) + 1;
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @returns {*[]}
 */
function allAtoms(jkif) {
  validateJkif(jkif);
  var atoms = [];
  eachNode(jkif, function(node) { if (isAtom(node)) atoms.push(node); });
  return atoms;
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @returns {*[]}
 */
function allMolecules(jkif) {
  validateJkif(jkif);
  var molecules = isMolecule(jkif) ? [jkif] : [];
  eachNode(jkif, function(node) { if (isMolecule(node)) molecules.push(node); });
  return molecules;
}


/**
 *
 * @public
 * @param {ASTNode} jkif
 * @returns {*[]}
 */
function knowledgeBase(jkif) {
  var kb = [];
  if (!isMolecule(jkif)) return kb;
  jkif.type !== 'KIFNode' ? kb.push(jkif): null;
  eachNode(jkif, function(node) { if (isMolecule(node)) kb.push(node); });
  return kb;
}


/**
 *
 * @public
 * @type {Object} jKif.Utility
 * {Function} jKif.Utility.isJkif
 * {Function} jKif.Utility.jkifLength
 * {Function} jKif.Utility.numOfNode
 * {Function} jKif.Utility.eachChild
 * {Function} jKif.Utility.isAtom
 * {Function} jKif.Utility.isMolecule
 * {Function} jKif.Utility.numAtoms
 * {Function} jKif.Utility.numMolecules
 * {Function} jKif.Utility.allAtoms
 * {Function} jKif.Utility.allMolecules
 * {Function} jKif.Utility.knowledgeBase
 */
var jKifUtility = {
  isJkif: isJkif,
  jkifLength: jkifLength,
  numOfNode: numOfNode,
  eachNode: eachNode,
  isAtom: isAtom,
  isMolecule: isMolecule,
  numAtoms: numAtoms,
  numMolecules: numMolecules,
  allAtoms: allAtoms,
  allMolecules: allMolecules,
  knowledgeBase: knowledgeBase
};


/**
 *
 * @type {Object} jKifUtility
 */
module.exports = jKifUtility;
