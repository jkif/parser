var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('Parser.parse NumericLiteral parsing', function() {

  it('correctly parses a NumericLiteral positive integer into a NumericLiteralNode', function() {
    expect(Parser.parse('1').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
  });

  it('correctly parses a NumericLiteral positive decimal into a NumericLiteralNode', function() {
    expect(Parser.parse('0.1123').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
  });

  it('correctly parses a NumericLiteral negative integer into a NumericLiteralNode', function() {
    expect(Parser.parse('-6').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
  });

  it('correctly parses a NumericLiteral negative decimal into a NumericLiteralNode', function() {
    expect(Parser.parse('-6.999').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
  });

  it('correctly parses the number value out of a NumericLiteral for positive integers', function() {
    expect(Parser.parse('6').expressions[0].number).to.equal(6);
  });

  it('correctly parses the number value out of a NumericLiteral for negative integers', function() {
    expect(Parser.parse('-6').expressions[0].number).to.equal(-6);
  });

  it('correctly parses the number value out of a NumericLiteral for positive decimals', function() {
    expect(Parser.parse('0.166').expressions[0].number).to.equal(0.166);
  });

  it('correctly parses the number value out of a NumericLiteral for negative decimals', function() {
    expect(Parser.parse('-0.166').expressions[0].number).to.equal(-0.166);
  });

});
