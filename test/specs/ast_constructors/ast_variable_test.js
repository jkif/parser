var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('VariableNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.VariableNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var vNode = new ast.VariableNode(locData, 'VARIABLENAME');

  it('should have a "type" property set to "VariableNode"', function() {
    expect(vNode.type).to.equal('VariableNode');
  });

  it('should have a "locationData" property', function() {
    expect(vNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(vNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "variableType" property that is a String', function() {
    expect(typeof vNode.variableType).to.equal('string');
  });

  it('should have a "variableName" property that is a String', function() {
    expect(typeof vNode.variableName).to.equal('string');
  });

});
