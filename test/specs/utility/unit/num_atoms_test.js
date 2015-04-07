var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #numAtoms', function() {

  var parsedF = jKif.Parser.parse('');
  var parsedT = jKif.Parser.parse('word');
  var testedFalse = jKif.Utility.numAtoms(parsedF);
  var testedTrue = jKif.Utility.numAtoms(parsedT);

  it('should return a Number value', function() {
    expect(testedFalse).to.be.a('number');
  });

  it('should return an integer value', function() {
    expect(testedFalse % 2 === 0).to.be.true;
  });

  it('should return the correct number of atoms', function() {
    expect(testedFalse).to.equal(0);
    expect(testedTrue).to.equal(1);
  });

});
