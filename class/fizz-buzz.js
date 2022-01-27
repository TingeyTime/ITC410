
exports.fizzbuzz = function fizzbuzz (value) {
    if (typeof value === 'number') throw Error('you need to provide a positive number')
    if (value % 3 === 0 ) return 'Fizz';
    if (value % 5 === 0 ) return 'Buzz';
    if (value % 3 === 0 && value % 5 === 0) return 'FizzBuzz';
    return value;
}