var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('ImplicationNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.ImplicationNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var iNode = new ast.ImplicationNode(locData, new ast.WordNode(locData), new ast.WordNode(locData));

  it('should have a "type" property set to "ImplicationNode"', function() {
    expect(iNode.type).to.equal('ImplicationNode');
  });

  it('should have a "locationData" property', function() {
    expect(iNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(iNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have an "antecedent" property', function() {
    expect(iNode.antecedent).to.be.an.instanceof(ast.WordNode);
  });

  it('should have a "consequent" property', function() {
    expect(iNode.consequent).to.be.an.instanceof(ast.WordNode);
  });

});
