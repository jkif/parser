/**
 * jKif - 2015
 * variablenode.js
 * @file AST VariableNode constructor for representing independent and row variables
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {String} identifier
 * @param {String} variableType
 * @constructor
 */
function VariableNode(locationData, identifier, variableType) {
  BaseNode.call(this, 'VariableNode', locationData);
  this.variableType = variableType || 'IND';
  this.variableName = identifier;
}


/**
 *
 * @type {VariableNode}
 */
module.exports = VariableNode;
