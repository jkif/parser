var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('DisjunctionNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.DisjunctionNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var dNode = new ast.DisjunctionNode(locData);

  it('should have a "type" property set to "DisjunctionNode"', function() {
    expect(dNode.type).to.equal('DisjunctionNode');
  });

  it('should have a "locationData" property', function() {
    expect(dNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(dNode.locationData).to.be.an.instanceof(Object);
  });


  it('should have a "disjuncts" property that is an instance of Array', function() {
    expect(dNode.disjuncts).to.be.an.instanceof(Array);
  });

});
