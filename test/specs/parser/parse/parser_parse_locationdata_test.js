var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    locKeys = ['first_line', 'first_column', 'last_line', 'last_column'],
    parsed = jKif.Parser.parse('(exists (?F) (instance ?F Farmer))');


describe('jKif.Parser.parse Location Data', function() {

  it('should include location data in the parsed result', function() {
    expect(parsed.locationData).to.be.an.instanceof(Object);
    expect(parsed.locationData).to.have.all.keys(locKeys);
  });

});
