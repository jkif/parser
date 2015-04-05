var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Parser.parse FunctionTerm parsing', function() {

  it('correctly parses FunctionTerms into FunctionTermNodes', function() {
    expect(jKif.Parser.parse('(id)').expressions[0]).to.be.an.instanceof(ast.FunctionTermNode);
  });

  it('correctly parses a FunctionTerm with no arguments', function() {
    expect(jKif.Parser.parse('(clark)').expressions[0]).to.be.an.instanceof(ast.FunctionTermNode);
  });

  it('correctly parses a FunctionTerm argumentList into an Array', function() {
    var parsed = jKif.Parser.parse('(function argument)').expressions[0];
    expect(parsed.functionArgumentList).to.be.an.instanceof(Array);
  });

  it('correctly parses a FunctionTerm functionName', function() {
    var parsed = jKif.Parser.parse('(function argument)').expressions[0];
    expect(parsed.functionName).to.equal('function');
  });

  it('correctly parses a FunctionTerm with a single argument', function() {
    var parsed = jKif.Parser.parse('(function argument)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.FunctionTermNode);
    expect(parsed.functionArgumentList[0]).to.be.an.instanceof(ast.WordNode);
  });

  it('correctly parses a FunctionTerm with two arguments', function() {
    var parsed = jKif.Parser.parse('(function argument secondArg)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.FunctionTermNode);
    expect(parsed.functionArgumentList.length).to.be.equal(2);
    expect(parsed.functionArgumentList[0]).to.be.an.instanceof(ast.WordNode);
  });

  it('correctly parses a FunctionTerm with a FunctionTerm as an argument', function() {
    var parsed = jKif.Parser.parse('(function argument (secondfunc argument))').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.FunctionTermNode);
    expect(parsed.functionArgumentList).to.have.length(2);
    expect(parsed.functionArgumentList[0]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.functionArgumentList[1]).to.be.an.instanceof(ast.FunctionTermNode);
  });

});
