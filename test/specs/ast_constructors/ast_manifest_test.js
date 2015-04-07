var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('AST Constructors Manifest Export', function() {

  it('should exist', function() {
    expect(ast).to.exist;
  });

  it('should export an Object', function() {
    expect(ast).to.be.an.instanceof(Object);
  });

  it('should have an ASTnodeConstructor as a property', function() {
    expect(ast.ASTnodeConstructor).to.exist;
  });

  it('should have a KIFNode Constructor as a property', function() {
    expect(ast.KIFNode).to.exist;
  });

  it('should have a WordNode Constructor as a property', function() {
    expect(ast.WordNode).to.exist;
  });

  it('should have a VariableNode Constructor as a property', function() {
    expect(ast.VariableNode).to.exist;
  });

  it('should have a StringLiteralNode Constructor as a property', function() {
    expect(ast.StringLiteralNode).to.exist;
  });

  it('should have a NumericLiteralNode Constructor as a property', function() {
    expect(ast.NumericLiteralNode).to.exist;
  });

  it('should have an EquationNode Constructor as a property', function() {
    expect(ast.EquationNode).to.exist;
  });

  it('should have a RelSentNode Constructor as a property', function() {
    expect(ast.RelSentNode).to.exist;
  });

  it('should have a NegationNode Constructor as a property', function() {
    expect(ast.NegationNode).to.exist;
  });

  it('should have a DisjunctionNode Constructor as a property', function() {
    expect(ast.DisjunctionNode).to.exist;
  });

  it('should have a ConjunctionNode Constructor as a property', function() {
    expect(ast.ConjunctionNode).to.exist;
  });

  it('should have an ImplicationNode Constructor as a property', function() {
    expect(ast.ImplicationNode).to.exist;
  });

  it('should have an EquivalenceNode Constructor as a property', function() {
    expect(ast.EquivalenceNode).to.exist;
  });

  it('should have a UniversalSentNode Constructor as a property', function() {
    expect(ast.UniversalSentNode).to.exist;
  });

  it('should have an ExistentialSentNode Constructor as a property', function() {
    expect(ast.ExistentialSentNode).to.exist;
  });

});
