/**
 * jKif - 2015
 * universalsentnode.js
 * @file AST UniversalSentNode constructor for representing universally-quantified logical sentences
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
function UniversalSentNode(locationData, variableList, quantifiedSent) {
  BaseNode.call(this, 'UniversalSentNode', locationData);
  this.variableList = this.variableList || [];
  this.variableList = this.variableList.concat(variableList);
  this.quantifiedSent = quantifiedSent;
}


/**
 *
 * @type {UniversalSentNode}
 */
module.exports = UniversalSentNode;
