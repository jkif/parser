var BaseNode = require('./ast_constructor_base');


function WordNode(locationData, identifier) {
  BaseNode.call(this, 'WordNode', locationData);
  this.word = identifier;
}

module.exports = WordNode;
