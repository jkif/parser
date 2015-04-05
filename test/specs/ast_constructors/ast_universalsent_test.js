var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('UniversalSentNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.UniversalSentNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var uSNode = new ast.UniversalSentNode(locData, [], new ast.WordNode(locData));

  it('should have a "type" property set to "UniversalSentNode"', function() {
    expect(uSNode.type).to.equal('UniversalSentNode');
  });

  it('should have a "locationData" property', function() {
    expect(uSNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(uSNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "quantifiedSent" property', function() {
    expect(uSNode.quantifiedSent).to.be.an.instanceof(ast.WordNode);
  });

  it('should have a "variableList" property that is an instance of Array', function() {
    expect(uSNode.variableList).to.be.an.instanceof(Array);
  });

});
