var chai = require('chai'),
    expect = chai.expect,
    Parser = require('../../../../lib/jkif_parser'),
    ast = require('../../../../lib/ast_constructors/ast_constructors'),
    locKeys = ['first_line', 'first_column', 'last_line', 'last_column'],
    parsed = Parser.parse('(exists (?F) (instance ?F Farmer))');


describe('Parser.parse Location Data', function() {

  it('should include location data in the parsed result', function() {
    expect(parsed.locationData).to.be.an.instanceof(Object);
    expect(parsed.locationData).to.have.all.keys(locKeys);
  });

});
