/**
 * jKif - 2015
 * negationnode.js
 * @file AST NegationNode constructor for representing negations
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {ASTNode} negatedExpression
 * @constructor
 */
function NegationNode(locationData, negatedExpression) {
  BaseNode.call(this, 'NegationNode', locationData);
  this.negatedExpression = negatedExpression;
}


/**
 *
 * @type {NegationNode}
 */
module.exports = NegationNode;
