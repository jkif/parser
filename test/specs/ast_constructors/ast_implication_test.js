var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../src/ast_constructors/ast_constructors');


describe('ImplicationNode AST Constructor', function() {

  it('should exist', function () {
    expect(ast.ImplicationNode).to.exist;
  });

  var iNode = new ast.ImplicationNode(new ast.WordNode(), new ast.WordNode());

  it('should have a "type" property set to "ImplicationNode"', function () {
    expect(iNode.type).to.equal('ImplicationNode');
  });

  it('should have an "antecedent" property', function () {
    expect(iNode.antecedent).to.be.an.instanceof(ast.WordNode);
  });

  it('should have a "consequent" property', function () {
    expect(iNode.consequent).to.be.an.instanceof(ast.WordNode);
  });

});
