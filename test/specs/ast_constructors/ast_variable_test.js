var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('VariableNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.VariableNode).to.exist;
  });

  var vNode = new ast.VariableNode('VARIABLENAME');

  it('should have a "type" property set to "VariableNode"', function() {
    expect(vNode.type).to.equal('VariableNode');
  });

  it('should have a "variableType" property that is a String', function() {
    expect(typeof vNode.variableType).to.equal('string');
  });

  it('should have a "variableName" property that is a String', function() {
    expect(typeof vNode.variableName).to.equal('string');
  });

});
