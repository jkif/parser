var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    tt = require('../../../../lib/truth_trees/truth_trees');


describe('#construct helper method', function() {

  var parsed = jKif.Parser.parse(''),
      kb = jKif.Utility.knowledgeBase(parsed),
      ttSent = new tt.TruthTreeSent(kb),
      atomicKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (instance ?CLARK Human))(instance ?CLARK Human)')),
      ttSentAtomic = new tt.TruthTreeSent(atomicKb);

  it('should return an instance of an Object', function() {
    expect(ttSent).to.be.an.instanceof(Object);
  });

});
