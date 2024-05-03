song = "";

letfWristX = 0;
letfWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canavas = createCanvas(600, 500);
    Canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet es inicializado');
}

function gotPoses(results){
   if(results.length > 0){
    console.log(results);
    scoreLefWrist = results[0].pose.keyponts[9].score;
    console.log("scoreLeftWrist =" + scoreLeftWrist);
    
    letfWristX = results[0].pose.leftWrist.x;
    letfWristY = results[0].pose.leftWrist.y;
    console.log("muñeca izq.x = " +letfWristX+ "muñeca izq.y = " +letfWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("muñeca der.x = " +rightWristX+ "muñeca der.y = " +rightWristY);

   } 
}

function draw(){
    image(video, 0,0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLefWrist > 0.2){
        circle(letfWristX, letfWristY, 20);
        InNumberleftWristY = Number(letfWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volumen = " + volume;
        song.setvolume(volume);
    }
}

function play(){
    song.play();
    song.setvolume(1);
    song.rate(1);
}