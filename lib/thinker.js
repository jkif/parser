/**
 * jKif - 2015
 * thinker.js
 * jKif.Thinker
 * @file Logical Analysis of SUO-KIF via JavaScript
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var ast = require('./ast_constructors/ast_constructors'),
    jkifUtil = require('./utility'),
    tt = require('./truth_trees/truth_trees');


/**
 *
 * @public
 * @param {Array} kwBase
 * @returns {Boolean}
 */
function isConsistent(kwBase) {
  var truthForest = new tt.TruthTreePred(kwBase);
  return truthForest.isConsistent();
}


/**
 *
 * @public
 * @param {Array} kwBase
 * @returns {Boolean}
 */
function isConsistentSentential(kwBase) {
  var truthForest = new tt.TruthTreeSent(kwBase);
  return truthForest.isConsistent();
}


/**
 *
 * @public
 * @type {Object} jKif.Thinker
 * {Function} jKif.Thinker.isConsistent
 * {Function} jKif.Thinker.isConsistentSentential
 */
var jKifThinker = {
  isConsistent: isConsistent,
  isConsistentSentential: isConsistentSentential
};


/**
 *
 * @type {Object} jKifThinker
 */
module.exports = jKifThinker;
