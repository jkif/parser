var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../src/jkif'),
    ast = require('../../../../src/ast_constructors/ast_constructors');


describe('jKif.Parser.parse Whitespace', function() {

  it('correctly parses a single whitespace', function() {
    expect(jKif.Parser.parse(' ').expressions).to.be.empty;
  });

  it('correctly parses multiple whitespaces in a row', function() {
    expect(jKif.Parser.parse('     ').expressions).to.be.empty;
  });

  it('correctly parses a newline whitespace', function() {
    expect(jKif.Parser.parse('\n').expressions).to.be.empty;
  });

});
