var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('NegationNode AST Constructor', function() {

  it('should exist', function () {
    expect(ast.NegationNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var nNode = new ast.NegationNode(locData, new ast.WordNode(locData));

  it('should have a "type" property set to "NegationNode"', function() {
    expect(nNode.type).to.equal('NegationNode');
  });

  it('should have a "locationData" property', function() {
    expect(nNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(nNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "negatedExpression" property', function() {
    expect(nNode.negatedExpression).to.be.an.instanceof(ast.WordNode);
  });

});
