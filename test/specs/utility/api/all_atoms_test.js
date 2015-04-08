var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #allAtoms', function() {

  var parsedF = jKif.Parser.parse('');
  var parsedT = jKif.Parser.parse('word');
  var parsedTwo = jKif.Parser.parse('(EXISTS (?this) (word))');
  var testedFalse = jKif.Utility.allAtoms(parsedF);
  var testedTrue = jKif.Utility.allAtoms(parsedT);
  var testedTrueTwo = jKif.Utility.allAtoms(parsedTwo);

  it('should return an array', function() {
    expect(testedFalse).to.be.a('array');
  });

  it('should return the correct number of atoms', function() {
    expect(testedFalse).to.have.length(0);
    expect(testedTrue).to.have.length(1);
    expect(testedTrueTwo).to.have.length(2);
  });

  it('should return the correct atoms', function() {
    expect(testedTrue[0]).to.be.an.instanceof(ast.WordNode);
    expect(testedTrueTwo[0]).to.be.an.instanceof(ast.VariableNode);
    expect(testedTrueTwo[1]).to.be.an.instanceof(ast.WordNode);
  });

});
