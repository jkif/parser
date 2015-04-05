var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../src/ast_constructors/ast_constructors');


describe('DisjunctionNode AST Constructor', function() {

  it('should exist', function () {
    expect(ast.DisjunctionNode).to.exist;
  });

  var dNode = new ast.DisjunctionNode();

  it('should have a "type" property set to "DisjunctionNode"', function () {
    expect(dNode.type).to.equal('DisjunctionNode');
  });

  it('should have a "disjuncts" property that is an instance of Array', function () {
    expect(dNode.disjuncts).to.be.an.instanceof(Array);
  });

});
