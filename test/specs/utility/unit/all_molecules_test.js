var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #allMolecules', function() {

  var parsedF = jKif.Parser.parse('');
  var parsedT = jKif.Parser.parse('word');
  var parsedTwo = jKif.Parser.parse('(EXISTS (?this) (word))');
  var testedFalse = jKif.Utility.allMolecules(parsedF);
  var testedTrue = jKif.Utility.allMolecules(parsedT);
  var testedTrueTwo = jKif.Utility.allMolecules(parsedTwo);

  it('should return an array', function() {
    expect(testedFalse).to.be.a('array');
  });

  it('should return the correct number of molecules', function() {
    expect(testedFalse).to.have.length(1);
    expect(testedTrue).to.have.length(1);
    expect(testedTrueTwo).to.have.length(3);
  });

  it('should return the correct molecules', function() {
    expect(testedFalse[0]).to.be.an.instanceof(ast.KIFNode);
    expect(testedTrue[0]).to.be.an.instanceof(ast.KIFNode);
    expect(testedTrueTwo[1]).to.be.an.instanceof(ast.ExistentialSentNode);
    expect(testedTrueTwo[2]).to.be.an.instanceof(ast.RelSentNode);
  });

});
