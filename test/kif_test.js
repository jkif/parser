var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../src/jkif'),
    ast = require('../src/ast_constructors');

describe('jKif', function() {
  it('should be defined and not null', function() { expect(jKif).to.exist; });
  it('should have a Parser property', function() { expect(jKif.Parser).to.exist; });

  describe('Parser', function() {
    it('responds to #parse', function() { expect(jKif.Parser).to.respondTo('parse'); });

    describe('#parse', function() {
      it('is a function', function() {
        expect(jKif.Parser.parse).to.be.a('function');
      });
      it('returns a KIFNode object', function() {
        expect(jKif.Parser.parse('')).to.be.an.instanceof(ast.KIFNode);
      });
      it('correctly parses a single whitespace', function() {
        expect(jKif.Parser.parse(' ').expressions).to.be.empty;
      });
      it('correctly parses multiple whitespaces in a row', function() {
        expect(jKif.Parser.parse('     ').expressions).to.be.empty;
      });
      it('correctly parses a newline whitespace', function() {
        expect(jKif.Parser.parse('\n').expressions).to.be.empty;
      });
      it('correctly parses Words into WordNodes', function() {
        expect(jKif.Parser.parse('word').expressions[0]).to.be.an.instanceof(ast.WordNode);
      });
      it('correctly parses a single Word', function() {
        expect(jKif.Parser.parse('word').expressions[0].word).to.equal('word');
      });
      it('correctly parses a multiple Words', function() {
        expect(jKif.Parser.parse('word secondword').expressions[1].word).to.equal('secondword');
      });
      it('correctly parses Row Variables into VariableNodes', function() {
        expect(jKif.Parser.parse('@row').expressions[0]).to.be.an.instanceof(ast.VariableNode);
      });
      it('correctly parses Independent Variables into VariableNodes', function() {
        expect(jKif.Parser.parse('?ind').expressions[0]).to.be.an.instanceof(ast.VariableNode);
      });
      it('correctly parses Variables with variableType "ROW"', function() {
        expect(jKif.Parser.parse('@row').expressions[0].variableType).to.equal('ROW');
      });
      it('correctly parses Variables with variableType "IND"', function() {
        expect(jKif.Parser.parse('?ind').expressions[0].variableType).to.equal('IND');
      });
      it('correctly parses Row Variable names', function() {
        expect(jKif.Parser.parse('@row').expressions[0].variableName).to.equal('row');
      });
      it('correctly parses Independent Variable names', function() {
        expect(jKif.Parser.parse('?ind').expressions[0].variableName).to.equal('ind');
      });
      it('correctly parses FunctionTerms into FunctionTermNodes', function() {
        expect(jKif.Parser.parse('(id)').expressions[0]).to.be.an.instanceof(ast.FunctionTermNode);
      });
      it('correctly parses a FunctionTerm with no arguments', function() {
        expect(jKif.Parser.parse('(clark)').expressions[0]).to.be.an.instanceof(ast.FunctionTermNode);
      });
      it('correctly parses a FunctionTerm argumentList into an Array', function() {
        var parsed = jKif.Parser.parse('(function argument)').expressions[0];
        expect(parsed.functionArgumentList).to.be.an.instanceof(Array);
      });
      it('correctly parses a FunctionTerm functionName', function() {
        var parsed = jKif.Parser.parse('(function argument)').expressions[0];
        expect(parsed.functionName).to.equal('function');
      });
      it('correctly parses a FunctionTerm with a single argument', function() {
        var parsed = jKif.Parser.parse('(function argument)').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.FunctionTermNode);
        expect(parsed.functionArgumentList[0]).to.be.an.instanceof(ast.WordNode);
      });
      it('correctly parses a FunctionTerm with two arguments', function() {
        var parsed = jKif.Parser.parse('(function argument secondArg)').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.FunctionTermNode);
        expect(parsed.functionArgumentList.length).to.be.equal(2);
        expect(parsed.functionArgumentList[0]).to.be.an.instanceof(ast.WordNode);
      });
      it('correctly parses a FunctionTerm with a FunctionTerm as an argument', function() {
        var parsed = jKif.Parser.parse('(function argument (secondfunc argument))').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.FunctionTermNode);
        expect(parsed.functionArgumentList).to.have.length(2);
        expect(parsed.functionArgumentList[0]).to.be.an.instanceof(ast.WordNode);
        expect(parsed.functionArgumentList[1]).to.be.an.instanceof(ast.FunctionTermNode);
      });
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
        expect(parsed.terms[1]).to.be.an.instanceof(ast.FunctionTermNode);
        expect(parsed.terms[1].functionName).to.equal('function');
        expect(parsed.terms[1].functionArgumentList).to.have.length(1);
        expect(parsed.terms[1].functionArgumentList[0]).to.be.an.instanceof(ast.WordNode);
        expect(parsed.terms[1].functionArgumentList[0].word).to.equal('argument');
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
      it('correctly parses a StringLiteral into a StringLiteralNode', function() {
        expect(jKif.Parser.parse('""').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
        expect(jKif.Parser.parse('\'\'').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
      });
      it('correctly parses a StringLiteral with special characters', function() {
        expect(jKif.Parser.parse('"!$_-@~^#%+=\\"').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
      });
      it('correctly parses a StringLiteral with new lines', function() {
        expect(jKif.Parser.parse('"\n"').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
      });
      it('correctly parses a StringLiteral with new lines', function() {
        expect(jKif.Parser.parse('"\n"').expressions[0]).to.be.instanceof(ast.StringLiteralNode);
      });
      it('correctly parses a StringLiteral into a raw string', function() {
        expect(jKif.Parser.parse('"abcdefg hi"').expressions[0].rawString).to.equal('"abcdefg hi"');
      });
      it('correctly parses a StringLiteral characters out of the quotation marks', function() {
        expect(jKif.Parser.parse('"abcdefg hi"').expressions[0].chars).to.equal('abcdefg hi');
      });
      it('correctly parses a NumericLiteral positive integer into a NumericLiteralNode', function() {
        expect(jKif.Parser.parse('1').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
      });
      it('correctly parses a NumericLiteral positive decimal into a NumericLiteralNode', function() {
        expect(jKif.Parser.parse('0.1123').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
      });
      it('correctly parses a NumericLiteral negative integer into a NumericLiteralNode', function() {
        expect(jKif.Parser.parse('-6').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
      });
      it('correctly parses a NumericLiteral negative decimal into a NumericLiteralNode', function() {
        expect(jKif.Parser.parse('-6.999').expressions[0]).to.be.instanceof(ast.NumericLiteralNode);
      });
      it('correctly parses the number value out of a NumericLiteral for positive integers', function() {
        expect(jKif.Parser.parse('6').expressions[0].number).to.equal(6);
      });
      it('correctly parses the number value out of a NumericLiteral for negative integers', function() {
        expect(jKif.Parser.parse('-6').expressions[0].number).to.equal(-6);
      });
      it('correctly parses the number value out of a NumericLiteral for positive decimals', function() {
        expect(jKif.Parser.parse('0.166').expressions[0].number).to.equal(0.166);
      });
      it('correctly parses the number value out of a NumericLiteral for negative decimals', function() {
        expect(jKif.Parser.parse('-0.166').expressions[0].number).to.equal(-0.166);
      });
      it('correctly parses a RelSent into a RelSentNode', function() {
        expect(jKif.Parser.parse('(?VARIABLE)').expressions[0]).to.be.an.instanceof(ast.RelSentNode);
      });
      it('correctly parses a RelSent with no arguments', function() {
        expect(jKif.Parser.parse('(@dog)').expressions[0]).to.be.an.instanceof(ast.RelSentNode);
      });
      it('correctly parses a RelSent argumentList into an Array', function() {
        var parsed = jKif.Parser.parse('(?variable argument)').expressions[0];
        expect(parsed.argumentList).to.be.an.instanceof(Array);
      });
      it('correctly parses a RelSent variable name', function() {
        var parsed = jKif.Parser.parse('(?variable argument)').expressions[0];
        expect(parsed.variable.variableName).to.equal('variable');
      });
      it('correctly parses a RelSent with a single argument', function() {
        var parsed = jKif.Parser.parse('(?variable argument)').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.RelSentNode);
        expect(parsed.argumentList[0]).to.be.an.instanceof(ast.WordNode);
      });
      it('correctly parses a RelSent with two arguments', function() {
        var parsed = jKif.Parser.parse('(@variable argument secondArg)').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.RelSentNode);
        expect(parsed.argumentList.length).to.be.equal(2);
        expect(parsed.argumentList[0]).to.be.an.instanceof(ast.WordNode);
      });
      it('correctly parses a higher-order RelSent', function() {
        var parsed = jKif.Parser.parse('(?VARIABLE argument (?SECONDVARIABLE secondArgument))').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.RelSentNode);
        expect(parsed.argumentList).to.have.length(2);
        expect(parsed.argumentList[0]).to.be.an.instanceof(ast.WordNode);
        expect(parsed.argumentList[1]).to.be.an.instanceof(ast.RelSentNode);
      });
      it('correctly parses a negation into a NegationNode', function() {
        var parsed = jKif.Parser.parse('(not word)').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.NegationNode);
      });
      it('correctly parses a negated word', function() {
        var parsed = jKif.Parser.parse('(not word)').expressions[0];
        expect(parsed.negatedExpression).to.be.an.instanceof(ast.WordNode);
      });
      it('correctly parses a negated variable', function() {
        var parsed = jKif.Parser.parse('(not ?VARIABLE)').expressions[0];
        expect(parsed.negatedExpression).to.be.an.instanceof(ast.VariableNode);
      });
      it('correctly parses a negated string literal', function() {
        var parsed = jKif.Parser.parse('(not "stringhere")').expressions[0];
        expect(parsed.negatedExpression).to.be.an.instanceof(ast.StringLiteralNode);
      });
      it('correctly parses a negated numeric literal', function() {
        var parsed = jKif.Parser.parse('(not 6)').expressions[0];
        expect(parsed.negatedExpression).to.be.an.instanceof(ast.NumericLiteralNode);
      });
      it('correctly parses a negated equation', function() {
        var parsed = jKif.Parser.parse('(not (= firstTerm secondTerm))').expressions[0];
        expect(parsed.negatedExpression).to.be.an.instanceof(ast.EquationNode);
      });
      it('correctly parses a negated RelSent', function() {
        var parsed = jKif.Parser.parse('(not (?VARIABLE argument))').expressions[0];
        expect(parsed.negatedExpression).to.be.an.instanceof(ast.RelSentNode);
      });
      it('correctly parses a negated FunctionTerm', function() {
        var parsed = jKif.Parser.parse('(not (function argument))').expressions[0];
        expect(parsed.negatedExpression).to.be.an.instanceof(ast.FunctionTermNode);
      });
      xit('correctly parses a negated disjunction', function() {

      });
      xit('correctly parses a negated conjunction', function() {

      });
      xit('correctly parses a negated implication', function() {

      });
      xit('correctly parses a negated equivalence', function() {

      });
      it('correctly parses a disjunction into a DisjunctionNode', function() {
        var parsed = jKif.Parser.parse('(or arg1 arg2)').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.DisjunctionNode);
        expect(parsed.disjuncts).to.have.length(2);
        expect(parsed.disjuncts[0]).to.be.instanceof(ast.WordNode);
      });
      it('correctly parses a conjunction into a ConjunctionNode', function() {
        var parsed = jKif.Parser.parse('(AND arg1 arg2)').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.ConjunctionNode);
        expect(parsed.conjuncts).to.have.length(2);
        expect(parsed.conjuncts[0]).to.be.instanceof(ast.WordNode);
      });
      it('correctly parses an implication into an ImplicationNode', function() {
        var parsed = jKif.Parser.parse('(=> expr1 expr2)').expressions[0];
        expect(parsed).to.be.an.instanceof(ast.ImplicationNode);
        expect(parsed.antecedent).to.be.an.instanceof(ast.WordNode);
        expect(parsed.consequent).to.be.instanceof(ast.WordNode);
      });
    });
  });
});