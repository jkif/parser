var chai = require('chai'),
    expect = chai.expect,
    fs = require('fs'),
    path = require('path'),
    jKif = require('../src/jkif'),
    ast = require('../src/ast_constructors/ast_constructors'),
    kifFilePath = path.resolve(__dirname + './../test_resources/sumo_core.kif');


describe('jKif.Parser Extra API', function() {
  describe('#parseFile', function() {
    it('should parse a .kif file into a KIFNode', function() {
      jKif.Parser.parseFile(kifFilePath, function(err, parsed) {
        if (!err) expect(parsed).to.be.an.instanceof(ast.KIFNode);
      });
    });
  });
});
