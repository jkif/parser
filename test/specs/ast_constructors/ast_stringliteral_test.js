var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('StringLiteralNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.StringLiteralNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var sLNode = new ast.StringLiteralNode(locData, "blahasldjf1sdljkfBOOM");

  it('should have a "type" property set to "StringLiteralNode"', function() {
    expect(sLNode.type).to.equal('StringLiteralNode');
  });

  it('should have a "locationData" property', function() {
    expect(sLNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(sLNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "rawString" property', function() {
    expect(typeof sLNode.rawString).to.equal('string');
  });

  it('should have a "chars" property', function() {
    expect(typeof sLNode.chars).to.equal('string');
  });

});
