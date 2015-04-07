/**
 * jKif - 2015
 * existentialsentnode.js
 * @file AST ExistentialSentNode constructor for representing existentially-quantified logical sentences
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {Array} variableList
 * @param {ASTNode} quantifiedSent
 * @constructor
 */
function ExistentialSentNode(locationData, variableList, quantifiedSent) {
  BaseNode.call(this, 'ExistentialSentNode', locationData);
  this.variableList = this.variableList || [];
  this.variableList = this.variableList.concat(variableList);
  this.quantifiedSent = quantifiedSent;
}


/**
 *
 * @type {ExistentialSentNode}
 */
module.exports = ExistentialSentNode;
