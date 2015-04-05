var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('EquivalenceNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.EquivalenceNode).to.exist;
  });

  var eNode = new ast.EquivalenceNode();

  it('should have a "type" property set to "EquivalenceNode"', function() {
    expect(eNode.type).to.equal('EquivalenceNode');
  });

  it('should have an "expressions" property that is an instance of Array', function() {
    expect(eNode.expressions).to.be.an.instanceof(Array);
  });

});
