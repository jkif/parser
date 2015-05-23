/**
 * jKif Parser - 2015
 * jkif_parser.js
 * @file Lexical and Syntactic Analysis of SUO-KIF via JavaScript
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var fs = require('fs'),
    fsJson = require('jsonfile'),
    p = require('bluebird'),
    jParser = require('jison').Parser,
    grammars = fs.readFileSync(__dirname + '/grammars.jison', 'utf8'),
    Parser = new jParser(grammars);


/**
 *
 * @public
 * @param {String} filePath
 * @param {Function} cb
 */
Parser.parseFile = function(filePath, cb) {
  fs.readFile(filePath, 'utf8', function(err, kif) {
    err ? cb(err) : cb(null, Parser.parse(kif));
  });
};


/**
 *
 * @public
 * @param {String} filePath
 * @param {KIFNode} parsed
 * @param {Function} cb
 */
Parser.writeParsedToFile = function(filePath, parsed, cb) {
  fsJson.writeFile(filePath, parsed, function(err) {
    err ? cb(err) : cb(null);
  });
};


/**
 *
 * @public
 * @param {String} filePath
 */
Parser.parseFileP = p.promisify(Parser.parseFile);


/**
 *
 * @public
 * @param {String} filePath
 * @param {KIFNode} parsed
 */
Parser.writeParsedToFileP = p.promisify(Parser.writeParsedToFile);


/**
 *
 * @public
 * @type {Parser}
 */
module.exports = Parser;
