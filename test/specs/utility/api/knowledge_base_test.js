var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility #knowledgeBase', function() {

  var parsed = jKif.Parser.parse(''),
      kb = jKif.Utility.knowledgeBase(parsed),
      sentParse = jKif.Parser.parse('(relSent ?var word)').expressions[0],
      kbSent = jKif.Utility.knowledgeBase(sentParse),
      sentParse2 = jKif.Parser.parse('(relSent ?var (word))').expressions[0],
      kbSent2 = jKif.Utility.knowledgeBase(sentParse2),
      sentParse3 = jKif.Parser.parse('(FORALL (?var) (exists (?var) (OR (instance ?var Abstract)(instance ?var Physical))))').expressions[0],
      kbSent3 = jKif.Utility.knowledgeBase(sentParse3);

  it('should return an Array', function() {
    expect(kb).to.be.an.instanceof(Array);
  });

  it('should return an empty array when the input has no sentences', function() {
    expect(kb).to.have.length(0);
  });

  it('should add sentences from the input into the result array', function() {
    expect(kbSent).to.have.length(1);
  });

  it('should add nested sentences from the input into the result array', function() {
    expect(kbSent2).to.have.length(2);
  });

  it('should add deeply nested sentences from the input into the result array', function() {
    expect(kbSent3).to.have.length(2);
  });

  it('should add the correct sentences from the input into the result array', function() {
    expect(kbSent[0]).to.be.an.instanceof(ast.RelSentNode);
    expect(kbSent2[0]).to.be.an.instanceof(ast.RelSentNode);
    expect(kbSent2[1]).to.be.an.instanceof(ast.RelSentNode);
    expect(kbSent3[0]).to.be.an.instanceof(ast.UniversalSentNode);
    expect(kbSent3[1]).to.be.an.instanceof(ast.ExistentialSentNode);
  });

});
