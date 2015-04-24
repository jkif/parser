var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    tt = require('../../../../lib/truth_trees/truth_trees');


describe('#construct with complex negations', function() {

  it('should return one open stack with 4 nodes for a negated disjunction of atoms', function() {
    var negatedDisjunctionKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (or (instance ?CLARK Alien)(isStupid ?CLARK)))')),
        ttSentNegatedDisjunction = new tt.TruthTreeSent(negatedDisjunctionKb),
        openStack = ttSentNegatedDisjunction.openStacks[0];
    expect(Object.keys(ttSentNegatedDisjunction.openStacks)).to.have.length(1);
    expect(openStack).to.exist;
    expect(openStack).to.have.length(4);
    expect(openStack[0].checked).to.be.true;
    expect(openStack[0]._id).to.be.a('string');
    expect(openStack[0]._id).to.equal('negation');
    expect(openStack[1].checked).to.be.true;
    expect(openStack[1]._id).to.be.a('string');
    expect(openStack[1]._id).to.equal('molecule');
    expect(openStack[2].checked).to.be.true;
    expect(openStack[2]._id).to.be.a('number');
    expect(openStack[2]._id).to.equal(-3);
    expect(openStack[3].checked).to.be.true;
    expect(openStack[3]._id).to.be.a('number');
    expect(openStack[3]._id).to.equal(-4);
  });

  xit('should return two open stacks with 3 nodes in each stack for a negated conjunction of atoms', function() {
    var negatedDisjunctionKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (and (instance ?CLARK Human)(isStupid ?CLARK)))')),
        ttSentNegatedDisjunction = new tt.TruthTreeSent(negatedDisjunctionKb),
        openStacks = ttSentNegatedDisjunction.openStacks,
        firstStack = openStacks[0],
        secondStack = openStacks[1];
    expect(Object.keys(openStacks)).to.have.length(2);
    expect(openStacks).to.exist;
    expect(firstStack).to.exist;
    expect(secondStack).to.exist;
    expect(firstStack).to.have.length(3);
    expect(firstStack[0].checked).to.be.true;
    expect(firstStack[0]._id).to.be.a('string');
    expect(firstStack[0]._id).to.equal('negation');
    expect(firstStack[1].checked).to.be.true;
    expect(firstStack[1]._id).to.be.a('string');
    expect(firstStack[1]._id).to.equal('molecule');
    expect(firstStack[2].checked).to.be.true;
    expect(firstStack[2]._id).to.be.a('number');
    expect(firstStack[2]._id).to.equal(-3);
    expect(secondStack).to.have.length(3);
    expect(secondStack[0].checked).to.be.true;
    expect(secondStack[0]._id).to.be.a('string');
    expect(secondStack[0]._id).to.equal('negation');
    expect(secondStack[1].checked).to.be.true;
    expect(secondStack[1]._id).to.be.a('string');
    expect(secondStack[1]._id).to.equal('molecule');
    expect(secondStack[2].checked).to.be.true;
    expect(secondStack[2]._id).to.be.a('number');
    expect(secondStack[2]._id).to.equal(-4);
  });

  xit('should return one open stack with 4 nodes in the stack for a negated implication (atoms)', function() {
    var negatedImplicationKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (=> (instance ?CLARK Human)(isStupid ?CLARK)))')),
        ttSentNegatedImplication = new tt.TruthTreeSent(negatedImplicationKb),
        openStack = ttSentNegatedImplication.openStacks[0];
    expect(Object.keys(ttSentNegatedImplication.openStacks)).to.have.length(1);
    expect(openStack).to.exist;
    expect(openStack).to.have.length(4);
    expect(openStack[0].checked).to.be.true;
    expect(openStack[0]._id).to.be.a('string');
    expect(openStack[0]._id).to.equal('negation');
    expect(openStack[1].checked).to.be.true;
    expect(openStack[1]._id).to.be.a('string');
    expect(openStack[1]._id).to.equal('molecule');
    expect(openStack[2].checked).to.be.true;
    expect(openStack[2]._id).to.be.a('number');
    expect(openStack[2]._id).to.equal(3);
    expect(openStack[3].checked).to.be.true;
    expect(openStack[3]._id).to.be.a('number');
    expect(openStack[3]._id).to.equal(-4);
  });

  xit('should return two open stacks with four nodes in each stack for a negated equivalence (simple atomic)', function() {
    var negatedEquivalenceKb = jKif.Utility.knowledgeBase(jKif.Parser.parse('(not (<=> (isAlive ?CLARK)(isUgly ?CLARK)))')),
        ttSentNegatedEquivalence = new tt.TruthTreeSent(negatedEquivalenceKb),
        openStacks = ttSentNegatedEquivalence.openStacks;
    expect(openStacks).to.exist;
    expect(Object.keys(openStacks)).to.have.length(2);
    expect(Object.keys(ttSentNegatedEquivalence.closedStacks)).to.be.empty;
    expect(openStacks[0][0].checked).to.be.true;
    expect(openStacks[0][0]._id).to.equal('negation');
    expect(openStacks[0][1].checked).to.be.true;
    expect(openStacks[0][1]._id).to.equal('molecule');
    expect(openStacks[0][2].checked).to.be.true;
    expect(openStacks[0][2]._id).to.equal(3);
    expect(openStacks[0][3].checked).to.be.true;
    expect(openStacks[0][3]._id).to.equal(-4);
    expect(openStacks[1][0].checked).to.be.true;
    expect(openStacks[1][0]._id).to.equal('negation');
    expect(openStacks[1][1].checked).to.be.true;
    expect(openStacks[1][1]._id).to.equal('molecule');
    expect(openStacks[1][2].checked).to.be.true;
    expect(openStacks[1][2]._id).to.equal(-3);
    expect(openStacks[1][3].checked).to.be.true;
    expect(openStacks[1][3]._id).to.equal(4);
  });

});
