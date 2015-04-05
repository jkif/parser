var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('ConjuctionNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.ConjunctionNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var cNode = new ast.ConjunctionNode(locData);

  it('should have a "type" property set to "ConjunctionNode"', function() {
    expect(cNode.type).to.equal('ConjunctionNode');
  });

  it('should have a "locationData" property', function() {
    expect(cNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(cNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "conjuncts" property that is an instance of Array', function() {
    expect(cNode.conjuncts).to.be.an.instanceof(Array);
  });

});
