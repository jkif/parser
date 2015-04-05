var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('NumericLiteralNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.NumericLiteralNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var nLNode = new ast.NumericLiteralNode(locData, 6);

  it('should have a "type" property set to "NumericLiteralNode"', function() {
    expect(nLNode.type).to.equal('NumericLiteralNode');
  });

  it('should have a "locationData" property', function() {
    expect(nLNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(nLNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "number" property that is a Number', function() {
    expect(typeof nLNode.number).to.equal('number');
  });

});
