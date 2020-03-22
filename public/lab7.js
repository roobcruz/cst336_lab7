let predef = ["sun", "baseball", "basket", "dance"];
var predefRandom = Math.floor(Math.random() * 4);

$.ajax({
    method: "GET",
    url: "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=" + predef[predefRandom] + "&orientation=" + "vertical" + "&image_type=vector",
    dataType: "json",
    // data: { "tags": $("#keyword").val(),
    //         "orientation": $("#orientation").val()
    // },
    success: function(result, status) {
        console.log(result);
        console.log(result.hits);
        let size = result.hits.length;
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
        // for(let i = 0; i < 4; i++){
        //     randNum[i] = (Math.floor(Math.random() * size));
        // }
        console.log(randNum);
        for(let i = 0; i < 4; i++){
            //$("#likes").append ("Likes: " + result.hits[randNum[i]].likes + "\t"); //result.hits[i].previewURL
            //$("#imgdiv").append("<div class=" + "column" + "><h2> Likes: " + result.hits[i].likes + "</h2> <img src=" + result.hits[i].previewURL + "></div>");
            $("#imgdiv").append(`<div id=d${i}> Likes: ` + result.hits[randNum[i]].likes + "<br> <img src=" + result.hits[randNum[i]].previewURL + "></div>");
        }
    }
});

var keyword = "";
$("#keyword").on("change", function(){
    search_term = $("#keyword").val();
    let length = $("#keyword").val().length;
    for(let i = 0; i < length; i++){
        if(search_term[i] == ' '){
            keyword += "%20";
        }else{
            keyword += search_term[i];
        }
    }
    console.log(keyword)
})

var orientation = "";

$("#orientation").on("change", function(){
    orientation = $("#orientation").val();
    console.log(orientation);
})


$("#btn").on("click", function(){
    
    $.ajax({
        method: "GET",
        url: "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=" + keyword + "&orientation=" + orientation + "&image_type=vector",
        dataType: "json",
        // data: { "tags": $("#keyword").val(),
        //         "orientation": $("#orientation").val()
        // },
        success: function(result, status) {
            if(!$("#imgdiv").is(':empty') || !$("#likes").is(':empty')){
                $("#imgdiv").html("");
                $("#likes").html("");
            }
            console.log(result);
            console.log(result.hits);
            let size = result.hits.length;
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
            // for(let i = 0; i < 4; i++){
            //     randNum[i] = (Math.floor(Math.random() * size));
            // }
            console.log(randNum);
            for(let i = 0; i < 4; i++){
                //$("#likes").append ("Likes: " + result.hits[randNum[i]].likes + "\t"); //result.hits[i].previewURL
                //$("#imgdiv").append("<div class=" + "column" + "><h2> Likes: " + result.hits[i].likes + "</h2> <img src=" + result.hits[i].previewURL + "></div>");
                $("#imgdiv").append(`<div id=d${i}> Likes: ` + result.hits[randNum[i]].likes + "<br> <img src=" + result.hits[randNum[i]].previewURL + "></div>");
            }
        }
    });
})