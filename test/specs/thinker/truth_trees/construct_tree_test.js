var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    tt = require('../../../../lib/truth_trees/truth_trees');


describe('#construct helper method', function() {

  it('should return an instance of an Object', function() {
    var kb = jKif.Utility.knowledgeBase(jKif.Parser.parse('')),
        ttSent = new tt.TruthTreeSent(kb);
    expect(ttSent).to.be.an.instanceof(Object);
  });

  it('should return an empty open stack for an empty knowledgeBase', function() {
    var kb = jKif.Utility.knowledgeBase(jKif.Parser.parse('')),
        ttSent = new tt.TruthTreeSent(kb);
    expect(ttSent.openStacks[0]).to.exist;
    expect(ttSent.openStacks[0]).to.be.empty;
  });

  it('should return an open stack with a single reduced node for a single atomic sentence knowledgeBase', function() {
    var atomicKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(instance ?CLARK Human)')),
      ttSentAtomic = new tt.TruthTreeSent(atomicKb),
      openStack = ttSentAtomic.openStacks[0];
    expect(openStack).to.exist;
    expect(openStack).to.have.length(1);
    expect(openStack[0].checked).to.be.true;
    expect(openStack[0]._id).to.be.a('number');
  });


  it('should return an open stack with two nodes for a single negated atomic sentence knowledgeBase', function() {
      var atomicNegationKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (instance ?CLARK Human))')),
      ttSentAtomicNegation = new tt.TruthTreeSent(atomicNegationKb),
      openStack = ttSentAtomicNegation.openStacks[0];
    expect(openStack).to.exist;
    expect(openStack).to.have.length(2);
    expect(openStack[0].checked).to.be.true;
    expect(openStack[0]._id).to.be.a('string');
    expect(openStack[0]._id).to.equal('negation');
    expect(openStack[1].checked).to.be.true;
    expect(openStack[1]._id).to.be.a('number');
    expect(openStack[1]._id).to.equal(1);
  });

  it('should return a closed stack with three nodes for a two-sentence contradiction knowledgeBase', function() {
      var contradictionKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(instance ?CLARK Human)(not (instance ?CLARK Human))')),
      ttSentContradiction = new tt.TruthTreeSent(contradictionKb);
      closedStack = ttSentContradiction.closedStacks[0];
    expect(closedStack).to.exist;
    expect(Object.keys(ttSentContradiction.openStacks)).to.be.empty;
    expect(closedStack).to.have.length(3);
    expect(closedStack[0].checked).to.be.true;
    expect(closedStack[0]._id).to.be.a('number');
    expect(closedStack[0]._id).to.equal(1);
    expect(closedStack[1].checked).to.be.true;
    expect(closedStack[1]._id).to.be.a('string');
    expect(closedStack[1]._id).to.equal('negation');
    expect(closedStack[2].checked).to.be.true;
    expect(closedStack[2]._id).to.be.a('number');
    expect(closedStack[2]._id).to.equal(-1);
  });

});
