var fs = require('fs'),
    Parser = require('jison').Parser,
    grammars = fs.readFileSync(__dirname + '/grammars.jison', 'utf8'),
    jKifParser = new Parser(grammars),
    jKif = { Parser: jKifParser };

module.exports = jKif;
