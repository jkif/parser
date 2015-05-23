var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse Implication sentence parsing', function() {

  it('correctly parses an implication into an ImplicationNode', function () {
    var parsed = Parser.parse('(=> expr1 expr2)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.ImplicationNode);
    expect(parsed.antecedent).to.be.an.instanceof(ast.WordNode);
    expect(parsed.consequent).to.be.instanceof(ast.WordNode);
  });

});
