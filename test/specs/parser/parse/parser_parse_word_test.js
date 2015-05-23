var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse Word parsing', function() {

  it('correctly parses Words into WordNodes', function() {
    expect(Parser.parse('word').expressions[0]).to.be.an.instanceof(ast.WordNode);
  });

  it('correctly parses a single Word', function() {
    expect(Parser.parse('word').expressions[0].word).to.equal('word');
  });

  it('correctly parses a multiple Words', function() {
    expect(Parser.parse('word secondword').expressions[1].word).to.equal('secondword');
  });

});
