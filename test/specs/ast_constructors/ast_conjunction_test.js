var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('ConjuctionNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.ConjunctionNode).to.exist;
  });

  var cNode = new ast.ConjunctionNode();

  it('should have a "type" property set to "ConjunctionNode"', function() {
    expect(cNode.type).to.equal('ConjunctionNode');
  });

  it('should have a "location" property', function() {
    expect(cNode.location).to.exist;
  });

  it('should have a "conjuncts" property that is an instance of Array', function() {
    expect(cNode.conjuncts).to.be.an.instanceof(Array);
  });

});
