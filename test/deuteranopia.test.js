var expect = require('expect.js'),
    deuteranopia = require('../');

function near(a, b) {
    expect(~~a[0]).to.eql(~~b[0]);
    expect(~~a[1]).to.eql(~~b[1]);
    expect(~~a[2]).to.eql(~~b[2]);
}

describe('deuteranopia', function() {
    describe('colors', function() {
        it('black', function() {
            near(deuteranopia(0, 0, 0), [11, 11, 11]);
        });
        it('color', function() {
            near(deuteranopia(0, 20, 0), [21, 21, 11]);
        });
    });

    describe('input', function() {
        it('array input', function() {
            expect(deuteranopia(0, 20, 0)).to.eql(deuteranopia([0, 20, 0]));
        });
    });
});
