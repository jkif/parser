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
  var FunctionTermNode = ast.FunctionTermNode;
%}

%lex

white                   \s+
initialChar             [a-zA-Z]
digit                   [0-9]
decimalDigits           {digit}+
separator               [\-\_]
anyChar                 {initialChar}|{digit}|{separator}
identifier              {initialChar}{anyChar}*

%options flex

%%
{white}             { /* ignore */ }
"("                 { return 'LPAREN'; }
")"                 { return 'RPAREN'; }
"?"                 { return 'QUESTION'; }
"@"                 { return 'MENTION'; }
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
  | FunctionTerm
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

FunctionTerm
  : LPAREN Word ArgumentList RPAREN
    { $$ = new FunctionTermNode($Word.word, $ArgumentList); }
  ;

ArgumentList
  : ArgumentList Argument
    { $$ = $ArgumentList.concat($Argument); }
  |
    {  $$ = []; }
  ;

Argument
  : KIFexpression
  ;

%%
