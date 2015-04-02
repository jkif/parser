var fs = require('fs'),
    Parser = require('jison').Parser,
    jKif = {},
    grammars = fs.readFileSync(__dirname + '/grammars.jison', 'utf8');

jKif.Parser = new Parser(grammars);

module.exports = jKif;
