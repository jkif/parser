var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #numOfNode', function() {

  var basicTest = jKif.Utility.numOfNode(jKif.Parser.parse(''));

  it('should return a number', function() {
    expect(basicTest).to.be.a('number');
  });

  it('should return an integer', function() {
    expect(basicTest % 2).to.equal(0);
  });

  it('should return the correct number of parsed children nodes that match the given node type', function() {
    var empty = jKif.Parser.parse('');
    var num0 = jKif.Utility.numOfNode(empty, 'WordNode');
    var num1 = jKif.Utility.numOfNode(empty, 'KIFNode');
    var simple = jKif.Parser.parse('subclass Class Entity');
    var complex = jKif.Parser.parse('(<=> (instance ?CLASS Class)(subclass ?CLASS Entity))');
    var zero = jKif.Utility.numOfNode(simple, 'RelSentNode');
    var one = jKif.Utility.numOfNode(complex, 'EquivalenceNode');
    var two = jKif.Utility.numOfNode(complex, 'RelSentNode');
    var two2 = jKif.Utility.numOfNode(complex, 'VariableNode');
    var three = jKif.Utility.numOfNode(simple, 'WordNode');
    expect(num0).to.equal(0);
    expect(num1).to.equal(1);
    expect(zero).to.equal(0);
    expect(one).to.equal(1);
    expect(two).to.equal(2);
    expect(two2).to.equal(2);
    expect(three).to.equal(3);
  });

});
