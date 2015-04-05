var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../src/ast_constructors/ast_constructors');


describe('UniversalSentNode AST Constructor', function() {

  it('should exist', function () {
    expect(ast.UniversalSentNode).to.exist;
  });

  var uSNode = new ast.UniversalSentNode([], new ast.WordNode());

  it('should have a "type" property set to "UniversalSentNode"', function () {
    expect(uSNode.type).to.equal('UniversalSentNode');
  });

  it('should have a "quantifiedSent" property', function () {
    expect(uSNode.quantifiedSent).to.be.an.instanceof(ast.WordNode);
  });

  it('should have a "variableList" property that is an instance of Array', function () {
    expect(uSNode.variableList).to.be.an.instanceof(Array);
  });

});
