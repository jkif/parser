var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #isMolecule', function() {

  var parsedF = jKif.Parser.parse('word');
  var parsedT = jKif.Parser.parse('(word)');
  var testedFalse = jKif.Utility.isMolecule(parsedF.expressions[0]);
  var testedTrue = jKif.Utility.isMolecule(parsedT.expressions[0]);
  //
  it('should return a Boolean value', function() {
    expect(testedFalse).to.be.a('boolean');
  });
  //
  it('should return false when the input is not in the molecule registry', function() {
    expect(testedFalse).to.equal(false);
  });
  //
  it('should return true when the input is in the molecule registry', function() {
    expect(testedTrue).to.equal(true);
  });

});
