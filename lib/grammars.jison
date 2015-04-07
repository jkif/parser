/**
 * jKif - 2015
 * grammars.jison
 * @file Language Grammars for SUO-KIF via JavaScript, Flex, and Jison
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


%{
  var path = require('path');
  var ast = require(path.resolve(__dirname +
                                './../../../lib/ast_constructors/ast_constructors'));
%}

%lex

white                   \s+
comment                 ";"
commentLine             {comment}[^\n]* \n?
ignoreable              {white}|{commentLine}
initialChar             [a-zA-Z]
digit                   [0-9]
decimalDigits           {digit}+
eE                      [eE]
exponent                {eE}(\-)?{decimalDigits}
separator               [\-\_]
anyChar                 {initialChar}|{digit}|{separator}
special                 [#^!\$%&\*\+-\.\<=>\?@_~\\]
freeChar                {anyChar}|{special}|{white}
stringLiteral           (\"{freeChar}*\")|(\'{freeChar}*\')
numericLiteral          (\-)?{decimalDigits}("."{decimalDigits})?({exponent})?\b
identifier              {initialChar}{anyChar}*

%options flex yylineno

%%
{ignoreable}        { /* ignore */ }
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
"forall"|"FORALL"   { return 'FORALL'; }
"exists"|"EXISTS"   { return 'EXISTS'; }
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
    { $$ = new ast.KIFNode(@$, $KIFexpressions); return $$; }
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
  | Sentence
  ;

Sentence
  : Equation
  | RelSent
  | LogicSent
  | QuantSent
  ;

LogicSent
  : Negation
  | Disjunction
  | Conjunction
  | Implication
  | Equivalence
  ;

QuantSent
  : UniversalSent
  | ExistentialSent
  ;

Word
  : IDENTIFIER
    { $$ = new ast.WordNode(@$, $IDENTIFIER); }
  ;

Variable
  : QUESTION IDENTIFIER
    { $$ = new ast.VariableNode(@$, $IDENTIFIER, 'IND'); }
  | MENTION IDENTIFIER
    { $$ = new ast.VariableNode(@$, $IDENTIFIER, 'ROW'); }
  ;

String
  : STRINGLITERAL
    { $$ = new ast.StringLiteralNode(@$, $STRINGLITERAL); }
  ;

Number
  : NUMERICLITERAL
    { $$ = new ast.NumericLiteralNode(@$, $NUMERICLITERAL); }
  ;

ArgumentList
  : ArgumentList KIFexpression
    { $$ = $ArgumentList.concat($KIFexpression); }
  |
    {  $$ = []; }
  ;

VariableList
  : VariableList Variable
    { $$ = $VariableList.concat($Variable); }
  | Variable
    { $$ = [$Variable]; }
  ;

Equation
  : LPAREN EQUALS KIFexpression KIFexpression RPAREN
    { $$ = new ast.EquationNode(@$, $KIFexpression1, $KIFexpression2); }
  ;

RelSent
  : LPAREN Variable ArgumentList RPAREN
    { $$ = new ast.RelSentNode(@$, $Variable, $ArgumentList); }
  | LPAREN Word ArgumentList RPAREN
    { $$ = new ast.RelSentNode(@$, $Word, $ArgumentList); }
  ;

Negation
  : LPAREN NOT KIFexpression RPAREN
    { $$ = new ast.NegationNode(@$, $KIFexpression); }
  ;

Disjunction
  : LPAREN OR ArgumentList RPAREN
    { $$ = new ast.DisjunctionNode(@$, $ArgumentList); }
  ;

Conjunction
  : LPAREN AND ArgumentList RPAREN
    { $$ = new ast.ConjunctionNode(@$, $ArgumentList); }
  ;

Implication
  : LPAREN EQUALS RARROW KIFexpression KIFexpression RPAREN
    { $$ = new ast.ImplicationNode(@$, $KIFexpression1, $KIFexpression2); }
  ;

Equivalence
  : LPAREN LARROW EQUALS RARROW KIFexpression KIFexpression RPAREN
    { $$ = new ast.EquivalenceNode(@$, $KIFexpression1, $KIFexpression2); }
  ;

UniversalSent
  : LPAREN FORALL LPAREN VariableList RPAREN KIFexpression RPAREN
    { $$ = new ast.UniversalSentNode(@$, $VariableList, $KIFexpression); }
  ;

ExistentialSent
  :  LPAREN EXISTS LPAREN VariableList RPAREN KIFexpression RPAREN
    { $$ = new ast.ExistentialSentNode(@$, $VariableList, $KIFexpression); }
  ;
%%
