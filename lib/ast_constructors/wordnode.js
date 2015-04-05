var BaseNode = require('./ast_constructor_base');


function WordNode(locationData, identifier) {
  BaseNode.call(this, 'WordNode');
  this.word = identifier;
  this.locationData = locationData;
}

module.exports = WordNode;
