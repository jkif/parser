var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('ExistentialSentNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.ExistentialSentNode).to.exist;
  });

  var eNode = new ast.ExistentialSentNode([], new ast.WordNode());

  it('should have a "type" property set to "ExistentialSentNode"', function() {
    expect(eNode.type).to.equal('ExistentialSentNode');
  });

  it('should have a "location" property', function() {
    expect(eNode.location).to.exist;
  });

  it('should have a "variableList" property that is an instance of Array', function() {
    expect(eNode.variableList).to.be.an.instanceof(Array);
  });

  it('should have a "quantifiedSent" property that is an instance of Array', function() {
    expect(eNode.quantifiedSent).to.be.an.instanceof(ast.WordNode);
  });

});
