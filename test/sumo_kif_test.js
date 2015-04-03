var chai = require('chai'),
    expect = chai.expect,
    fs = require('fs'),
    path = require('path'),
    jKif = require('../src/jkif'),
    ast = require('../src/ast_constructors/ast_constructors'),
    kifFile = fs.readFileSync(path.resolve(__dirname +
                                          './../test_resources/sumo_core.kif'), 'utf8');


describe('jKif Full KIF File Parser', function() {
  it('should parse a .kif file into a KIFNode', function() {
    var parsed = jKif.Parser.parse(kifFile);
    expect(parsed).to.be.an.instanceof(ast.KIFNode);
  });
});
