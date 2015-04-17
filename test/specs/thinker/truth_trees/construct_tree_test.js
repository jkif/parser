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

  it('should return a tree with a stepCount of 2 for knowledgebase inputs with a single conjunction sentence', function() {
    var conj = jKif.Utility.knowledgeBase(jKif.Parser.parse('(and (instance ?CLARK Human)(subclass Human Entity))'));
    var ttConj = new tt.TruthTreeSent(conj);
    expect(ttConj.tree.stepCount).to.equal(2);
  });

  it('should return a tree with a stepCount of 2 for knowledgebase inputs with a single disjunction sentence', function() {
    var dis = jKif.Utility.knowledgeBase(jKif.Parser.parse('(OR (instance ?CLARK Human)(subclass Human Entity))'));
    var ttDis = new tt.TruthTreeSent(dis);
    expect(ttDis.tree.stepCount).to.equal(2);
  });

  it('should return a tree with the correct open path truth values for negated conjunctions', function() {
    var negConj = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (and (instance ?CLARK Human)(subclass Human Entity)))'));
    var ttNegConj = new tt.TruthTreeSent(negConj);
    expect(ttNegConj.tree.paths.open[0].value).to.be.false;
    expect(ttNegConj.tree.paths.open[1].value).to.be.false;
  });

  it('should return a tree with the correct open path truth values for negated disjunctions', function() {
    var negDis = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (or (instance ?CLARK Human)(subclass Human Entity)))'));
    var ttNegDis = new tt.TruthTreeSent(negDis);
    expect(ttNegDis.tree.paths.open[0].value).to.be.false;
    expect(ttNegDis.tree.paths.open[1].value).to.be.false;
  });

  it('should return a tree with the correct open path truth values for nested negated conjunctions', function() {
    var negConj = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (and (not (instance ?CLARK Human))(subclass Human Entity)))'));
    var ttNegConj = new tt.TruthTreeSent(negConj);
    expect(ttNegConj.tree.paths.open[0].value).to.be.true;
    expect(ttNegConj.tree.paths.open[1].value).to.be.false;
    var negConj2 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(and (not (instance ?CLARK Human))(subclass Human Entity))'));
    var ttNegConj2 = new tt.TruthTreeSent(negConj2);
    expect(ttNegConj2.tree.paths.open[0].value).to.be.false;
    expect(ttNegConj2.tree.paths.open[1].value).to.be.true;
    var negConj3 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(and (not (instance ?CLARK Human))(not (subclass Human Entity)))'));
    var ttNegConj3 = new tt.TruthTreeSent(negConj3);
    expect(ttNegConj3.tree.paths.open[0].value).to.be.false;
    expect(ttNegConj3.tree.paths.open[1].value).to.be.false;
  });

  it('should return a tree with the correct open path truth values for nested negated disjunctions', function() {
    var negDis = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (or(not (instance ?CLARK Human))(subclass Human Entity)))'));
    var ttNegDis = new tt.TruthTreeSent(negDis);
    expect(ttNegDis.tree.paths.open[0].value).to.be.true;
    expect(ttNegDis.tree.paths.open[1].value).to.be.false;
    var negDis2 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(or (not (instance ?CLARK Human))(subclass Human Entity))'));
    var ttNegDis2 = new tt.TruthTreeSent(negDis2);
    expect(ttNegDis2.tree.paths.open[0].value).to.be.false;
    expect(ttNegDis2.tree.paths.open[1].value).to.be.true;
    var negDis3 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(or (not (instance ?CLARK Human))(not (subclass Human Entity)))'));
    var ttNegDis3 = new tt.TruthTreeSent(negDis3);
    expect(ttNegDis3.tree.paths.open[0].value).to.be.false;
    expect(ttNegDis3.tree.paths.open[1].value).to.be.false;
  });

  it('should return a tree with a stepCount of 2 for knowledgebase inputs with a single implication sentence (atoms for ant and consq)', function() {
    var imp = jKif.Utility.knowledgeBase(jKif.Parser.parse('(=> (instance ?CLARK Human)(subclass Human Entity))'));
    var ttImp = new tt.TruthTreeSent(imp);
    expect(ttImp.tree.stepCount).to.equal(2);
  });

  it('should return a tree with the correct open path truth values for implication sentences', function() {
    var imp = jKif.Utility.knowledgeBase(jKif.Parser.parse('(=> (instance ?CLARK Human)(subclass Human Entity))'));
    var ttImp = new tt.TruthTreeSent(imp);
    expect(ttImp.tree.paths.open[0].value).to.be.true;
    expect(ttImp.tree.paths.open[1].value).to.be.true;
    var imp2 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(=> (not (instance ?CLARK Human))(subclass Human Entity))'));
    var ttImp2 = new tt.TruthTreeSent(imp2);
    expect(ttImp2.tree.paths.open[0].value).to.be.false;
    expect(ttImp2.tree.paths.open[1].value).to.be.true;
    var imp3 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (=> (instance ?CLARK Human)(subclass Human Entity)))'));
    var ttImp3 = new tt.TruthTreeSent(imp3);
    expect(ttImp3.tree.paths.open[0].value).to.be.false;
    expect(ttImp3.tree.paths.open[1].value).to.be.false;
  });

  it('should return a tree with a stepCount of 2 for knowledgebase inputs with a single equivalence sentence (atoms for expressions)', function() {
    var equiv = jKif.Utility.knowledgeBase(jKif.Parser.parse('(<=> (instance ?CLARK Human)(subclass Human Entity))'));
    var ttEquiv = new tt.TruthTreeSent(equiv);
    expect(ttEquiv.tree.stepCount).to.equal(2);
  });

  it('should return a tree with the correct open path truth values for equivalence sentences', function() {
    var equiv = jKif.Utility.knowledgeBase(jKif.Parser.parse('(<=> (instance ?CLARK Human)(subclass Human Entity))'));
    var ttEquiv = new tt.TruthTreeSent(equiv);
    expect(ttEquiv.tree.paths.open[0].value).to.be.true;
    expect(ttEquiv.tree.paths.open[1].value).to.be.true;
    var equiv2 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(=> (not (instance ?CLARK Human))(subclass Human Entity))'));
    var equiv2 = new tt.TruthTreeSent(equiv2);
    expect(equiv2.tree.paths.open[0].value).to.be.false;
    expect(equiv2.tree.paths.open[1].value).to.be.true;
    var equiv3 = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (<=> (instance ?CLARK Human)(subclass Human Entity)))'));
    var ttEquiv3 = new tt.TruthTreeSent(equiv3);
    expect(ttEquiv3.tree.paths.open[0].value).to.be.false;
    expect(ttEquiv3.tree.paths.open[1].value).to.be.false;
  });

});
