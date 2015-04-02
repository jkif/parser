var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../src/jkif'),
    ast = require('../src/ast_constructors');

describe('jKif', function() {
  it('should be defined and not null', function() {
    expect(jKif).to.exist;
  });
  it('should have a Parser property', function() {
    expect(jKif.Parser).to.exist;
  });

  describe('Parser', function() {
    it('responds to #parse', function() {
      expect(jKif.Parser).to.respondTo('parse');
    });

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
        expect(parsed.functionArgumentList.length).to.be.equal(2);
        expect(parsed.functionArgumentList[0]).to.be.an.instanceof(ast.WordNode);
        expect(parsed.functionArgumentList[1]).to.be.an.instanceof(ast.FunctionTermNode);
      });
    });
  });
});