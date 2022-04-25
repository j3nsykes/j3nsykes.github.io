var start = 0;
var stop = 0;
var w = 100;
var h = 100;
var data01 =0;
var data02 = 0;
var r,g,b,rVal;

function preload() {
  data = loadJSON("data.json", gotData); //alternate way to load JSON file  

}

function setup() {
  createCanvas(400, 400);
}

function gotData(data) {
  print(data);
  


   r = data.flowers[0].r;
   g = data.flowers[0].g;
   b = data.flowers[0].b;
  
  console.log(data.flowers[0].r); //console log r val
  
  //if we want all the r vals?
  for (var i = 0; i < data.flowers.length; i++) {
    rVals = data.flowers[i].r;
    console.log(rVals);
  }
}


function draw() {
  background(225);
  
  //position shapes
  translate(width / 2, height / 2);
  rotate(-180);
  
  push();//contain actions
  
  rotate(HALF_PI);
  strokeCap(ROUND); //styling
  strokeWeight(25);
  noFill();
  
  // data 1
  w = 300;
  h = 300;
 //use fixed value to test
  //data01 = 50
  
  //or use JSON data
  data01 = data.flowers[0].r;
  stop = map(data01, 0, 360, 0, TWO_PI);
  stroke('#d63447');  
  arc(0, 0, w, h, 0, stop);
  
  //data 2
  w = 150;
  h = 150;
   //use fixed value to test
  //data02 = 70
  
    //or use JSON data
  data02 = data.flowers[1].r;
  stop = map(data02, 0, 360, 0, TWO_PI);
  stroke('#f57b51');
  arc(0, 0, w, h, start, stop);
  
  pop(); //enclose actions 
}