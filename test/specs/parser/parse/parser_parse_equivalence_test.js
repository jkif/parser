var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Parser.parse Equivalence sentence parsing', function() {

  it('correctly parses an equivalence into an EquivalenceNode', function () {
    var parsed = jKif.Parser.parse('(<=> expr1 expr2)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.EquivalenceNode);
    expect(parsed.expressions).to.be.an.instanceof(Array);
    expect(parsed.expressions).to.have.length(2);
    expect(parsed.expressions[0]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.expressions[1]).to.be.an.instanceof(ast.WordNode);
  });

});
