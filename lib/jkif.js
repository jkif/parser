/**
 * jKif - 2015
 * jkif.js
 * @file Global jKif object with Parser and Utility Modules
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var jKif = {
  Parser: require('./jkif_parser'),
  Utility: require('./jkif_utility')
};


/**
 *
 * @type {{Parser: (jKifParser|exports), Utility: (jKifUtility|exports)}}
 */
module.exports = jKif;
