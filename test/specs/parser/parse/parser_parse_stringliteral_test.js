var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse StringLiteral parsing', function() {

  it('correctly parses a StringLiteral into a StringLiteralNode', function() {
    expect(Parser.parse('""').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
    expect(Parser.parse('\'\'').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
  });

  it('correctly parses a StringLiteral with special characters', function() {
    expect(Parser.parse('"!$_-@~^#%+=\\"').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
  });

  it('correctly parses a StringLiteral with new lines', function() {
    expect(Parser.parse('"\n"').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
  });

  it('correctly parses a StringLiteral with new lines', function() {
    expect(Parser.parse('"\n"').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
  });

  it('correctly parses a StringLiteral into a raw string', function() {
    expect(Parser.parse('"abcdefg hi"').expressions[0].rawString).to.equal('"abcdefg hi"');
  });

  it('correctly parses a StringLiteral characters out of the quotation marks', function() {
    expect(Parser.parse('"abcdefg hi"').expressions[0].chars).to.equal('abcdefg hi');
  });

});
