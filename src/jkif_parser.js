var fs = require('fs'),
    Parser = require('jison').Parser,
    fsJson = require('jsonfile'),
    grammars = fs.readFileSync(__dirname + '/grammars.jison', 'utf8'),
    jKifParser = new Parser(grammars);


jKifParser.parseFile = function(filePath, cb) {
  fs.readFile(filePath, 'utf8', function(err, kif) {
    err ? cb(err) : cb(null, jKifParser.parse(kif));
  });
};


jKifParser.parseFileP = function() {

};


jKifParser.writeParsedToFileP = function() {

};


jKifParser.writeParsedToFile = function(filePath, parsed, cb) {
  fsJson.writeFile(filePath, parsed, function(err) {
    err ? cb(false) : cb(true);
  });
};


module.exports = jKifParser;
