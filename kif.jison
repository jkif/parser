/* kif.jison - March 2015
** Lexical Analysis and Parsing of SUO-KIF into JavaScript Objects
** Copyright (C) Clark Feusier <cfeusier@gmail.com> - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
*/


/* ------------------------------------------ */
/* BEGIN Lexical Scanner */
%lex

/* Lexicon Name Definitions */
initialChar        [a-zA-Z]
digit              [0-9]
separator          [\-\_]
anyChar            {initialChar}|{digit}|{separator}
identifier         {initialChar}{anyChar}*
stringLiteral      (\"{anyChar}*\")|(\'{anyChar}*\')


/* Lexicon Options */
%options flex

/* Lexical Grammar */
%%
\s+                 { /* ignore */ }
{digit}             { return 'DIGIT'; }
{identifier}        { return 'IDENTIFIER'; }
"("                 { return 'LPAREN'; }
")"                 { return 'RPAREN'; }
"?"                 { return 'QUESTION'; }
"@"                 { return 'MENTION'; }
{stringLiteral}     { return 'STRINGLITERAL'; }
<<EOF>>             { return 'EOF'; }
%%

/lex
/* END Lexical Scanner */
/* ------------------------------------------ */


/* ------------------------------------------ */
/* BEGIN Parser and Formal Grammar */

/* Jison Start Symbol */
%start KIF

/* Formal KIF Grammar*/
%%
KIF
  : KIFexpressions EOF
    { $$ = new KIFNode($KIFexpressions); return $$; }
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
  | Number
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
  : DIGIT
  ;

Number
  : DIGIT
  ;

Sentence
  : DIGIT
  ;

%%
/* END Parser and Formal Grammar */
/* ------------------------------------------ */


/* AST Representation Constructors */

function KIFNode(kifExpressions) {
  this.type = 'KIFNode';
  this.expressions = this.expressions || [].concat(kifExpressions);
  console.log(this);
}

function WordNode(identifier) {
  this.type = 'WordNode';
  this.word = identifier;
}

function VariableNode(identifier, variableType) {
  this.type = 'VariableNode';
  this.variableType = variableType || 'IND';
  this.variableName = identifier;
}

function StringLiteralNode(rawString) {
  this.type = 'StringLiteralNode';
  this.rawString = rawString;
  this.chars = rawString.substring(1, rawString.length - 1);
}