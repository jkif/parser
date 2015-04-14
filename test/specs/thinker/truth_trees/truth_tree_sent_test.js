var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    tt = require('../../../../lib/truth_trees/truth_trees');


describe('TruthTreeSent Constructor', function() {

  xit('should exist', function() {
    expect(tt.TruthTreeSent).to.exist;
  });

  var parsed = jKif.Parser.parse(''),
      kb = jKif.Utility.knowledgeBase(parsed),
      ttSent = new tt.TruthTreeSent(kb);

  xit('should have a "tree" property', function() {
    expect(ttSent.tree).to.exist;
  });

  xit('should have an instance of an Object for the tree property', function() {
    expect(ttSent.tree).to.be.an.instanceof(Object);
  });

});
