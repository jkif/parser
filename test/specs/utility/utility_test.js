var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../lib/jkif'),
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('jKif.Utility', function() {

  it('responds to #isJkif', function() {
    expect(jKif.Utility).to.respondTo('isJkif');
  });

  it('responds to #jkifLength', function() {
    expect(jKif.Utility).to.respondTo('jkifLength');
  });

  it('responds to #numOfNode', function() {
    expect(jKif.Utility).to.respondTo('numOfNode');
  });

  it('responds to #eachChild', function() {
    expect(jKif.Utility).to.respondTo('eachChild');
  });

});
