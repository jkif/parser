var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('ExistentialSentNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.ExistentialSentNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var eNode = new ast.ExistentialSentNode(locData, [], new ast.WordNode(locData));

  it('should have a "type" property set to "ExistentialSentNode"', function() {
    expect(eNode.type).to.equal('ExistentialSentNode');
  });

  it('should have a "locationData" property', function() {
    expect(eNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(eNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "variableList" property that is an instance of Array', function() {
    expect(eNode.variableList).to.be.an.instanceof(Array);
  });

  it('should have a "quantifiedSent" property that is an instance of Array', function() {
    expect(eNode.quantifiedSent).to.be.an.instanceof(ast.WordNode);
  });

});
