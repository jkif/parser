var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../src/jkif'),
    ast = require('../src/ast_constructors');

describe('jKif', function() {
  it('should be defined and not null', function() {
    expect(jKif).to.exist;
  });

  it('should have a Parser property', function() {
    expect(jKif.Parser).to.exist;
  });

  describe('Parser', function() {
    it('responds to #parse', function() {
      expect(jKif.Parser).to.respondTo('parse');
    });
    describe('#parse', function() {
      it('is a function', function() {
        expect(jKif.Parser.parse).to.be.a('function');
      });
      it('returns a KIFNode object', function() {
        expect(jKif.Parser.parse('')).to.be.an.instanceof(ast.KIFNode);
      });
      it('correctly parses whitespace', function() {
        expect(jKif.Parser.parse('     ').expressions).to.be.empty;
        expect(jKif.Parser.parse('\n').expressions).to.be.empty;
      });
      it('correctly parses a Word', function() {
        expect(jKif.Parser.parse('word').expressions).to.include('word');
      });
    });
  });
});