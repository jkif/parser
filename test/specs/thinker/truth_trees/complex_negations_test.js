var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    tt = require('../../../../lib/truth_trees/truth_trees');


describe('#construct with complex negations', function() {

  xit('should return one open stack with 4 nodes for a negated disjunction of atoms', function() {
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

});
