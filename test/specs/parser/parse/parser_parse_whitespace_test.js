var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse Whitespace', function() {

  it('correctly parses a single whitespace', function() {
    expect(Parser.parse(' ').expressions).to.be.empty;
  });

  it('correctly parses multiple whitespaces in a row', function() {
    expect(Parser.parse('     ').expressions).to.be.empty;
  });

  it('correctly parses a newline whitespace', function() {
    expect(Parser.parse('\n').expressions).to.be.empty;
  });

});
