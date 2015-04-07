/**
 * jKif - 2015
 * jkif_utility.js
 * jKif.Utility
 * @file Semantic Analysis of SUO-KIF via JavaScript
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var ast = require('./ast_constructors/ast_constructors'),
    nodeRegistry = Object.keys(ast).reduce(registerNode, {});


/** @private */
function validateJkif(jkif) {
  if (!isAstNode(jkif)) {
    return new Error('Input must be a KIFNode (parsed KIF)');
  }
}


/** @private */
function registerNode(reg, key) {
  reg[key] = key;
  return reg;
}


/** @private */
function isAstNode(node) {
  return node.type in nodeRegistry;
}


/** @private */
function typeMatch(node, type) {
  return (isAstNode(node) && node.type) === type ? 1 : 0;
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
 * @returns {boolean}
 */
function isJkif(candidate) {
  return isAstNode(candidate);
}


/**
 *
 * @public
 * @param {KIFNode} jkif
 * @returns {number}
 */
function jkifLength(jkif) {
  validateJkif(jkif);
  return reduceExprs(jkif, jkifLengthCb, 0);
}


/**
 *
 * @public
 * @param {KIFNode} jkif
 * @param {String} nodeType
 * @returns {number}
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
 * @param {KIFNode} jkif
 * @param {Function} cb
 */
function eachChild(jkif, cb) {
  validateJkif(jkif);
  getExprs(jkif).forEach(function(expression) {
    cb(expression);
    eachChild(expression, cb);
  });
}


/**
 *
 * @public
 * @type {Object} jKif.Utility
 * {Function} jKif.Utility.isJkif
 * {Function} jKif.Utility.jkifLength
 * {Function} jKif.Utility.numOfNode
 * {Function} jKif.Utility.eachChild
 */
var jKifUtility = {
  isJkif: isJkif,
  jkifLength: jkifLength,
  numOfNode: numOfNode,
  eachChild: eachChild
};


/**
 *
 * @type {Object} jKifUtility
 */
module.exports = jKifUtility;
