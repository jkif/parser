var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('WordNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.WordNode).to.exist;
  });

  var locData = {
    first_line: 11,
    last_line: 12,
    first_column: 0,
    last_column: 27
  };

  var wNode = new ast.WordNode(locData, 'wordhere');

  it('should have a "type" property set to "WordNode"', function() {
    expect(wNode.type).to.equal('WordNode');
  });

  it('should have a "locationData" property', function() {
    expect(wNode.locationData).to.exist;
  });

  it('should have a "locationData" property that is an instance of Object', function() {
    expect(wNode.locationData).to.be.an.instanceof(Object);
  });

  it('should have a "word" property that is a String', function() {
    expect(typeof wNode.word).to.equal('string');
  });

});
