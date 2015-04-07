var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #jkifLength', function() {

  var parsed = jKif.Parser.parse('');
  var lengthTest = jKif.Utility.jkifLength(parsed);

  it('should return a number', function() {
    expect(lengthTest).to.be.a('number');
  });

  it('should return an integer', function() {
    expect(lengthTest % 2).to.equal(0);
  });

  it('should return the correct number of parsed children nodes for the given node', function() {
    var len1 = jKif.Utility.jkifLength(jKif.Parser.parse('?variable'));
    var len2 = jKif.Utility.jkifLength(jKif.Parser.parse('?variable word'));
    var lenNested = jKif.Utility.jkifLength(jKif.Parser.parse('(?variable arg1 arg2)'));
    var nested = jKif.Parser.parse('(forall (?thing) (?variable arg1 arg2))');
    var tripNested = jKif.Parser.parse('(exists (?thing) (?variable arg1 (instance ?THING Human)))');
    var lenNestedTwice = jKif.Utility.jkifLength(nested);
    var lenNestedThrice = jKif.Utility.jkifLength(tripNested);
    expect(lengthTest).to.equal(0);
    expect(len1).to.equal(1);
    expect(len2).to.equal(2);
    expect(lenNested).to.equal(4);
    expect(lenNestedTwice).to.equal(6);
    expect(lenNestedThrice).to.equal(8);
  });

});
