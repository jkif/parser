var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../src/ast_constructors/ast_constructors');


describe('NegationNode AST Constructor', function() {

  it('should exist', function () {
    expect(ast.NegationNode).to.exist;
  });

  var nNode = new ast.NegationNode(new ast.WordNode());

  it('should have a "type" property set to "NegationNode"', function () {
    expect(nNode.type).to.equal('NegationNode');
  });

  it('should have a "negatedExpression" property', function () {
    expect(nNode.negatedExpression).to.be.an.instanceof(ast.WordNode);
  });

});
