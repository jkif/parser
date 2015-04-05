var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../src/jkif'),
    ast = require('../../../../src/ast_constructors/ast_constructors');


describe('jKif.Parser.parse Word parsing', function() {

  it('correctly parses Words into WordNodes', function() {
    expect(jKif.Parser.parse('word').expressions[0]).to.be.an.instanceof(ast.WordNode);
  });

  it('correctly parses a single Word', function() {
    expect(jKif.Parser.parse('word').expressions[0].word).to.equal('word');
  });

  it('correctly parses a multiple Words', function() {
    expect(jKif.Parser.parse('word secondword').expressions[1].word).to.equal('secondword');
  });

});
