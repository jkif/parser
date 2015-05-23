var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse Universally-quantified sentence parsing', function() {

  it('correctly parses a universally-quantified sentence into a UniversalSentNode', function () {
    var parsed = Parser.parse('(forall (?variable) expr)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.UniversalSentNode);
    expect(parsed.variableList).to.be.an.instanceof(Array);
    expect(parsed.variableList).to.have.length(1);
    expect(parsed.variableList[0]).to.be.an.instanceof(ast.VariableNode);
    expect(parsed.quantifiedSent).to.be.an.instanceof(ast.WordNode);
  });

});
