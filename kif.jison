/* Parses SUO-KIF into JavaScript */

%lex
%%
[A-Z]                               { return 'UPPER'; }
[a-z]                               { return 'LOWER'; }
[0-9]                               { return 'DIGIT'; }
[\!\$\%\&\*\+\-\.\/\<\=\>\?\@\_\~]  { return 'SPECIAL'; }
;;                                  { return 'COMMENT'; }
\s+                                 { return 'WHITE'; }
<<EOF>>                             { return 'EOF'; }
/lex


/* operator associations and precedence */
%left
%right


/* BNF Grammar */
%%

kif
  : content EOF
    { return new KIFNode($1); }
  ;

content
  : content term
    { $$ = $1.concat($2); }
  |
    { $$ = []; }
  ;

term
  : sentence
  | funterm
  | variable
  | word
  | string
  | number
  ;

sentence
  : word
  | equation
  | relsent
  | logsent
  | quantsent
  | "?" word
    { $$ = new Variable($2); }
  ;

equation
  : "(=" term term ")"
    { $$ = new Equation($2, $3); }
  ;

relsent
  : "(" relword argument+ ")"
    { $$ = new RelSent($2, $3); }
  ;

logsent
  : "(" "not" sentence ")"
    { $$ = new LogSent('negation', $3); }
  | "(" "and" sentence+ ")"
    { $$ = new LogSent('conjunction', $3); }
  | "(" "or" sentence+ ")"
    { $$ = new LogSent('disjunction', $3); }
  | "(" "=>" sentence sentence ")"
    { $$ = new LogSent('implication', $3, $4); }
  | "(" "<=>" sentence sentence ")"
    { $$ = new LogSent('equivalence', $3, $4); }
  ;

quantsent
  : "(" "forall" "(" variable+ ")" sentence ")"
    { $$ = new QuantSent('universal', $4, $6); }
  | "(" "exists" "(" variable+ ")" sentence ")"
    { $$ = new QuantSent('existential', $4, $6); }
  ;

relword
  : initialchar wordchar*
    { $$ = new RelWord($1 + $2); }
  | variable
    { $$ = new RelWord($1); }
  ;

funword
  : initialchar wordchar*
    { $$ = new FunWord($1 + $2); }
  ;

argument
  : sentence
  | term
  ;

funterm
  : "(" funword argument+ ")"
    { $$ = new FunTerm($2 + $3); }
  ;

variable
  : "?" word
    { $$ = new Variable($2); }
  | "@" word
    { $$ = new RowVariable($2); }
  ;

word
  : initialchar wordchar*
    { $$ = new Word($1 + $2); }
  ;

string
  : '"' character* '"'
    { $$ = new StringLiteral($2); }
  ;

number
  : [-] DIGIT+ [.DIGIT+] [exponent]
    { $$ = new NumberLiteral($2, $1, $3, $4); }
  ;

exponent
  : "e" [-] DIGIT+
    { $$ = new ExponentLiteral($3, $2); }
  ;

wordchar
  : UPPER
  | LOWER
  | DIGIT
  | -
  | _
  ;

initialchar
  : UPPER
  | LOWER
  ;

character
  : UPPER
  | LOWER
  | DIGIT
  | SPECIAL
  | WHITE
  ;

%%

/* Nodes */

function KIFNode(contentArray) {
  this.type = "KIF";
  this.content = contentArray;
}

function Variable(variableName) {
  this.type = "Variable";
  this.name = variableName;
}

function Equation(firstTerm, secondTerm) {
  this.type = "Equation";
  this.firstTerm = firstTerm;
  this.secondTerm = secondTerm;
}

function RelSent() {

}

function LogSent() {

}

function QuantSent() {

}

function RelWord() {

}

function FunWord() {

}

function FunTerm() {

}

function RowVariable() {

}

function Word() {

}

function StringLiteral() {

}

function NumberLiteral() {

}

function ExponentLiteral() {

}
