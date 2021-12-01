const os = require('os');

console.log("os version", os.version());
console.log("Total memory", os.totalmem());
console.log("Free memory", os.freemem());
console.log("CPU", os.cpus());

//mongodb+srv://chetan:<password>@cluster0.hz7iv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority