var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../lib/jkif'),
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('jKif.Thinker', function() {

  it('responds to #isConsistent', function() {
    expect(jKif.Thinker).to.respondTo('isConsistent');
  });

  it('responds to #isConsistentSentential', function() {
    expect(jKif.Thinker).to.respondTo('isConsistentSentential');
  });

});
