var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../src/ast_constructors/ast_constructors');


describe('EquationNode AST Constructor', function() {

  it('should exist', function () {
    expect(ast.EquationNode).to.exist;
  });

  var eNode = new ast.EquationNode();

  it('should have a "type" property set to "EquationNode"', function () {
    expect(eNode.type).to.equal('EquationNode');
  });

  it('should have a "terms" property that is an instance of Array', function () {
    expect(eNode.terms).to.be.an.instanceof(Array);
  });

});
