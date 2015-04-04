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


jKifParser.writeParsedToFile = function(parsed, filePath, encoding) {
  if (encoding === 'json' || !encoding) {
    fsJson.writeFile(filePath, parsed, function(err) {
      return err ? false : true;
    });
  }
};


module.exports = jKifParser;
