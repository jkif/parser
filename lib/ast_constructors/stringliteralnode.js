/**
 * jKif - 2015
 * stringliteralnode.js
 * @file AST StringLiteralNode constructor for representing string literals
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {String} rawString
 * @constructor
 */
function StringLiteralNode(locationData, rawString) {
  BaseNode.call(this, 'StringLiteralNode', locationData);
  this.rawString = rawString;
  this.chars = rawString.substring(1, rawString.length - 1);
}


/**
 *
 * @type {StringLiteralNode}
 */
module.exports = StringLiteralNode;
