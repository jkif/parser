var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse Exponent parsing', function() {

  it('correctly parses a NumericLiteral positive integer exponent into a NumericLiteralNode', function() {
    expect(Parser.parse('1e8').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
  });

  it('correctly parses a NumericLiteral positive decimal exponent into a NumericLiteralNode', function() {
    expect(Parser.parse('0.112E12').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
  });

  it('correctly parses a NumericLiteral negative integer exponent into a NumericLiteralNode', function() {
    expect(Parser.parse('-6e9').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
  });

  it('correctly parses a NumericLiteral negative decimal exponent into a NumericLiteralNode', function() {
    expect(Parser.parse('-6.999e3').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
  });

  it('correctly parses the number value out of a NumericLiteral for positive integer exponents', function() {
    expect(Parser.parse('6E3').expressions[0].number).to.equal(6000);
  });

  it('correctly parses the number value out of a NumericLiteral for negative integer exponents', function() {
    expect(Parser.parse('-6e6').expressions[0].number).to.equal(-6000000);
  });

  it('correctly parses the number value out of a NumericLiteral for positive decimal exponents', function() {
    expect(Parser.parse('0.166E4').expressions[0].number).to.equal(1660);
  });

  it('correctly parses the number value out of a NumericLiteral for negative decimal exponents', function() {
    expect(Parser.parse('-4.3e1').expressions[0].number).to.equal(-43);
  });

});
