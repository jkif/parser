/**
 * jKif - 2015
 * truth_tree_sent.js
 * @file TruthTreeSent Constructor
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var TruthTreeBase = require('./truth_tree_base'),
    _ = require('ramda'),
    NODE_TACTUS = 1,
    STEP_TACTUS = 0;


function Node(proposition, idx, rRule) {
  this.line = idx;
  this.checked = false;
  this.proposition = proposition;
  this._id = this.setId();
  this.rRule = rRule || { fromLine: null, name: 'initialSentence' };
}

Node.prototype = {
  constructor: Node,
  registry: {
    'ConjunctionNode': true,
    'DisjunctionNode': true,
    'ImplicationNode': true,
    'EquivalenceNode': true
  }
};


Node.prototype.setId = function() {
  if (this.proposition.type === 'NegationNode') return 'negation';
  else if (this.proposition.type in this.registry) return 'molecule';
  else return NODE_TACTUS++;
};


Node.prototype.decompose = function() {
  switch (_.type(this._id)) {
    case 'Number':
      this.checked = true;
      return [];
      break;
    case 'String':
      if (this._id === 'molecule') {
        var decomposed = this.decomposeMolecule();
        this.checked = true;
        return decomposed;
      } else if (this._id === 'negation') {
        var decomposed = this.decomposeNegation();
        this.checked = true;
        return decomposed;
      }
      break;
    default:
      return;
      break;
  }
};


Node.prototype.decomposeMolecule = function() {
  return ['conjunction', this.proposition.conjuncts];
};


Node.prototype.decomposeNegation = function() {
  return ['negation', this.proposition.negatedExpression];
};


/**
 *
 * @params {Array} kwBase
 * @constructor
 */
function TruthTreeSent(kwBase) {
  TruthTreeBase.call(this);
  this.openStacks[0] = this.cleanTrunk(this.setupTrunk(kwBase));
  this.construct();
}


/**
 *
 * @description prototype setup, constructor cleanup, and method delegation
 */
TruthTreeSent.prototype = Object.create(TruthTreeBase.prototype);
TruthTreeSent.prototype.constructor = TruthTreeSent;
TruthTreeSent.prototype.setupTrunk = setupTrunk;
TruthTreeSent.prototype.construct = construct;
TruthTreeSent.prototype.cleanTrunk = cleanTrunk;
TruthTreeSent.prototype.propCleaner = propCleaner;
TruthTreeSent.prototype.addToAllOpenStacks = addToAllOpenStacks;
TruthTreeSent.prototype.createNegationNode = createNegationNode;
TruthTreeSent.prototype.createConjunctionNode = createConjunctionNode;

/**
 *
 * @public
 * @param {Array} trunk
 * @returns {Array[Node]}
 */
function cleanTrunk(trunk) {
  return _.uniqWith(function(a, b) {
    return _.eq(a.checked, b.checked) && _.eqDeep(a.proposition, b.proposition);
  })(trunk);
}


/**
 *
 * @public
 * @param {Array} kwBase
 * @returns {Array[Node]}
 */
function setupTrunk(kwBase) {
  return kwBase.map(function(proposition) {
    var propEssential = this.propCleaner(proposition);
    return new Node(propEssential, STEP_TACTUS++);
  }.bind(this));
}


/**
 *
 * @public
 * @param {Object} proposition
 * @returns {Object}
 */
function propCleaner(proposition) {
  var memo = {};
  var cleaner = function(propOrList) {
    if (_.has('locationData', propOrList)) delete propOrList['locationData'];
    if (_.type(propOrList) === 'Object') {
      for (var key in propOrList) {
        if (_.type(propOrList[key]) !== 'String') cleaner(propOrList[key]);
      }
    } else if (_.type(propOrList) === 'Array') {
      propOrList.forEach(function(prop) {
        if (_.type(prop) !== 'String') cleaner(prop);
      });
    }
    return _.merge(memo, propOrList);
  };
  return cleaner(proposition);
}


/**
 *
 * @public
 * @returns {undefined}
 */
function construct() {
  for (var key in this.openStacks) {
    var stack = this.openStacks[key];
    stack.forEach(function(node) {
      if (!node.checked) {
        var newNodes = node.decompose();
        var nodeLine = node.line;
        if (newNodes.length) {
          if (newNodes[0] === 'negation') {
            this.addToAllOpenStacks(this.createNegationNode(newNodes[1], nodeLine));
          } else if (newNodes[0] === 'conjunction') {
            newNodes[1].forEach(function(conjunct) {
              this.addToAllOpenStacks(this.createConjunctionNode(conjunct, nodeLine));
            }.bind(this));
          }
        }
      }
    }.bind(this));
  }
}


function createNegationNode(nodeData, rLine) {
  var newNode;
  for (var key in this.openStacks) {
    var stack = this.openStacks[key];
    stack.forEach(function(node) {
      if (_.eqDeep(nodeData, node.proposition)) {
        newNode = new Node(nodeData, STEP_TACTUS++, { fromLine: rLine, name: 'negationDecomposition' });
        newNode.checked = true;
        newNode._id = -node._id;
        NODE_TACTUS++;
        return;
      }
    });
  }
  if (!newNode) {
    newNode = new Node(nodeData, STEP_TACTUS++, { fromLine: rLine, name: 'negationDecomposition' });
    newNode.checked = true;
    NODE_TACTUS++;
  }
  return newNode;
}


function createConjunctionNode(nodeData, rLine) {
  var newNode;
  for (var key in this.openStacks) {
    var stack = this.openStacks[key];
    stack.forEach(function(node) {
      if (_.eqDeep(nodeData, node.proposition)) {
        newNode = new Node(nodeData, STEP_TACTUS++, { fromLine: rLine, name: 'conjunctionDecomposition' });
        newNode.checked = true;
        newNode._id = node._id;
        NODE_TACTUS++;
        return;
      }
    });
  }
  if (!newNode) {
    newNode = new Node(nodeData, STEP_TACTUS++, { fromLine: rLine, name: 'conjunctionDecomposition' });
    this.decomposer(node);
    // newNode.checked = true;
    NODE_TACTUS++;
  }
  return newNode;
}


function decomposer(node) {
  var newNodes = node.decompose();
  var nodeLine = node.line;
  if (newNodes.length) {
    if (newNodes[0] === 'negation') {
      this.addToAllOpenStacks(this.createNegationNode(newNodes[1], nodeLine));
    } else if (newNodes[0] === 'conjunction') {
      newNodes[1].forEach(function(conjunct) {
        this.addToAllOpenStacks(this.createConjunctionNode(conjunct, nodeLine));
      }.bind(this));
    }
  }
}

function addToAllOpenStacks(newNode) {
  for (var key in this.openStacks) {
    var stack = this.openStacks[key];
    stack.push(newNode);
  }
}


// /**
//  *
//  * @public
//  * @returns {Boolean}
//  */
// function isConsistent() {
// }


/**
 *
 * @type {TruthTreeSent}
 */
module.exports = TruthTreeSent;
