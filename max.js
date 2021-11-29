const [, , array] = process.argv;
var arr = JSON.parse(array);
console.log(arr);
console.log("Maximum of array is "+Math.max(...arr))
console.log(typeof([1,2]))




