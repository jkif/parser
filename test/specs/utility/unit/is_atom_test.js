var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    atomRegistry = {
      'WordNode': true,
      'VariableNode': true,
      'StringLiteralNode': true,
      'NumericLiteralNode': true
    };


describe('jKif.Utility #isAtom', function() {

  var parsedF = jKif.Parser.parse('');
  var parsedT = jKif.Parser.parse('word');
  var testedFalse = jKif.Utility.isAtom(parsedF);
  var testedTrue = jKif.Utility.isAtom(parsedT.expressions[0]);

  it('should return a Boolean value', function() {
    expect(testedFalse).to.be.a('boolean');
  });

  it('should return false when the input is not in the atom registry', function() {
    expect(testedFalse).to.equal(false);
  });

  it('should return true when the input is in the atom registry', function() {
    expect(testedTrue).to.equal(true);
  });

});
