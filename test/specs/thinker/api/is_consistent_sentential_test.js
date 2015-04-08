var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Thinker #isConsistentSentential', function() {

  var parsedEmpty = jKif.Parser.parse('');
  var emptyKb = jKif.Utility.knowledgeBase(parsedEmpty);

  it('should return a Boolean value', function() {
    expect(jKif.Thinker.isConsistentSentential(emptyKb)).to.be.a('boolean');
  });

});
