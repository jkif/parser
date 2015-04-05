var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../src/ast_constructors/ast_constructors');


describe('FunctionTermNode AST Constructor', function() {

  it('should exist', function () {
    expect(ast.FunctionTermNode).to.exist;
  });

  var fNode = new ast.FunctionTermNode('testFunc');

  it('should have a "type" property set to "FunctionTermNode"', function () {
    expect(fNode.type).to.equal('FunctionTermNode');
  });

  it('should have a "functionName" property that is a String', function () {
    expect(typeof fNode.functionName).to.equal('string');
  });

  it('should have a "functionArgumentList" property that is an instance of Array', function () {
    expect(fNode.functionArgumentList).to.be.an.instanceof(Array);
  });

});
