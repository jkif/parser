/**
 * jKif - 2015
 * ast_constructors.js
 * @file Exports all AST Node constructors on AST object
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


/**
 *
 * @type {Object}
 */
module.exports = {
  ASTnodeConstructor: require('./ast_constructor_base'),
  KIFNode: require('./kifnode'),
  WordNode: require('./wordnode'),
  VariableNode: require('./variablenode'),
  StringLiteralNode: require('./stringliteralnode'),
  NumericLiteralNode: require('./numericliteralnode'),
  FunctionTermNode: require('./functiontermnode'),
  EquationNode: require('./equationnode'),
  RelSentNode: require('./relsentnode'),
  NegationNode: require('./negationnode'),
  DisjunctionNode: require('./disjunctionnode'),
  ConjunctionNode: require('./conjunctionnode'),
  ImplicationNode: require('./implicationnode'),
  EquivalenceNode: require('./equivalencenode'),
  UniversalSentNode: require('./universalsentnode'),
  ExistentialSentNode: require('./existentialsentnode')
};
