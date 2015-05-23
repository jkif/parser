var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../lib/jkif_parser'),
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('Parser', function() {

  it('responds to #parse', function() {
    expect(Parser).to.respondTo('parse');
  });

  it('responds to #parseFile', function() {
    expect(Parser).to.respondTo('parseFile');
  });

  it('responds to #parseFileP', function() {
    expect(Parser).to.respondTo('parseFileP');
  });

  it('responds to #writeParsedToFile', function() {
    expect(Parser).to.respondTo('writeParsedToFile');
  });

  it('responds to #writeParsedToFileP', function() {
    expect(Parser).to.respondTo('writeParsedToFileP');
  });

});
