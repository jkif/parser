var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('EquivalenceNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.EquivalenceNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var eNode = new ast.EquivalenceNode(locData);

  it('should have a "type" property set to "EquivalenceNode"', function() {
    expect(eNode.type).to.equal('EquivalenceNode');
  });

  it('should have a "locationData" property', function() {
    expect(eNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(eNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have an "expressions" property that is an instance of Array', function() {
    expect(eNode.expressions).to.be.an.instanceof(Array);
  });

});
