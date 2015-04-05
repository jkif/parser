var chai = require('chai'),
    expect = chai.expect,
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('WordNode AST Constructor', function() {

  it('should exist', function() {
    expect(ast.WordNode).to.exist;
  });

  var wNode = new ast.WordNode('wordhere');

  it('should have a "type" property set to "WordNode"', function() {
    expect(wNode.type).to.equal('WordNode');
  });

  it('should have a "location" property', function() {
    expect(wNode.location).to.exist;
  });

  it('should have a "word" property that is a String', function() {
    expect(typeof wNode.word).to.equal('string');
  });

});
