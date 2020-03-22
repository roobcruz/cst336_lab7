const express = require("express");
const app = express();
app.set("view engine", "ejs");
//app.engine('html', require("ejs").renderFile);
app.use(express.static("public")); //flder for css, js, images

const request = require("request");

let predef = ["sun", "baseball", "basket", "dance"];

app.get("/", async function(req, res){
    let randomNumber = (Math.floor(Math.random() * 4));//picks a random word from predef
    let parsedData = await getImages(predef[randomNumber], "vertical");//converts string to JSOn
    let size = parsedData.hits.length;
    let randNum = [];
        let itr = 0;
        while(itr < 4){
            let temp = (Math.floor(Math.random() * size));
            if(randNum.includes(temp)){
                continue;
            }else{
                randNum[itr] = temp;
                itr++;
            }
    }
    
    console.dir("Parsed Data: " + parsedData);
    res.render("index", {"images":parsedData, "randNum":randNum});
});

app.get("/results", async function(req, res){
    let keyword = req.query.keyword; //gets value that is typed in the text input box using GET Method
    let orientation = req.query.orientation;
    let parsedData = await getImages(keyword);//converts string to JSOn
    //console.dir(req);
    let size = parsedData.hits.length;
    let randNum = [];
        let itr = 0;
        while(itr < 4){
            let temp = (Math.floor(Math.random() * size));
            if(randNum.includes(temp)){
                continue;
            }else{
                randNum[itr] = temp;
                itr++;
            }
    }
    console.log(parsedData)
    res.render("results", {"images":parsedData, "randNum":randNum});
    
    //res.render("results");
});//results


function getImages(keyword, orient){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=' + keyword + "&orientation=" + orient, function (error, response, body) {
                if(!error && response.statusCode == 200){
                    // //res.send("It workssss");
                    parsedData = JSON.parse(body);//converts string to JSOn
                    
                    resolve(parsedData);
                    //let size = parsedData.hits.length;
                    //let randIndex = Math.floor(Math.random() * size);
                    //res.send(`<img src='${parsedData.hits[randIndex].previewURL}'>`);
                    //res.render("index", {"image":parsedData.hits[randIndex].previewURL});
                    //res.render("index");
                }else{
                    reject(error);
                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                    console.log(response.statusCode);
                    console.log(error); 
                }
        });//request
    });
}

app.listen(process.env.PORT, function(){
    console.log("Express server is running...");
})  