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
    Node = nodeMod.NodeSent;


/**
 *
 * @public
 * @params {Array} kwBase
 * @constructor
 */
function TruthTreeSent(kwBase) {
  TruthTreeBase.call(this);
  this.STEP_TACTUS = 1;
  this.OPEN_STACK_TACTUS = 0;
  this.CLOSED_STACK_TACTUS = 0;
  this.openStacks[this.OPEN_STACK_TACTUS++] = this.cleanTrunk(this.setupTrunk(kwBase));
  this.constructAndInspect();
}


/**
 *
 * @public
 */
function constructAndInspect() {
  this.eachOpenStack(this.constructFromStack.bind(this));
  this.eachOpenStack(this.constructionInspector.bind(this));
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
 * @params {Array} stack
 */
function constructionInspector(stack) {
  var closed = false, allReduced = false;
  while (!allReduced && !closed) {
    if (this.filterUncheckedStack(stack).length) this.constructAndInspect();
    closed = this.isClosed(stack);
    allReduced = stack.reduce(this.stackReducer.bind(this), true);
  }
}


/**
 *
 * @public
 * @params {Object} node
 */
function deconstructNode(node) {
  if (!node.checked) {
    var newNode = node.decompose(), newNodeType = newNode[0], newNodeContent = newNode[1];
    if (this.checkOpenStacks()) return;
    if (newNode.length) {
      switch (newNodeType) {
        case 'negation':
          var negationReturn = this.createNegationNode(newNodeContent, node.line);
          var stackTest = _.contains(negationReturn[0])(['negatedDisjunction', 'negatedImplication', 'negatedRelSent']);
          var singleBranchTest = _.contains(negationReturn[0])(['negatedConjunction']);
          var doubleBranchTest = _.contains(negationReturn[0])(['negatedEquivalence']);;
          if (stackTest) {
            this.addToAllOpenStacks(negationReturn.slice(1));
          } else if (singleBranchTest) {
            var leftBranch = negationReturn.slice(1, 3), rightBranch = negationReturn.slice(1);
            rightBranch.splice(1, 1);
            var clonedStacks = this.cloneAllOpenStacks();
            this.addToAllOpenStacks(leftBranch);
            this.addNodesToAllClonedStacks(clonedStacks, rightBranch);
            this.addAllClonedStacksToOpenStacks(clonedStacks);
          } else if (doubleBranchTest) {
          }
          break;
        case 'conjunction':
          this.addToAllOpenStacks(this.createConjunctionNodes(newNodeContent, node.line));
          break;
        case 'disjunction':
          this.manageBranchingStacks(this.createDisjunctionNodes(newNodeContent, node.line));
          break;
        case 'implication':
          this.manageBranchingStacks(this.createImplicationNodes(newNodeContent, node.line));
          break;
        case 'equivalence':
          this.manageBranchingDoubleStacks(this.createEquivalenceNodes(newNodeContent, node.line));
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
 * @params {Array} nodesToAdd
 */
function manageBranchingStacks(nodesToAdd) {
  var clonedStacks = this.cloneAllOpenStacks();
  this.addToAllOpenStacks([nodesToAdd[0]]);
  this.addNodeToAllClonedStacks(clonedStacks, nodesToAdd[1]);
  this.addAllClonedStacksToOpenStacks(clonedStacks);
}


/**
 *
 * @public
 * @params {Array} branchingNodes
 */
function manageBranchingDoubleStacks(branchingNodes) {
  var clonedStacks = this.cloneAllOpenStacks();
  this.addToAllOpenStacks(branchingNodes[0]);
  this.addNodeToAllClonedStacks(clonedStacks, branchingNodes[1][0]);
  this.addNodeToAllClonedStacks(clonedStacks, branchingNodes[1][1]);
  this.addAllClonedStacksToOpenStacks(clonedStacks);
}


/**
 *
 * @public
 * @params {Array} clonedStacks
 * @params {NodeSent} node
 */
function addNodeToAllClonedStacks(clonedStacks, node) {
  clonedStacks.forEach(function(clonedStack) {
    clonedStack.push(node);
  });
}


/**
 *
 * @public
 * @params {Array} clonedStacks
 * @params {Array} nodes
 */
function addNodesToAllClonedStacks(clonedStacks, nodes) {
  nodes.forEach(function(node) {
    clonedStacks.forEach(function(clonedStack) {
      clonedStack.push(node);
    });
  });
}


/**
 *
 * @public
 * @params {Array} clonedStacks
 */
function addAllClonedStacksToOpenStacks(clonedStacks) {
  clonedStacks.forEach(function(clonedStack) {
    this.openStacks[this.OPEN_STACK_TACTUS++] = clonedStack;
  }.bind(this));
}


/**
 *
 * @public
 * @params {Boolean} allChecked
 * @params {NodeSent} node
 * @returns {Array}
 */
function stackReducer(allChecked, node) {
  return allChecked && node.checked;
}


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
  return new Node(this.propCleaner(proposition), this.STEP_TACTUS++);
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
  this.continueCleaning(propOrList, memo);
  return _.merge(memo, propOrList);
}


/**
 *
 * @public
 * @params {Object|Array} propOrList
 */
function continueCleaning(propOrList, memo) {
  if (_.type(propOrList) === 'Array') {
    propOrList.forEach(this.cleanDeep.bind(this, memo));
  } else if (_.type(propOrList) === 'Object') {
    for (var key in propOrList) this.cleanDeep(memo, propOrList[key]);
  }
}


/**
 *
 * @public
 * @params {Object|Array} propOrList
 */
function cleanDeep(memo, propOrList) {
  if (_.type(propOrList) !== 'String') this.recursiveClean(propOrList, memo);
}


/**
 *
 * @public
 */
function checkOpenStacks() {
  this.eachOpenStack(this.manageStack.bind(this));
  if (this.isTreeDead()) return true;
}


/**
 *
 * @public
 * @params {Array} stack
 * @params {String} key
 */
function moveStack(stack, key) {
  this.closedStacks[this.CLOSED_STACK_TACTUS++] = stack;
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
  return nodeId > 0 ? _.contains(-nodeId)(ids) : _.contains(Math.abs(nodeId))(ids);
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
 * @params {Array} stack
 * @returns {Array}
 */
function filterUncheckedStack(stack) {
  return _.pluck('checked')(_.filter(function(prop) { return !prop.checked; }, stack));
}


/**
 *
 * @public
 * @params {Object} nodeData
 * @params {Number} rLine
 * @returns {Array}
 */
function createNegationNode(nodeData, rLine) {
  var newNodes = [];
  switch (nodeData.type) {
    case 'DisjunctionNode':
      newNodes.push('negatedDisjunction');
      var newDisjunctionNode = new Node(nodeData, this.STEP_TACTUS++, { fromLine: rLine, name: 'negatedDisjunctionDecomposition' });
      var newDisjunctNodeA = new Node(newDisjunctionNode.proposition.disjuncts[0], this.STEP_TACTUS++, { fromLine: rLine, name: 'negatedDisjunctionDecomposition' });
      var newDisjunctNodeB = new Node(newDisjunctionNode.proposition.disjuncts[1], this.STEP_TACTUS++, { fromLine: rLine, name: 'negatedDisjunctionDecomposition' });
      newDisjunctionNode.checked = true;
      newNodes.push(newDisjunctionNode, newDisjunctNodeA, newDisjunctNodeB);
      var matchedA = false, matchedB = false;
      this.eachOpenStack(function(stack) {
        stack.forEach(function(node) {
          if (_.eqDeep(newDisjunctNodeA.proposition, node.proposition)) {
            newNodes[2]._id = node._id > 0 ? -node._id : Math.abs(node._id);
          }
          if (_.eqDeep(newDisjunctNodeB.proposition, node.proposition)) {
            newNodes[3]._id = node._id > 0 ? -node._id : Math.abs(node._id);
          }
        });
      });
      if (!matchedA) newNodes[2]._id = -(Math.abs(newDisjunctNodeA._id));
      if (!matchedB) newNodes[3]._id = -(Math.abs(newDisjunctNodeB._id));
      return newNodes;
      break;
    case 'ConjunctionNode':
      newNodes.push('negatedConjunction');
      var newConjunctionNode = new Node(nodeData, this.STEP_TACTUS++, { fromLine: rLine, name: 'negatedConjunctionDecomposition' });
      var newConjunctNodeA = new Node(newConjunctionNode.proposition.conjuncts[0], this.STEP_TACTUS++, { fromLine: rLine, name: 'negatedConjunctionDecomposition' });
      var newConjunctNodeB = new Node(newConjunctionNode.proposition.conjuncts[1], this.STEP_TACTUS++, { fromLine: rLine, name: 'negatedConjunctionDecomposition' });
      newConjunctionNode.checked = true;
      newNodes.push(newConjunctionNode, newConjunctNodeA, newConjunctNodeB);
      var matchedA = false, matchedB = false;
      this.eachOpenStack(function(stack) {
        stack.forEach(function(node) {
          if (_.eqDeep(newConjunctNodeA.proposition, node.proposition)) {
            newNodes[2]._id = node._id > 0 ? -node._id : Math.abs(node._id);
          }
          if (_.eqDeep(newConjunctNodeB.proposition, node.proposition)) {
            newNodes[3]._id = node._id > 0 ? -node._id : Math.abs(node._id);
          }
        });
      });
      if (!matchedA) newNodes[2]._id = -(Math.abs(newConjunctNodeA._id));
      if (!matchedB) newNodes[3]._id = -(Math.abs(newConjunctNodeB._id));
      newNodes[3].line -= 1;
      return newNodes;
      break;
    default:
      newNodes.push('negatedRelSent');
      var newNegatedNode = new Node(nodeData, this.STEP_TACTUS++, { fromLine: rLine, name: 'negationDecomposition' });
      var matched = false;
      newNodes.push(newNegatedNode);
      this.eachOpenStack(function(stack) {
        stack.forEach(function(node) {
          if (_.eqDeep(newNegatedNode.proposition, node.proposition)) {
            newNodes[1]._id = node._id > 0 ? -node._id : Math.abs(node._id);
            matched = true;
          }
        });
      });
      if (!matched) newNodes[1]._id = -(Math.abs(newNegatedNode._id));
      return newNodes;
      break;
  }
}


/**
 *
 * @public
 * @params {Object} nodeData
 * @params {Number} rLine
 * @returns {Array}
 */
function createConjunctionNodes(nodeData, rLine) {
  var rRule = { fromLine: rLine, name: 'conjunctionDecomposition' };
  return [new Node(nodeData[0], this.STEP_TACTUS++, rRule), new Node(nodeData[1], this.STEP_TACTUS++, rRule)];
}


/**
 *
 * @public
 * @params {Object} nodeData
 * @params {Number} rLine
 * @returns {Array}
 */
function createDisjunctionNodes(nodeData, rLine) {
  var rRule = { fromLine: rLine, name: 'disjunctionDecomposition' };
  var nodeA = new Node(nodeData[0], this.STEP_TACTUS++, rRule);
  var nodeB = new Node(nodeData[1], this.STEP_TACTUS++, rRule);
  nodeB.line -= 1;
  return [nodeA, nodeB];
}


/**
 *
 * @public
 * @params {Object} nodeData
 * @params {Number} rLine
 * @returns {Array}
 */
function createImplicationNodes(nodeData, rLine) {
  var rRule = { fromLine: rLine, name: 'implicationDecomposition' };
  var tuple = [new Node(nodeData[0], this.STEP_TACTUS++, rRule), new Node(nodeData[1], this.STEP_TACTUS++, rRule)];
  tuple[1].line -= 1;
  var matched = false;
  var antecedent = tuple[0];
  this.eachOpenStack(function(stack) {
    stack.forEach(function(node) {
      if (_.eqDeep(antecedent.proposition, node.proposition)) {
        antecedent._id = -(Math.abs(node._id));
        matched = true;
      }
    });
  });
  if (!matched) {
    tuple[0]._id = -(Math.abs(antecedent._id));
  }
  return tuple;
}


/**
 *
 * @public
 * @params {Object} nodeData
 * @params {Number} rLine
 * @returns {Array}
 */
function createEquivalenceNodes(nodeData, rLine) {
  var rRule = { fromLine: rLine, name: 'equivalenceDecomposition' };
  var firstLeft = new Node(nodeData[0], this.STEP_TACTUS, rRule);
  var firstRight = new Node(nodeData[0], this.STEP_TACTUS++, rRule);
  var secondLeft = new Node(nodeData[1], this.STEP_TACTUS, rRule);
  var secondRight = new Node(nodeData[1], this.STEP_TACTUS, rRule);
  var leftTuple = [firstLeft, secondLeft], rightTuple = [firstRight, secondRight];
  var matchedFirst = false, matchedSecond = false;
  this.eachOpenStack(function(stack) {
    stack.forEach(function(node) {
      if (_.eqDeep(firstRight.proposition, node.proposition)) {
        firstRight._id =  -(Math.abs(node._id));
        matchedFirst = true;
      } else if (_.eqDeep(secondRight.proposition, node.proposition)) {
        secondRight._id = -(Math.abs(node._id));
        matchedSecond = true;
      }
    });
  });
  if (!matchedFirst) rightTuple[0]._id = -(Math.abs(firstRight._id));
  if (!matchedSecond) rightTuple[1]._id = -(Math.abs(secondRight._id));
  return [leftTuple, rightTuple];
}


/**
 *
 * @public
 * @params {Node} newNode
 */
function addToAllOpenStacks(newNodeOrNodes) {
  newNodeOrNodes.forEach(function(newNode) {
    this.eachOpenStack(function(stack) {
      stack.push(newNode);
    });
  }.bind(this));
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
 * @public
 * @returns {Array}
 */
function cloneAllOpenStacks() {
  var clonedStacks = [];
  this.eachOpenStack(function(openStack) {
    var clonedStack = openStack.map(function(node) {
      return _.merge(node, {});
    });
    clonedStacks.push(clonedStack);
  });
  return clonedStacks;
}


/**
 *
 * @description prototype setup, constructor cleanup, and method delegation
 */
TruthTreeSent.prototype = Object.create(TruthTreeBase.prototype);
TruthTreeSent.prototype.constructor = TruthTreeSent;
TruthTreeSent.prototype.setupTrunk = setupTrunk;
TruthTreeSent.prototype.createGenericNode = createGenericNode;
TruthTreeSent.prototype.constructAndInspect = constructAndInspect;
TruthTreeSent.prototype.constructionInspector = constructionInspector;
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
TruthTreeSent.prototype.createConjunctionNodes = createConjunctionNodes;
TruthTreeSent.prototype.createDisjunctionNodes = createDisjunctionNodes;
TruthTreeSent.prototype.createImplicationNodes = createImplicationNodes;
TruthTreeSent.prototype.createEquivalenceNodes = createEquivalenceNodes;
TruthTreeSent.prototype.checkOpenStacks = checkOpenStacks;
TruthTreeSent.prototype.filterUncheckedStack = filterUncheckedStack;
TruthTreeSent.prototype.isClosed = isClosed;
TruthTreeSent.prototype.isTreeDead = isTreeDead;
TruthTreeSent.prototype.isReduced = isReduced;
TruthTreeSent.prototype.stackReducer = stackReducer;
TruthTreeSent.prototype.isContradiction = isContradiction;
TruthTreeSent.prototype.eachOpenStack = eachOpenStack;
TruthTreeSent.prototype.moveStack = moveStack;
TruthTreeSent.prototype.manageStack = manageStack;
TruthTreeSent.prototype.manageBranchingStacks = manageBranchingStacks;
TruthTreeSent.prototype.manageBranchingDoubleStacks = manageBranchingDoubleStacks;
TruthTreeSent.prototype.cloneAllOpenStacks = cloneAllOpenStacks;
TruthTreeSent.prototype.addNodeToAllClonedStacks = addNodeToAllClonedStacks;
TruthTreeSent.prototype.addNodesToAllClonedStacks = addNodesToAllClonedStacks;
TruthTreeSent.prototype.addAllClonedStacksToOpenStacks = addAllClonedStacksToOpenStacks;


/**
 *
 * @type {TruthTreeSent}
 */
module.exports = TruthTreeSent;
