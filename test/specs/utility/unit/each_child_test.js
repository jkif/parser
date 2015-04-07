var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #eachChild', function() {

  it('should return undefined', function() {
    var result = jKif.Utility.eachChild('', function() {});
    expect(result).to.be.undefined;
  });

  it('should execute the callback on each child of the current node', function() {
    var testStack = [],
        testStack2 = [],
        testStack3 = [],
        parsed = jKif.Parser.parse('word'),
        parsed2 = jKif.Parser.parse('(EXISTS (?variable) word)'),
        parsed3 = jKif.Parser.parse('(and (instance ?CLARK Human)(isSmart ?Clark))');

    jKif.Utility.eachChild(parsed, function(child) {
      testStack.push(child);
    });
    jKif.Utility.eachChild(parsed2, function(child) {
      testStack2.push(child);
    });
    jKif.Utility.eachChild(parsed3, function(child) {
      testStack3.push(child);
    });
    expect(testStack.length).to.equal(1);
    expect(testStack2.length).to.equal(3);
    expect(testStack3.length).to.equal(6);
  });

});
