var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('EquationNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.EquationNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var eNode = new ast.EquationNode(locData);

  it('should have a "type" property set to "EquationNode"', function() {
    expect(eNode.type).to.equal('EquationNode');
  });

  it('should have a "locationData" property', function() {
    expect(eNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(eNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "terms" property that is an instance of Array', function() {
    expect(eNode.terms).to.be.an.instanceof(Array);
  });

});
