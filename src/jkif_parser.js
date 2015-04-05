var fs = require('fs'),
    fsJson = require('jsonfile'),
    p = require('bluebird'),
    Parser = require('jison').Parser,
    grammars = fs.readFileSync(__dirname + '/grammars.jison', 'utf8'),
    jKifParser = new Parser(grammars);


jKifParser.parseFile = function(filePath, cb) {
  fs.readFile(filePath, 'utf8', function(err, kif) {
    err ? cb(err) : cb(null, jKifParser.parse(kif));
  });
};


jKifParser.writeParsedToFile = function(filePath, parsed, cb) {
  fsJson.writeFile(filePath, parsed, function(err) {
    err ? cb(err) : cb(null);
  });
};


jKifParser.parseFileP = p.promisify(jKifParser.parseFile);


jKifParser.writeParsedToFileP = p.promisify(jKifParser.writeParsedToFile);


module.exports = jKifParser;
