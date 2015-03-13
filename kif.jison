/* Parses SUO-KIF into JavaScript Objects */

%lex
%%
[A-Z]                               { return 'UPPER'; }
[a-z]                               { return 'LOWER'; }
[0-9]                               { return 'DIGIT'; }
[\!\$\%\&\*\+\-\.\/\<\=\>\?\@\_\~]  { return 'SPECIAL'; }
\s+                                 { return 'WHITE'; }
<<EOF>>                             { return 'EOF'; }
/lex


/* operator associations and precedence */
%left
%right


/* BNF Grammar */
%%

kif
  : contents EOF
    { return $1; }
  ;

contents
  : content
    { $$ = $1; }
  | contents content
    { $$ =  $1 + $2; }
  ;

content
  : term
    { $$ = $1; }
  | content term
    { $$ = $1 + $2; }

term
  : sentence
    {}
  | funterm
    {}
  | variable
    {}
  | word
    {}
  | string
    {}
  | number
    {}
  ;

sentence
  : word
    {}
  | equation
    {}
  | relsent
    {}
  | logsent
    {}
  | quantsent
    {}
  | ?word
    {}
  ;

equation
  : (= term term)
    {}
  ;

relsent
  : (relword argument+)
    {}
  ;

logsent
  : (not sentence)
    {}
  | (and sentence+)
    {}
  | (or sentence+)
    {}
  | (=> sentence sentence)
    {}
  | (<=> sentence sentence)
    {}
  ;

quantsent
  : (forall (variable+) sentence)
    {}
  | (exists (variable+) sentence)
    {}
  ;

relword
  : initialchar wordchar*
    {}
  | variable
    {}
  ;

funword
  : initialchar wordchar*
    {}
  ;

argument
  : sentence
    {}
  | term
    {}
  ;

funterm
  : (funword argument+)
    {}
  ;

variable
  : ?word
    {}
  | @word
    {}
  ;

word
  : initialchar wordchar*
    {}
  ;

string
  : "character*"
    {}
  ;

number
  : [-] DIGIT+ [. DIGIT+][exponent]
    {}
  ;

exponent
  : e [-] DIGIT+
    {}
  ;

wordchar
  : UPPER
    { $$ = yytext; }
  | LOWER
    { $$ = yytext; }
  | DIGIT
    { $$ = yytext; }
  | -
    { $$ = yytext; }
  | _
    { $$ = yytext; }
  ;

initialchar
  : UPPER
    { $$ = yytext; }
  | LOWER
    { $$ = yytext; }
  ;

character
  : UPPER
    { $$ = yytext; }
  | LOWER
    { $$ = yytext; }
  | DIGIT
    { $$ = yytext; }
  | SPECIAL
    { $$ = yytext; }
  | WHITE
    { $$ = yytext; }
  ;

%%

/* Nodes */