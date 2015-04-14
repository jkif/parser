var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    tt = require('../../../../lib/truth_trees/truth_trees');


describe('#constructTree helper method', function() {

  var parsed = jKif.Parser.parse(''),
      kb = jKif.Utility.knowledgeBase(parsed),
      ttSent = new tt.TruthTreeSent(kb),
      constructTreeReturn = ttSent.tree; // constructTree sets ttSent.tree


  it('should return an instance of an Object', function() {
    expect(constructTreeReturn).to.be.an.instanceof(Object);
  });

  it('should return an Object with trunk, paths, step count, and prop map', function() {
    expect(constructTreeReturn).to.have.all.keys(['trunk', 'paths', 'stepCount', 'propMap']);
  });

  it('should return a tree with a stepCount of 0 for empty knowledgebase inputs', function() {
    expect(constructTreeReturn.stepCount).to.equal(0);
  });

  it('should return a tree with a stepCount of 1 for knowledgebase inputs with a single atomic sentence', function() {
    var atomicKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(instance ?CLARK Human)'));
    var ttSentAtomic = new tt.TruthTreeSent(atomicKb);
    expect(ttSentAtomic.stepCount).to.equal(1);
  });

  it('should return a tree with a stepCount of 2 for knowledgebase inputs with a single negation of an atomic sentence', function() {
    var atomicNegationKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (instance ?CLARK Human))'));
    var ttSentAtomicNegation = new tt.TruthTreeSent(atomicNegationKb);
    expect(ttSentAtomicNegation.stepCount).to.equal(2);
  });

});
