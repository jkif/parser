var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #isJkif', function() {

  var parsed = jKif.Parser.parse('');
  var tested = jKif.Utility.isJkif(parsed);

  it('should return a Boolean value', function() {
    expect(tested).to.be.a('boolean');
  });

  it('should return true when the input is parsed KIF', function() {
    expect(tested).to.equal(true);
  });

  it('should return false when the input is not parsed KIF', function() {
    expect(jKif.Utility.isJkif([])).to.equal(false);
  });

});
