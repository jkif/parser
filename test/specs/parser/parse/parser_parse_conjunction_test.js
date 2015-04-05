var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Parser.parse Conjunction sentence parsing', function() {

  it('correctly parses a conjunction into a ConjunctionNode', function() {
    var parsed = jKif.Parser.parse('(AND arg1 arg2)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.ConjunctionNode);
    expect(parsed.conjuncts).to.have.length(2);
    expect(parsed.conjuncts[0]).to.be.instanceof(ast.WordNode);
  });

});
