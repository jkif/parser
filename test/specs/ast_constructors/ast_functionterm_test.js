var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('FunctionTermNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.FunctionTermNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var fNode = new ast.FunctionTermNode(locData, 'testFunc');

  it('should have a "type" property set to "FunctionTermNode"', function() {
    expect(fNode.type).to.equal('FunctionTermNode');
  });

  it('should have a "locationData" property', function() {
    expect(fNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(fNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "functionName" property that is a String', function() {
    expect(typeof fNode.functionName).to.equal('string');
  });

  it('should have a "functionArgumentList" property that is an instance of Array', function() {
    expect(fNode.functionArgumentList).to.be.an.instanceof(Array);
  });

});
