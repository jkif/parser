var chai = require('chai'),
    expect = chai.expect,
    jKif = require('../../src/jkif'),
    ast = require('../../src/ast_constructors/ast_constructors');


describe('jKif', function() {

  it('should be defined and not null', function() {
    expect(jKif).to.exist;
  });

  it('should have a Parser property', function() {
    expect(jKif.Parser).to.exist;
  });

  it('should have an API property', function() {
    expect(jKif.API).to.exist;
  });

  it('should have an object for the Parser', function() {
    expect(jKif.Parser).to.be.an.instanceof(Object);
  });

  it('should have an object for the API', function() {
    expect(jKif.API).to.be.an.instanceof(Object);
  });

});
