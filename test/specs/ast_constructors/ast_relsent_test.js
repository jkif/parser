var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('RelSentNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.RelSentNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var rSNode = new ast.RelSentNode(locData, new ast.VariableNode(locData));

  it('should have a "type" property set to "RelSentNode"', function() {
    expect(rSNode.type).to.equal('RelSentNode');
  });

  it('should have a "locationData" property', function() {
    expect(rSNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(rSNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "variable" property that is a VariableNode', function() {
    expect(rSNode.variable).to.be.an.instanceof(ast.VariableNode);
  });

  it('should have an "argumentList" property that is an instance of Array', function() {
    expect(rSNode.argumentList).to.be.an.instanceof(Array);
  });

});
