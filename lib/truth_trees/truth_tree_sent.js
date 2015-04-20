/**
 * jKif - 2015
 * truth_tree_sent.js
 * @file TruthTreeSent Constructor
 * @author Clark Feusier - cfeusier@gmail.com
 * @copyright Copyright (C) Clark Feusier - All Rights Reserved
 */


var TruthTreeBase = require('./truth_tree_base'),
    _ = require('ramda'),
    nodeMod = require('./nodes/node_sent'),
    Node = nodeMod.NodeSent,
    NODE_TACTUS = nodeMod.NODE_TACTUS,
    STEP_TACTUS = 0,
    OPEN_STACK_TACTUS = 0,
    CLOSED_STACK_TACTUS = 0;


/**
 *
 * @public
 * @params {Array} kwBase
 * @constructor
 */
function TruthTreeSent(kwBase) {
  TruthTreeBase.call(this);
  this.openStacks[OPEN_STACK_TACTUS++] = this.cleanTrunk(this.setupTrunk(kwBase));
  this.construct();
}


/**
 *
 * @description prototype setup, constructor cleanup, and method delegation
 */
TruthTreeSent.prototype = Object.create(TruthTreeBase.prototype);
TruthTreeSent.prototype.constructor = TruthTreeSent;
TruthTreeSent.prototype.setupTrunk = setupTrunk;
TruthTreeSent.prototype.createGenericNode = createGenericNode;
TruthTreeSent.prototype.construct = construct;
TruthTreeSent.prototype.constructFromStack = constructFromStack;
TruthTreeSent.prototype.deconstructNode = deconstructNode;
TruthTreeSent.prototype.cleanTrunk = cleanTrunk;
TruthTreeSent.prototype.recursiveClean = recursiveClean;
TruthTreeSent.prototype.cleanDeep = cleanDeep;
TruthTreeSent.prototype.continueCleaning = continueCleaning;
TruthTreeSent.prototype.compareNodes = compareNodes;
TruthTreeSent.prototype.propCleaner = propCleaner;
TruthTreeSent.prototype.addToAllOpenStacks = addToAllOpenStacks;
TruthTreeSent.prototype.createNegationNode = createNegationNode;
TruthTreeSent.prototype.checkOpenStacks = checkOpenStacks;
TruthTreeSent.prototype.isClosed = isClosed;
TruthTreeSent.prototype.isTreeDead = isTreeDead;
TruthTreeSent.prototype.isReduced = isReduced;
TruthTreeSent.prototype.isContradiction = isContradiction;
TruthTreeSent.prototype.eachOpenStack = eachOpenStack;
TruthTreeSent.prototype.moveStack = moveStack;
TruthTreeSent.prototype.manageStack = manageStack;


/**
 *
 * @public
 * @params {Array} trunk
 * @returns {Array[Node]}
 */
function cleanTrunk(trunk) {
  return _.uniqWith(this.compareNodes)(trunk);
}


/**
 *
 * @public
 * @params {Object} nodeA
 * @params {Object} nodeB
 * @returns {Boolean}
 */
function compareNodes(nodeA, nodeB) {
  return _.eq(nodeA.checked, nodeB.checked) && _.eqDeep(nodeA.proposition, nodeB.proposition);
}


/**
 *
 * @public
 * @params {Array} kwBase
 * @returns {Array[Node]}
 */
function setupTrunk(kwBase) {
  return kwBase.map(this.createGenericNode.bind(this));
}


/**
 *
 * @public
 * @params {Object} proposition
 * @returns {Node}
 */
function createGenericNode(proposition) {
  return new Node(this.propCleaner(proposition), STEP_TACTUS++);
}


/**
 *
 * @public
 * @params {Object} proposition
 * @returns {Object}
 */
function propCleaner(proposition) {
  return this.recursiveClean(proposition, {});
}


/**
 *
 * @public
 * @params {Object|Array} propOrList
 * @params {Object} memo
 * @returns {Object}
 */
function recursiveClean(propOrList, memo) {
  if (_.has('locationData', propOrList)) delete propOrList['locationData'];
  this.continueCleaning(propOrList);
  return _.merge(memo, propOrList);
}


