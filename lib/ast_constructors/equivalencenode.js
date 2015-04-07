/**
 * jKif - 2015
 * equivalencenode.js
 * @file AST EquivalenceNode constructor for representing bi-directional implications
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {ASTNode} firstExpr
 * @param {ASTNode} secondExpr
 * @constructor
 */
function EquivalenceNode(locationData, firstExpr, secondExpr) {
  BaseNode.call(this, 'EquivalenceNode', locationData);
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(firstExpr, secondExpr);
}


/**
 *
 * @type {EquivalenceNode}
 */
module.exports = EquivalenceNode;
