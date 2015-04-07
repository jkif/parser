/**
 * jKif - 2015
 * relsentnode.js
 * @file AST RelSentNode constructor for representing implicit relational sentences
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {VariableNode|WordNode} constant
 * @param {Array} args
 * @constructor
 */
function RelSentNode(locationData, constant, args) {
  BaseNode.call(this, 'RelSentNode', locationData);
  this.constant = constant;
  this.argumentList = this.argumentList || [];
  this.argumentList = this.argumentList.concat(args);
}


/**
 *
 * @type {RelSentNode}
 */
module.exports = RelSentNode;
