/**
 * jKif - 2015
 * numericliteralnode.js
 * @file AST NumericLiteralNode constructor for representing numeric literals
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {Number} rawNumber
 * @constructor
 */
function NumericLiteralNode(locationData, rawNumber) {
  BaseNode.call(this, 'NumericLiteralNode', locationData);
  this.number = +rawNumber;
}


/**
 *
 * @type {NumericLiteralNode}
 */
module.exports = NumericLiteralNode;
