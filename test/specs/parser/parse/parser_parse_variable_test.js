var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse Variable parsing', function() {

  it('correctly parses Row Variables into VariableNodes', function () {
    expect(Parser.parse('@row').expressions[0]).to.be.an.instanceof(ast.VariableNode);
  });

  it('correctly parses Independent Variables into VariableNodes', function () {
    expect(Parser.parse('?ind').expressions[0]).to.be.an.instanceof(ast.VariableNode);
  });

  it('correctly parses Variables with variableType "ROW"', function () {
    expect(Parser.parse('@row').expressions[0].variableType).to.equal('ROW');
  });

  it('correctly parses Variables with variableType "IND"', function () {
    expect(Parser.parse('?ind').expressions[0].variableType).to.equal('IND');
  });

  it('correctly parses Row Variable names', function () {
    expect(Parser.parse('@row').expressions[0].variableName).to.equal('row');
  });

  it('correctly parses Independent Variable names', function () {
    expect(Parser.parse('?ind').expressions[0].variableName).to.equal('ind');
  });

});
