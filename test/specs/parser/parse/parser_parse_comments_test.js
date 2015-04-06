var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Parser.parse Comments', function() {

  it('correctly parses a single word comment', function() {
    expect(jKif.Parser.parse(';hi').expressions).to.be.empty;
  });

  it('correctly parses a comment with a space first', function() {
    expect(jKif.Parser.parse('; hi').expressions).to.be.empty;
  });

  it('correctly parses a single sentence comment', function() {
    expect(jKif.Parser.parse(';hi my name is comment and i am a comment.').expressions).to.be.empty;
  });

  it('correctly parses a comment and ignores SUO-KIF on the same line', function() {
    expect(jKif.Parser.parse(';hi my name is comment(?YO argHere)').expressions).to.be.empty;
  });

  it('correctly parses a comment and then SUO-KIF on the line below', function() {
    expect(jKif.Parser.parse(';hi my name is comment\n(?YO argHere)').expressions).to.not.be.empty;
  });

});
