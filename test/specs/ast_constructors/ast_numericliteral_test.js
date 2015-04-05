var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../src/ast_constructors/ast_constructors');


describe('NumericLiteralNode AST Constructor', function() {

  it('should exist', function () {
    expect(ast.NumericLiteralNode).to.exist;
  });

  var nLNode = new ast.NumericLiteralNode(6);

  it('should have a "type" property set to "NumericLiteralNode"', function () {
    expect(nLNode.type).to.equal('NumericLiteralNode');
  });

  it('should have a "number" property that is a Number', function () {
    expect(typeof nLNode.number).to.equal('number');
  });

});
