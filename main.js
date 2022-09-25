dstatus = "";
objects = []

function setup(){
    canvas = createCanvas(380, 280);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 280);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
    wantedObject = document.getElementById("specific_object").value;
}

function modelloaded(){
    console.log("Model Has Loaded");  
    console.log(wantedObject);
    dstatus = true;
}

function results(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;

}

function draw(){
    image(video, 0, 0, 380, 280);

    if(dstatus != ""){
        objectDetector.detect(video, results);

        for(i=0, i < objects.length; i++;){
            fill()
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label = wantedObject){
                video.stop();
                objectDetector.detect(results);
                document.getElementById("specific_object_display").innerHTML = "Specific Object Found!";

                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance("Found " + wantedObject);
                synth.speak(utterThis);
            }

            else{
                document.getElementById("specific_object_display")
            }
        }
    }
} 