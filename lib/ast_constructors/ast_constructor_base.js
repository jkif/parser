/**
 * jKif - 2015
 * ast_constructor_base.js
 * @file Base AST Node Constructor which all AST Nodes call up to on initialization
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


/**
 *
 * @param {String} type
 * @param {Object} locationData
 * @constructor
 */
function ASTnodeConstructor(type, locationData) {
  this.type = type || 'ASTnodeConstructor';
  this.locationData = locationData || {};
}


/**
 *
 * @type {ASTnodeConstructor}
 */
module.exports = ASTnodeConstructor;
