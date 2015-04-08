var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../../lib/jkif'),
    ast = require('../../../lib/ast_constructors/ast_constructors');


describe('jKif', function() {

  it('should be defined and not null', function() {
    expect(jKif).to.exist;
  });

  it('should have a Parser property', function() {
    expect(jKif.Parser).to.exist;
  });

  it('should have an Utility property', function() {
    expect(jKif.Utility).to.exist;
  });

  it('should have a Thinker property', function() {
    expect(jKif.Thinker).to.exist;
  });

  it('should have an object for the Parser', function() {
    expect(jKif.Parser).to.be.an.instanceof(Object);
  });

  it('should have an object for the Utility', function() {
    expect(jKif.Utility).to.be.an.instanceof(Object);
  });

  it('should have an object for the Thinker', function() {
    expect(jKif.Thinker).to.be.an.instanceof(Object);
  });

});
