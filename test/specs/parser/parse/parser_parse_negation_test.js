var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse Negated sentence parsing', function() {

  it('correctly parses a negation into a NegationNode', function() {
    var parsed = Parser.parse('(not word)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.NegationNode);
  });

  it('correctly parses a negated word', function() {
    var parsed = Parser.parse('(not word)').expressions[0];
    expect(parsed.negatedExpression).to.be.an.instanceof(ast.WordNode);
  });

  it('correctly parses a negated variable', function() {
    var parsed = Parser.parse('(not ?VARIABLE)').expressions[0];
    expect(parsed.negatedExpression).to.be.an.instanceof(ast.VariableNode);
  });

  it('correctly parses a negated string literal', function() {
    var parsed = Parser.parse('(not "stringhere")').expressions[0];
    expect(parsed.negatedExpression).to.be.an.instanceof(ast.StringLiteralNode);
  });

  it('correctly parses a negated numeric literal', function() {
    var parsed = Parser.parse('(not 6)').expressions[0];
    expect(parsed.negatedExpression).to.be.an.instanceof(ast.NumericLiteralNode);
  });

  it('correctly parses a negated equation', function() {
    var parsed = Parser.parse('(not (= firstTerm secondTerm))').expressions[0];
    expect(parsed.negatedExpression).to.be.an.instanceof(ast.EquationNode);
  });

  it('correctly parses a negated RelSent', function() {
    var parsed = Parser.parse('(not (?VARIABLE argument))').expressions[0];
    expect(parsed.negatedExpression).to.be.an.instanceof(ast.RelSentNode);
  });

  it('correctly parses a negated FunctionTerm', function() {
    var parsed = Parser.parse('(not (function argument))').expressions[0];
    expect(parsed.negatedExpression).to.be.an.instanceof(ast.RelSentNode);
  });

});
