/* jKif - 2015
** Lexical Analysis and Parsing of SUO-KIF into JavaScript Objects
** Copyright (C) Clark Feusier <cfeusier@gmail.com> - All Rights Reserved
*/


%{
  var path = require('path');
  var ast = require(path.resolve(
                    __dirname + './../../../src/ast_constructors/ast_constructors'));
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
">"                 { return 'RARROW'; }
"<"                 { return 'LARROW'; }
"not"|"NOT"         { return 'NOT'; }
"or"|"OR"           { return 'OR'; }
"and"|"AND"         { return 'AND'; }
{stringLiteral}     { return 'STRINGLITERAL'; }
{numericLiteral}    { return 'NUMERICLITERAL'; }
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
  | RelSent
  | LogicSent
  | QuantSent
  ;

Equation
  : LPAREN EQUALS KIFexpression KIFexpression RPAREN
    { $$ = new ast.EquationNode($KIFexpression1, $KIFexpression2); }
  ;

RelSent
  : LPAREN Variable ArgumentList RPAREN
    { $$ = new ast.RelSentNode($Variable, $ArgumentList); }
  ;

LogicSent
  : Negation
  | Disjunction
  | Conjunction
  | Implication
  | Equivalence
  ;

QuantSent
  : ExistentialSent
  | UniversalSent
  ;

Negation
  : LPAREN NOT KIFexpression RPAREN
    { $$ = new ast.NegationNode($KIFexpression); }
  ;

Disjunction
  : LPAREN OR ArgumentList RPAREN
    { $$ = new ast.DisjunctionNode($ArgumentList); }
  ;

Conjunction
  : LPAREN AND ArgumentList RPAREN
    { $$ = new ast.ConjunctionNode($ArgumentList); }
  ;

Implication
  : LPAREN EQUALS RARROW KIFexpression KIFexpression RPAREN
    { $$ = new ast.ImplicationNode($KIFexpression1, $KIFexpression2); }
  ;

Equivalence
  : LPAREN LARROW EQUALS RARROW KIFexpression KIFexpression RPAREN
    { $$ = new ast.EquivalenceNode($KIFexpression1, $KIFexpression2); }
  ;
%%
