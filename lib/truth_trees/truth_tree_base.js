/**
 * jKif - 2015
 * truth_tree_base.js
 * @file Base TruthTree Constructor which all TruthTrees call up to on initialization
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


/**
 *
 * @params {Array} kwBase
 * @constructor
 */
function TruthTreeBase(kwBase) {
  this.kwBase = kwBase || [];
}





TruthTreeBase.prototype = {
  constructor: TruthTreeBase,
  isConsistent: function() {}
};


/**
 *
 * @type {TruthTreeBase}
 */
module.exports = TruthTreeBase;
