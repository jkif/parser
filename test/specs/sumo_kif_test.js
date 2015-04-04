var chai = require('chai'),
    expect = chai.expect,
    fs = require('fs'),
    path = require('path'),
    jKif = require('../../src/jkif'),
    ast = require('../../src/ast_constructors/ast_constructors'),
    kifFile = fs.readFileSync(path.resolve(__dirname +
                                          './../resources/sumo_core.kif'), 'utf8'),
    parsed = jKif.Parser.parse(kifFile);

describe('jKif Full KIF File Parser', function() {
  it('should parse a .kif file into a KIFNode', function() {
    expect(parsed).to.be.an.instanceof(ast.KIFNode);
  });
  it('should parse a complex existential sentence correctly', function() {
    var exprs = parsed.expressions;
    var existSent = exprs[0];
    expect(existSent).to.be.an.instanceof(ast.ExistentialSentNode);
    expect(existSent.quantifiedSent).to.be.an.instanceof(ast.ConjunctionNode);
    expect(existSent.quantifiedSent.conjuncts[0]).to.be.an.instanceof(ast.FunctionTermNode);
  });
  it('should parse a complex equivalence correctly', function() {
    var exprs = parsed.expressions;
    var equivSent = exprs[6];
    var existNested = equivSent.expressions[1];
    var conjunctSent = existNested.quantifiedSent;
    var implSent = conjunctSent.conjuncts[2];
    expect(equivSent).to.be.an.instanceof(ast.EquivalenceNode);
    expect(existNested).to.be.an.instanceof(ast.ExistentialSentNode);
    expect(conjunctSent).to.be.an.instanceof(ast.ConjunctionNode);
    expect(implSent).to.be.an.instanceof(ast.ImplicationNode);
    expect(implSent.consequent.quantifiedSent).to.be.an.instanceof(ast.RelSentNode);
  });
});
