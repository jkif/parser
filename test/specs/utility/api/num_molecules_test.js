var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #numMolecules', function() {

  var parsedF = jKif.Parser.parse('');
  var parsedT = jKif.Parser.parse('(word)');
  var parsedTwo = jKif.Parser.parse('(FORALL (?testVar ?testVar2) (and (word)))');
  var testedFalse = jKif.Utility.numMolecules(parsedF);
  var testedTrue = jKif.Utility.numMolecules(parsedT);
  var testedTrueTwo = jKif.Utility.numMolecules(parsedTwo);

  it('should return a Number value', function() {
    expect(testedFalse).to.be.a('number');
  });

  it('should return the correct number of molecules', function() {
    expect(testedFalse).to.equal(1);
    expect(testedTrue).to.equal(2);
    expect(testedTrueTwo).to.equal(4);
  });

});
