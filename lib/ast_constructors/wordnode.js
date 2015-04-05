var BaseNode = require('./ast_constructor_base');


function WordNode(identifier) {
  BaseNode.call(this, 'WordNode');
  this.word = identifier;
}

module.exports = WordNode;
