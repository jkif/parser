/* jKif - March 2015
** Lexical Analysis and Parsing of SUO-KIF into JavaScript Objects
** Copyright (C) Clark Feusier <cfeusier@gmail.com> - All Rights Reserved
*/


%{
  var path = require('path');
  var ast = require(path.resolve(__dirname + './../../../src/ast_constructors'));
  var KIFNode = ast.KIFNode;
  var WordNode = ast.WordNode;
  var VariableNode = ast.VariableNode;
  var StringLiteralNode = ast.StringLiteralNode;
  var FunctionTermNode = ast.FunctionTermNode;
  var EquationNode = ast.EquationNode;
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
{identifier}        { return 'IDENTIFIER'; }
<<EOF>>             { return 'EOF'; }
%%

/lex


%start KIF

%%
KIF
  : KIFexpressions EOF
    { $$ = new KIFNode($KIFexpressions); console.log($$); return $$; }
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
  | FunctionTerm
  | Sentence
  ;

Word
  : IDENTIFIER
    { $$ = new WordNode($IDENTIFIER); }
  ;

Variable
  : QUESTION IDENTIFIER
    { $$ = new VariableNode($IDENTIFIER, 'IND'); }
  | MENTION IDENTIFIER
    { $$ = new VariableNode($IDENTIFIER, 'ROW'); }
  ;

String
  : STRINGLITERAL
    { $$ = new StringLiteralNode($STRINGLITERAL); }
  ;

FunctionTerm
  : LPAREN Word ArgumentList RPAREN
    { $$ = new FunctionTermNode($Word.word, $ArgumentList); }
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
    { $$ = new EquationNode($KIFexpression1, $KIFexpression2); }
  ;
%%
