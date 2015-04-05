var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('ASTnodeConstructor', function() {

  it('should exist', function() {
    expect(ast.ASTnodeConstructor).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var aNode = new ast.ASTnodeConstructor(null, locData);

  it('should have a "type" property set to "ASTnodeConstructor"', function() {
    expect(aNode.type).to.equal('ASTnodeConstructor');
  });

  it('should have a "locationData" property', function() {
    expect(aNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(aNode.locationData).to.be.an.instanceof(Object);
  });

});
