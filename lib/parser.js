/**
 * jKif - 2015
 * parser.js
 * jKif.Parser
 * @file Lexical and Syntactic Analysis of SUO-KIF via JavaScript
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var fs = require('fs'),
    fsJson = require('jsonfile'),
    p = require('bluebird'),
    Parser = require('jison').Parser,
    grammars = fs.readFileSync(__dirname + '/grammars.jison', 'utf8'),
    jKifParser = new Parser(grammars);


/**
 *
 * @public
 * @param {String} filePath
 * @param {Function} cb
 */
jKifParser.parseFile = function(filePath, cb) {
  fs.readFile(filePath, 'utf8', function(err, kif) {
    err ? cb(err) : cb(null, jKifParser.parse(kif));
  });
};


/**
 *
 * @public
 * @param {String} filePath
 * @param {KIFNode} parsed
 * @param {Function} cb
 */
jKifParser.writeParsedToFile = function(filePath, parsed, cb) {
  fsJson.writeFile(filePath, parsed, function(err) {
    err ? cb(err) : cb(null);
  });
};


/**
 *
 * @public
 * @param {String} filePath
 */
jKifParser.parseFileP = p.promisify(jKifParser.parseFile);


/**
 *
 * @public
 * @param {String} filePath
 * @param {KIFNode} parsed
 */
jKifParser.writeParsedToFileP = p.promisify(jKifParser.writeParsedToFile);


/**
 *
 * @public
 * @type {Parser}
 */
module.exports = jKifParser;
