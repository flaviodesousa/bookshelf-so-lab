var User = require('../user'),
    chai = require('chai'),
    expect = chai.expect;

	describe('User model', function () {

		this.timeout(20000);

		before(function (done) {
			setTimeout(() => done(), 50);
		})

	    it('should return empty set before adding anything', function (done) {
	    	User.collection().count()
	    	.then(count => {
	    		expect(count).to.equal(0);
	    		done()
	    	})
	    	.catch(err => done(err)); 
	    });

	});
