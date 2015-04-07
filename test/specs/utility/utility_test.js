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

  it('responds to #eachNode', function() {
    expect(jKif.Utility).to.respondTo('eachNode');
  });

  it('responds to #isAtom', function() {
    expect(jKif.Utility).to.respondTo('isAtom');
  });

  it('responds to #isMolecule', function() {
    expect(jKif.Utility).to.respondTo('isMolecule');
  });

  it('responds to #numAtoms', function() {
    expect(jKif.Utility).to.respondTo('numAtoms');
  });

  it('responds to #numMolecules', function() {
    expect(jKif.Utility).to.respondTo('numMolecules');
  });

  it('responds to #allAtoms', function() {
    expect(jKif.Utility).to.respondTo('allAtoms');
  });

  it('responds to #allMolecules', function() {
    expect(jKif.Utility).to.respondTo('allMolecules');
  });

});
