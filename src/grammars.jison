/* jKif - March 2015
** Lexical Analysis and Parsing of SUO-KIF into JavaScript Objects
** Copyright (C) Clark Feusier <cfeusier@gmail.com> - All Rights Reserved
*/


%{
  var path = require('path');
  var ast = require(path.resolve(__dirname + './../../../src/ast_constructors'));
%}

%lex

white                   \s+
initialChar             [a-zA-Z]
digit                   [0-9]
decimalDigits           {digit}+
separator               [\-\_]
anyChar                 {initialChar}|{digit}|{separator}
special                 [#^!\$%&\*\+-\.\<=>\?@_~\\]
freeChar                {anyChar}|{special}|{white}
stringLiteral           (\"{freeChar}*\")|(\'{freeChar}*\')
numericLiteral          (\-)?{decimalDigits}("."{decimalDigits})?\b
identifier              {initialChar}{anyChar}*

%options flex

%%
{white}             { /* ignore */ }
"("                 { return 'LPAREN'; }
")"                 { return 'RPAREN'; }
"?"                 { return 'QUESTION'; }
"@"                 { return 'MENTION'; }
"="                 { return 'EQUALS'; }
{stringLiteral}     { return 'STRINGLITERAL'; }
{numericLiteral}     { return 'NUMERICLITERAL'; }
{identifier}        { return 'IDENTIFIER'; }
<<EOF>>             { return 'EOF'; }
%%

/lex


%start KIF

%%
KIF
  : KIFexpressions EOF
    { $$ = new ast.KIFNode($KIFexpressions); return $$; }
  ;

KIFexpressions
  : KIFexpressions KIFexpression
    { $$ = $KIFexpressions.concat($KIFexpression); }
  |
    { $$ = []; }
  ;

KIFexpression
  : Word
  | Variable
  | String
  | Number
  | FunctionTerm
  | Sentence
  ;

Word
  : IDENTIFIER
    { $$ = new ast.WordNode($IDENTIFIER); }
  ;

Variable
  : QUESTION IDENTIFIER
    { $$ = new ast.VariableNode($IDENTIFIER, 'IND'); }
  | MENTION IDENTIFIER
    { $$ = new ast.VariableNode($IDENTIFIER, 'ROW'); }
  ;

String
  : STRINGLITERAL
    { $$ = new ast.StringLiteralNode($STRINGLITERAL); }
  ;

Number
  : NUMERICLITERAL
    { $$ = new ast.NumericLiteralNode($NUMERICLITERAL); }
  ;

FunctionTerm
  : LPAREN Word ArgumentList RPAREN
    { $$ = new ast.FunctionTermNode($Word.word, $ArgumentList); }
  ;

ArgumentList
  : ArgumentList KIFexpression
    { $$ = $ArgumentList.concat($KIFexpression); }
  |
    {  $$ = []; }
  ;

Sentence
  : Equation
  ;

Equation
  : LPAREN EQUALS KIFexpression KIFexpression RPAREN
    { $$ = new ast.EquationNode($KIFexpression1, $KIFexpression2); }
  ;
%%
