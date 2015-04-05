var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('RelSentNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.RelSentNode).to.exist;
  });

  var rSNode = new ast.RelSentNode(new ast.VariableNode());

  it('should have a "type" property set to "RelSentNode"', function() {
    expect(rSNode.type).to.equal('RelSentNode');
  });

  it('should have a "variable" property that is a VariableNode', function() {
    expect(rSNode.variable).to.be.an.instanceof(ast.VariableNode);
  });

  it('should have an "argumentList" property that is an instance of Array', function() {
    expect(rSNode.argumentList).to.be.an.instanceof(Array);
  });

});
