var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

var test = {};
test.test = "test";

function test2(){};
test2.prototype = Object.create(null);
let test1 = new test2();
test1.test = "test1";

suite.add('object', function() {
    test.test;
})
.add('function', function(){
    test1.test;
})
.on('cycle', function(event) {
    console.log(String(event.target));
  })
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({'async': true});