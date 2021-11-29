const fs = require('fs');        //inbuilt package - filesystem

fs.readFile('./welcome.txt', "utf-8", (err , data) => {
    console.log(data);
});

const quote = "No beauty shines brighter than that of a good heart";

const quote2 = "Live more worry less";

// fs.writeFile('./awesome.txt',  quote, err => {
//     console.log("completed writing")
// })

// const [,,num] = process.argv;

// for(var i=1;i<=num;i++){
//     fs.writeFile(`backup/text-${i}.html`,  quote2, err => {
//         console.log("completed writing");
//     })
// }

fs.readdir('./backup',(err,files) => {
   if(err){
    console.log(err)
   }
    
    console.log(files);
})
