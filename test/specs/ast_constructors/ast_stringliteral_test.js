var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('StringLiteralNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.StringLiteralNode).to.exist;
  });

  var sLNode = new ast.StringLiteralNode("blahasldjf1sdljkfBOOM");

  it('should have a "type" property set to "StringLiteralNode"', function() {
    expect(sLNode.type).to.equal('StringLiteralNode');
  });

  it('should have a "location" property', function() {
    expect(sLNode.location).to.exist;
  });

  it('should have a "rawString" property', function() {
    expect(typeof sLNode.rawString).to.equal('string');
  });

  it('should have a "chars" property', function() {
    expect(typeof sLNode.chars).to.equal('string');
  });

});
