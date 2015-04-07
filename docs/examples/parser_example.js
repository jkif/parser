var fs = require('fs'),
    path = require('path'),
    fsJson = require('jsonfile'),
    jKif = require('../../lib/jkif'),
    ast = require('../../lib/ast_constructors/ast_constructors'),
    kifFile = fs.readFileSync(path.resolve(__dirname +
    '/farmer_tractor.kif'), 'utf8'), // change the input kif file
    parsed = jKif.Parser.parse(kifFile);


fsJson.writeFile(path.resolve(__dirname + '/farmer_tractor.json'), parsed, 'utf8');
