var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../lib/jkif'),
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('jKif.Parser', function() {

  it('responds to #parse', function() {
    expect(jKif.Parser).to.respondTo('parse');
  });

  it('responds to #parseFile', function() {
    expect(jKif.Parser).to.respondTo('parseFile');
  });

  it('responds to #parseFileP', function() {
    expect(jKif.Parser).to.respondTo('parseFileP');
  });

  it('responds to #writeParsedToFile', function() {
    expect(jKif.Parser).to.respondTo('writeParsedToFile');
  });

  it('responds to #writeParsedToFileP', function() {
    expect(jKif.Parser).to.respondTo('writeParsedToFileP');
  });

});
