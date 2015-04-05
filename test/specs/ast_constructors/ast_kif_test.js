var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('KIFNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.KIFNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var kNode = new ast.KIFNode(locData);

  it('should have a "type" property set to "KIFNode"', function() {
    expect(kNode.type).to.equal('KIFNode');
  });

  it('should have a "locationData" property', function() {
    expect(kNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(kNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have an "expressions" property that is an instance of Array', function() {
    expect(kNode.expressions).to.be.an.instanceof(Array);
  });

});
