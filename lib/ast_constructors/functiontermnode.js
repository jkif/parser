/**
 * jKif - 2015
 * functiontermnode.js
 * @file AST FunctionTermNode constructor for representing function expressions
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var BaseNode = require('./ast_constructor_base');


/**
 *
 * @param {Object} locationData
 * @param {String} funcName
 * @param {Array} argsList
 * @constructor
 */
function FunctionTermNode(locationData, funcName, argsList) {
  BaseNode.call(this, 'FunctionTermNode', locationData);
  this.functionName = funcName;
  this.functionArgumentList = this.functionArgumentList || [];
  this.functionArgumentList = this.functionArgumentList.concat(argsList);
}


/**
 *
 * @type {FunctionTermNode}
 */
module.exports = FunctionTermNode;
