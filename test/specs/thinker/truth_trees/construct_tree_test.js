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
    expect(ttSentAtomic.tree.stepCount).to.equal(1);
  });

  it('should return a tree with a stepCount of 1 for knowledgebase inputs with a single negation of an atomic sentence', function() {
    var atomicNegationKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (instance ?CLARK Human))'));
    var ttSentAtomicNegation = new tt.TruthTreeSent(atomicNegationKb);
    expect(ttSentAtomicNegation.tree.stepCount).to.equal(1);
  });

  it('should return a tree with a stepCount of 1 for knowledgebase inputs with a single negation of a molecular negated sentence', function() {
    var atomicNegationKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (not (instance ?CLARK Human)))'));
    var ttSentAtomicNegation = new tt.TruthTreeSent(atomicNegationKb);
    expect(ttSentAtomicNegation.tree.stepCount).to.equal(1);
  });

  it('should return a tree with the correct open path truth values for nested negations', function() {
    var nest1 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (instance ?CLARK Human))'));
    var ttSentNest1 = new tt.TruthTreeSent(nest1);
    expect(ttSentNest1.tree.paths.open[0].value).to.be.false;
    var nest2 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (not (instance ?CLARK Human)))'));
    var ttSentNest2 = new tt.TruthTreeSent(nest2);
    expect(ttSentNest2.tree.paths.open[0].value).to.be.true;
    var nest3 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (not (not (instance ?CLARK Human))))'));
    var ttSentNest3 = new tt.TruthTreeSent(nest3);
    expect(ttSentNest3.tree.paths.open[0].value).to.be.false;
    var nest4 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (not (not (not (instance ?CLARK Human)))))'));
    var ttSentNest4 = new tt.TruthTreeSent(nest4);
    expect(ttSentNest4.tree.paths.open[0].value).to.be.true;
  });

});
