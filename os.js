const os = require('os');

console.log("os version", os.version());
console.log("Total memory", os.totalmem());
console.log("Free memory", os.freemem());
console.log("CPU", os.cpus());