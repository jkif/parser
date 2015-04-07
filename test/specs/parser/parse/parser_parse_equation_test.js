var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../../lib/jkif'),
    ast = require('../../../../lib/ast_constructors/ast_constructors');


describe('jKif.Parser.parse Equation parsing', function() {

  it('correctly parses an Equation into an EquationNode', function() {
    var parsed = jKif.Parser.parse('(= id id)').expressions[0];
    expect(parsed).to.be.an.instanceof(ast.EquationNode);
  });

  it('correctly parses the terms of an Equation if both Words', function() {
    var parsed = jKif.Parser.parse('(= firstTerm secondTerm)').expressions[0];
    expect(parsed.terms).to.have.length(2);
    expect(parsed.terms[0]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.terms[1]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.terms[0].word).to.equal('firstTerm');
    expect(parsed.terms[1].word).to.equal('secondTerm');
  });

  it('correctly parses the terms of an Equation if both Variables', function() {
    var parsed = jKif.Parser.parse('(= ?FIRSTTERM ?SECONDTERM)').expressions[0];
    expect(parsed.terms).to.have.length(2);
    expect(parsed.terms[0]).to.be.an.instanceof(ast.VariableNode);
    expect(parsed.terms[1]).to.be.an.instanceof(ast.VariableNode);
    expect(parsed.terms[0].variableName).to.equal('FIRSTTERM');
    expect(parsed.terms[1].variableName).to.equal('SECONDTERM');
    expect(parsed.terms[0].variableType).to.equal('IND');
    expect(parsed.terms[1].variableType).to.equal('IND');
  });

  it('correctly parses the terms of an Equation with a FunctionTerm', function() {
    var parsed = jKif.Parser.parse('(= firstTerm (function argument))').expressions[0];
    expect(parsed.terms).to.have.length(2);
    expect(parsed.terms[0]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.terms[1]).to.be.an.instanceof(ast.RelSentNode);
    expect(parsed.terms[1].argumentList).to.have.length(1);
    expect(parsed.terms[1].argumentList[0]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.terms[1].argumentList[0].word).to.equal('argument');
  });

  it('correctly parses higher-order Equations', function() {
    var parsed = jKif.Parser.parse('(= firstTerm (= secondFirstTerm firstSecondTerm))').expressions[0];
    expect(parsed.terms).to.have.length(2);
    expect(parsed.terms[0]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.terms[1]).to.be.an.instanceof(ast.EquationNode);
    expect(parsed.terms[1].terms[0]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.terms[1].terms[1]).to.be.an.instanceof(ast.WordNode);
    expect(parsed.terms[1].terms[0].word).to.equal('secondFirstTerm');
    expect(parsed.terms[1].terms[1].word).to.equal('firstSecondTerm');
  });

});
