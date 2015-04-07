/**
 * jKif - 2015
 * kifnode.js
 * @file AST KIFNode constructor for representing the complete tree returned by jKif.Parser.parse
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {Array} kifExpressions
 * @constructor
 */
function KIFNode(locationData, kifExpressions) {
  BaseNode.call(this, 'KIFNode', locationData);
  this.expressions = this.expressions || [];
  this.expressions = this.expressions.concat(kifExpressions);
}


/**
 *
 * @type {KIFNode}
 */
module.exports = KIFNode;
