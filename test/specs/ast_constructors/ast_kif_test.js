var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('KIFNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.KIFNode).to.exist;
  });

  var kNode = new ast.KIFNode();

  it('should have a "type" property set to "KIFNode"', function() {
    expect(kNode.type).to.equal('KIFNode');
  });

  it('should have an "expressions" property that is an instance of Array', function() {
    expect(kNode.expressions).to.be.an.instanceof(Array);
  });

});
