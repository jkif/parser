var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../src/ast_constructors/ast_constructors');


describe('ASTnodeConstructor', function() {

  it('should exist', function () {
    expect(ast.ASTnodeConstructor).to.exist;
  });

  var aNode = new ast.ASTnodeConstructor();

  it('should have a "type" property set to "ASTnodeConstructor"', function () {
    expect(aNode.type).to.equal('ASTnodeConstructor');
  });

});
