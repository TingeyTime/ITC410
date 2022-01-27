/*
Write...
*/
const expect = require('chai').expect
// Destructuring...
const { fuzzbuzz } = require('../fizz-buzz')

describe('fizz buzz', () =>{
    it('returns "Fizz" if the input is 3', (done) => {
        expect(fizzbuzz(3)).to.equal('Fizz');
        done();
    });
    it('returns "Buzz" if the input is 5', () => {
        expect(fizzbuzz(5)).to.equal('Buzz');
    });
    it('returns "fizzBuzz" if the input is a multiple of 3 and 5', () => {
        expect(fizzbuzz(15)).to.equal('FizzBuzz');
    });
    it('returns the number that was passed in if not a multiple of 3 and 5', () => {
        expect(fizzbuzz(2).to.equal(2));
    });
    it('will throw an error if you don\'t input a nubmer', () => {
        expect(() => fizzbuzz()).to.throw(/you need to provide a positve number/);
    });
});