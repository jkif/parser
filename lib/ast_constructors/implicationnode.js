/**
 * jKif - 2015
 * implicationnode.js
 * @file AST ImplicationNode constructor for representing implications
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {ASTNode} antecedent
 * @param {ASTNode} consequent
 * @constructor
 */
function ImplicationNode(locationData, antecedent, consequent) {
  BaseNode.call(this, 'ImplicationNode', locationData);
  this.antecedent = antecedent;
  this.consequent = consequent;
}


/**
 *
 * @type {ImplicationNode}
 */
module.exports = ImplicationNode;
