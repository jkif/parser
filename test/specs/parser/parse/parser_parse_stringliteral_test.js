var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Parser.parse StringLiteral parsing', function() {

  it('correctly parses a StringLiteral into a StringLiteralNode', function() {
    expect(jKif.Parser.parse('""').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
    expect(jKif.Parser.parse('\'\'').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
  });

  it('correctly parses a StringLiteral with special characters', function() {
    expect(jKif.Parser.parse('"!$_-@~^#%+=\\"').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
  });

  it('correctly parses a StringLiteral with new lines', function() {
    expect(jKif.Parser.parse('"\n"').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
  });

  it('correctly parses a StringLiteral with new lines', function() {
    expect(jKif.Parser.parse('"\n"').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
  });

  it('correctly parses a StringLiteral into a raw string', function() {
    expect(jKif.Parser.parse('"abcdefg hi"').expressions[0].rawString).to.equal('"abcdefg hi"');
  });

  it('correctly parses a StringLiteral characters out of the quotation marks', function() {
    expect(jKif.Parser.parse('"abcdefg hi"').expressions[0].chars).to.equal('abcdefg hi');
  });

});
