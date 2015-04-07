/**
 * jKif - 2015
 * equationnode.js
 * @file AST EquationNode constructor for representing equations
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {ASTNode} firstTerm
 * @param {ASTNode} secondTerm
 * @constructor
 */
function EquationNode(locationData, firstTerm, secondTerm) {
  BaseNode.call(this, 'EquationNode', locationData);
  this.terms = this.terms || [];
  this.terms = this.terms.concat(firstTerm, secondTerm);
}


/**
 *
 * @type {EquationNode}
 */
module.exports = EquationNode;
