function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(300,280);
    canvas.position(530,300);
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;

}

function draw(){
    stroke(0);
    strokeWeight(13);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function clearCanvas(){
    background('white');
}

function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById("your_sketch").innerHTML=  "YOUR SKETCH: " + results[0].label;
    document.getElementById("confidence").innerHTML = "CONFIDENCE: " +Math.round(results[0].confidence*100)+"%";
    utter_this= new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utter_this);
}
