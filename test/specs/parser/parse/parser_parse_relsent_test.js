var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse Relational sentence parsing', function() {

  it('correctly parses a RelSent into a RelSentNode', function() {
    expect(Parser.parse('(?VARIABLE)').expressions[0]).to.be.an.instanceof(ast.RelSentNode);
  });

  it('correctly parses a RelSent with no arguments', function() {
    expect(Parser.parse('(@dog)').expressions[0]).to.be.an.instanceof(ast.RelSentNode);
  });

  it('correctly parses a RelSent argumentList into an Array', function() {
    var parsed = Parser.parse('(?variable argument)').expressions[0];
    expect(parsed.argumentList).to.be.an.instanceof(Array);
  });

  it('correctly parses a RelSent variable name', function() {
    var parsed = Parser.parse('(?variable argument)').expressions[0];
    expect(parsed.constant.variableName).to.equal('variable');
  });

  it('correctly parses a RelSent with a single argument', function() {
    var parsed = Parser.parse('(?variable argument)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.RelSentNode);
    expect(parsed.argumentList[0]).to.be.an.instanceof(ast.WordNode);
  });

  it('correctly parses a RelSent with two arguments', function() {
    var parsed = Parser.parse('(@variable argument secondArg)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.RelSentNode);
    expect(parsed.argumentList.length).to.be.equal(2);
    expect(parsed.argumentList[0]).to.be.an.instanceof(ast.WordNode);
  });

  it('correctly parses a higher-order RelSent', function() {
    var parsed = Parser.parse('(?VARIABLE argument (?SECONDVARIABLE secondArgument))').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.RelSentNode);
    expect(parsed.argumentList).to.have.length(2);
    expect(parsed.argumentList[0]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.argumentList[1]).to.be.an.instanceof(ast.RelSentNode);
  });

  it('correctly parses FunctionTerms into RelSentNodes', function() {
    expect(Parser.parse('(id)').expressions[0]).to.be.an.instanceof(ast.RelSentNode);
  });

  it('correctly parses a FunctionTerm with no arguments', function() {
    expect(Parser.parse('(clark)').expressions[0]).to.be.an.instanceof(ast.RelSentNode);
  });

  it('correctly parses a FunctionTerm argumentList into an Array', function() {
    var parsed = Parser.parse('(function argument)').expressions[0];
    expect(parsed.argumentList).to.be.an.instanceof(Array);
  });

  it('correctly parses a FunctionTerm constant', function() {
    var parsed = Parser.parse('(function argument)').expressions[0];
    var parsed2 = Parser.parse('(?variable argument)').expressions[0];
    expect(parsed.constant).to.be.an.instanceof(ast.WordNode);
    expect(parsed2.constant).to.be.an.instanceof(ast.VariableNode);
  });

  it('correctly parses a FunctionTerm with a single argument', function() {
    var parsed = Parser.parse('(function argument)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.RelSentNode);
    expect(parsed.argumentList[0]).to.be.an.instanceof(ast.WordNode);
  });

  it('correctly parses a FunctionTerm with two arguments', function() {
    var parsed = Parser.parse('(function argument secondArg)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.RelSentNode);
    expect(parsed.argumentList.length).to.be.equal(2);
    expect(parsed.argumentList[0]).to.be.an.instanceof(ast.WordNode);
  });

  it('correctly parses a FunctionTerm with a FunctionTerm as an argument', function() {
    var parsed = Parser.parse('(function argument (secondfunc argument))').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.RelSentNode);
    expect(parsed.argumentList).to.have.length(2);
    expect(parsed.argumentList[0]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.argumentList[1]).to.be.an.instanceof(ast.RelSentNode);
  });

});