/**
 *
 * @public
 * @params {Object|Array} propOrList
 */
function continueCleaning(propOrList) {
  if (_.type(propOrList) === 'Array') {
    propOrList.forEach(this.cleanDeep.bind(this));
  } else if (_.type(propOrList) === 'Object') {
    for (var key in propOrList) this.cleanDeep(propOrList[key]);
  }
}


/**
 *
 * @public
 * @params {Object|Array} propOrList
 */
function cleanDeep(propOrList) {
  if (_.type(propOrList) !== 'String') this.recursiveClean(propOrList);
}


/**
 *
 * @public
 */
function checkOpenStacks() {
  this.eachOpenStack(this.manageStack.bind(this));
}


/**
 *
 * @public
 * @params {Array} stack
 * @params {String} key
 */
function moveStack(stack, key) {
  this.closedStacks[CLOSED_STACK_TACTUS++] = stack;
  delete this.openStacks[key];
}


/**
 *
 * @public
 * @params {Array} stack
 * @params {String} key
 */
function manageStack(stack, key) {
  if (this.isClosed(stack)) this.moveStack(stack, key);
}


/**
 *
 * @public
 * @param {Array} stack
 * @returns {Boolean}
 */
function isClosed(stack) {
  var ids = _.pluck('_id')(_.filter(this.isReduced, stack));
  return _.reduce(this.isContradiction.bind(this, ids), false, ids);
}


/**
 *
 * @public
 * @param {Array} ids
 * @param {Boolean} terminated
 * @param {Number} nodeId
 * @returns {Boolean}
 */
function isContradiction(ids, terminated, nodeId) {
  return nodeId > 0 ? _.contains(-nodeId)(ids) : _.contains(nodeId)(ids);
}


/**
 *
 * @public
 * @param {Node} node
 * @returns {Boolean}
 */
function isReduced(node) {
  return node.checked && _.type(node._id) === 'Number';
}


/**
 *
 * @public
 * @returns {Boolean}
 */
function isTreeDead() {
  return Object.keys(this.openStacks).length === 0;
}


/**
 *
 * @public
 */
function construct() {
  this.eachOpenStack(this.constructFromStack.bind(this));
}


/**
 *
 * @public
 * @params {Array} stack
 */
function constructFromStack(stack) {
  stack.forEach(this.deconstructNode.bind(this));
}


/**
 *
 * @public
 * @params {Object} node
 */
function deconstructNode(node) {
  if (!node.checked || node._id === 'molecule') {
    var newNodes = node.decompose();
    this.checkOpenStacks();
    if (this.isTreeDead()) return;
    if (newNodes.length) {
      switch (newNodes[0]) {
        case 'negation':
          this.addToAllOpenStacks(this.createNegationNode(newNodes[1], node.line));
          this.checkOpenStacks();
          if (this.isTreeDead()) return;
          break;
        case 'conjunction':
          break;
        case 'disjunction':
          break;
        case 'implication':
          break;
        case 'equivalence':
          break;
        default:
          break;
      }
    }
  }
}


/**
 *
 * @public
 * @params {Object} nodeData
 * @params {Number} rLine
 * @returns {Node}
 */
function createNegationNode(nodeData, rLine) {
  var newNode = new Node(nodeData, STEP_TACTUS++, { fromLine: rLine, name: 'negationDecomposition' });
  this.eachOpenStack(function(stack) {
    stack.forEach(function(node) {
      if (_.eqDeep(nodeData, node.proposition)) newNode._id = -node._id;
    });
  });
  newNode.checked = true;
  NODE_TACTUS++;
  return newNode;
}


/**
 *
 * @public
 * @params {Node} newNode
 */
function addToAllOpenStacks(newNode) {
  this.eachOpenStack(function(stack) {
    stack.push(newNode);
  });
}


/**
 *
 * @public
 * @params {Function} cb
 */
function eachOpenStack(cb) {
  for (var key in this.openStacks) {
    cb(this.openStacks[key], key);
  }
}


/**
 *
 * @type {TruthTreeSent}
 */
module.exports = TruthTreeSent;
