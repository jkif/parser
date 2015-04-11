/**
 * jKif - 2015
 * truth_tree_sent.js
 * @file TruthTreeSent Constructor
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var TruthTreeBase = require('./truth_tree_base'),
    moleculeRegistry = {
      'NegationNode': true,
      'ConjunctionNode': true,
      'DisjunctionNode': true,
      'ImplicationNode': true,
      'EquivalenceNode': true
    };


/**
 *
 * @params {Array} kwBase
 * @constructor
 */
function TruthTreeSent(kwBase) {
  TruthTreeBase.call(this, kwBase);
  this.tree = constructTree(kwBase);
}


/**
 *
 * @description prototype setup, constructor cleanup, and method delegation
 */
TruthTreeSent.prototype = Object.create(TruthTreeBase.prototype);
TruthTreeSent.prototype.constructor = TruthTreeSent;
TruthTreeSent.prototype.isConsistent = isConsistent;


/**
 *
 * @public
 * @returns {Boolean}
 */
function isConsistent() {
  return consistentTree(this.tree);
}


/**
 *
 * @private
 * @param {Array} kwBase
 * @returns {Object}
 */
function constructTree(kwBase) {
  var tree = {};
  tree.trunk = kwBase.slice();
  tree.paths = { open: [], closed: [] };
  tree.stepCount = tree.stepCount || 0;
  tree.propMap = {};
  return decompose(tree);
}


function checkPropsEquality(propA, propB) {
  if (Array.isArray(propA)) {
    for (var i = 0; i < propA.length; i++) {
      var item = propA[i];
      if (item instanceof Object || Array.isArray(item)) {
        if (!(propB[i])) return false;
        if (!checkPropsEquality(item, propB[i])) return false;
      } else {
        if (item != propB[i]) {
          return false;
        }
      }
    }
  } else if (propA instanceof Object) {
    for (var key in propA) {
      if (key == 'locationData') {
      } else {
        var item = propA[key];
        if (item instanceof Object || Array.isArray(item)) {
          if (!(propB[key])) return false;
          if (!checkPropsEquality(item, propB[key])) return false;
        } else {
          if (item != propB[key]) {
            return false;
          }
        }
      }
    }
  }
  return true;
}


function assignSymbol(prop, tree) {
  var map = tree.propMap, found;
  // if (!(Object.keys(map).length)) {
    switch (prop.type) {
      case 'NegationNode':
        map[++tree.stepCount] = { prop: prop.negatedExpression, truthValue: false };
        break;
      case 'RelSentNode':
        map[++tree.stepCount] = { prop: prop, truthValue: true };
        break;
    }
  // } else {
    for (var symbol in map) {
      if (map.hasOwnProperty(symbol)) {
        var oldProp = map[symbol];
        switch (prop.type) {
          case 'RelSentNode':
            found = checkPropsEquality(oldProp.prop, prop);
            if (found) {
              map[symbol] = { prop: prop, truthValue: oldProp.truthValue };
            } else {
              map[++tree.stepCount] = { prop: prop, truthValue: true };
            }
            break;
          case 'NegationNode':
            found = checkPropsEquality(oldProp.prop, prop.negatedExpression);
            if (found) {
              map[-symbol] = { prop: prop, truthValue: !oldProp.truthValue };
            } else {
              map[++tree.stepCount] = { prop: prop.negatedExpression, truthValue: false };
            }
            break;
        }
      }
    }
  // }
}


function decompose(tree) {
  tree.trunk.forEach(function(prop) {
    assignSymbol(prop, tree);
  });
  console.log(tree.propMap);
  return tree;
}


/**
 *
 * @private
 * @param {Object} tree
 * @returns {Boolean}
 */
function consistentTree(tree) {
  // return inconsistent or consistent
  return tree; // for testing
}


/**
 *
 * @type {TruthTreeSent}
 */
module.exports = TruthTreeSent;
