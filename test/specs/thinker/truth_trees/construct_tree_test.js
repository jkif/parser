var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    tt = require('../../../../lib/truth_trees/truth_trees');


describe('#construct helper method', function() {

  var kb = jKif.Utility.knowledgeBase(jKif.Parser.parse('')),
      ttSent = new tt.TruthTreeSent(kb),
      atomicKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(instance ?CLARK Human)')),
      ttSentAtomic = new tt.TruthTreeSent(atomicKb);

  it('should return an instance of an Object', function() {
    expect(ttSent).to.be.an.instanceof(Object);
  });

  it('should return an empty open stack for an empty knowledgeBase', function() {
    expect(ttSent.openStacks[0]).to.exist;
    expect(ttSent.openStacks[0]).to.be.empty;
  });

  it('should return an open stack with a single reduced node for a single atomic sentence knowledgeBase', function() {
    var openStack = ttSentAtomic.openStacks[0];
    expect(openStack).to.exist;
    expect(openStack).to.have.length(1);
    expect(openStack[0].checked).to.be.true;
    expect(openStack[0]._id).to.be.a('number');
  });

});
