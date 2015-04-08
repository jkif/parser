/**
 * jKif - 2015
 * jkif.js
 * @file Global jKif object with Parser and Utility Modules
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var jKif = {
  Parser: require('./parser'),
  Utility: require('./utility'),
  Thinker: require('./thinker')
};


/**
 *
 * @type {{Parser: (jKifParser|exports), Utility: (jKifUtility|exports), Thinker: (jKifThinker|exports)}}
 */
module.exports = jKif;
