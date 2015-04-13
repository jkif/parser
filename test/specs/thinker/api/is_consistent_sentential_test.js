var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Thinker #isConsistentSentential', function() {

  it('should return a Boolean value', function() {
    var parsedEmpty = jKif.Parser.parse('');
    var emptyKb = jKif.Utility.knowledgeBase(parsedEmpty);
    expect(jKif.Thinker.isConsistentSentential(emptyKb)).to.be.a('boolean');
  });

  it('should return true for single fact knowledgebases', function() {
    var parsedFact = jKif.Parser.parse('(GovernmentFn UnitedStates)');
    var simpleKb = jKif.Utility.knowledgeBase(parsedFact);
    var isCons = jKif.Thinker.isConsistentSentential(simpleKb);
    expect(isCons).to.be.true;
  });


  it('should return true for multiple fact knowledgebases where the facts are unrelated', function() {
    var parsedCons = jKif.Parser.parse('(GovernmentFn UnitedStates)(instance ?MOSES Human)');
    var multKb = jKif.Utility.knowledgeBase(parsedCons);
    var isCons = jKif.Thinker.isConsistentSentential(multKb);
    expect(isCons).to.be.true;
  });

  it('should return false for multiple fact knowledgebases where the facts contradict each other', function() {
    var parsedInCons = jKif.Parser.parse('(not (instance ?MOSES Human))(instance ?MOSES Human)');
    var multKb = jKif.Utility.knowledgeBase(parsedInCons);
    var isInCons = jKif.Thinker.isConsistentSentential(multKb);
    expect(isInCons).to.be.false;
  });

});
