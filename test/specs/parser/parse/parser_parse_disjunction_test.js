var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse Disjunction sentence parsing', function() {

  it('correctly parses a disjunction into a DisjunctionNode', function() {
    var parsed = Parser.parse('(or arg1 arg2)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.DisjunctionNode);
    expect(parsed.disjuncts).to.have.length(2);
    expect(parsed.disjuncts[0]).to.be.instanceof(ast.WordNode);
  });

});
