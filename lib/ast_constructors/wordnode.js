/**
 * jKif - 2015
 * wordnode.js
 * @file AST WordNode constructor for representing SUO-KIF words and identifiers
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {String} identifier
 * @constructor
 */
function WordNode(locationData, identifier) {
  BaseNode.call(this, 'WordNode', locationData);
  this.word = identifier;
}


/**
 *
 * @type {WordNode}
 */
module.exports = WordNode;
