//arrays for location and angle of confetti 
var confLocs = [];
var confTheta = [];

//Vector to increase y position of confetti
var confSpeed;

//sliders for speed and height
var speedSlider;
var heightSlider;

//var font

/*function preload()
{
  font = loadFont('assets/Montserrat-Black.otf')
}*/

function setup() {
    createCanvas(900, 800, WEBGL);
    
    //Adds random confetti positions and angles to the respective arrays
    for(var i=0; i<200; i++)
    {
      var confPos = new createVector( random(-500,500) , random(-800,0) , random(-500,500));
      
      confLocs.push(confPos);
      
      confTheta.push(random(0,360));
    }
    
    //Setting up the sliders
    
    speedSlider = createSlider(1,5,1);
    speedSlider.position(50, 700);
    
    heightSlider = createSlider(1,5
    ,2);
    heightSlider.position(50,750);
}

function draw() {
    background(125);
    angleMode(DEGREES);
  
    var speedW = speedSlider.value();
    var heightW = heightSlider.value();
    
    //gets the x and z position of camera by using the cos and sin of framecount and multiplying by height 
    //Mapped from -1 and 1 to -3 and 3 to allow suffiecient space on screen
    var camPosX = map(cos(frameCount) , -1, 1, -1.3,1.3) * height;
    var camPosZ = map(sin(frameCount),-1,1,-1.3,1.3 )* height;
    
    //Camera setup
    camera(camPosX, -600 , camPosZ, 0,0,0, 0,1,0);
    
    //The number of boxes to be drawn calculated
    var startPos = -400;
    var endPos = 400;
    var boxSize = 50;
    
    var numBox = (endPos - startPos) / boxSize;
    
    //Boxes drawn on the screen
    for(var i=0; i<numBox; i++)
    {
      for(var j=0; j<numBox; j++)
      {
        push();
          
          //Point and directional lights of different colors for the boxes
          pointLight(255,0,0 , -200, 0, -200);
          pointLight(255,0,0 , 0,0,0);
          
          directionalLight(120, 70, 100 ,0, -100, -200);
          directionalLight(80, 150, 220 , -100, 0, -150);
          directionalLight(200,0,150, 0,50,0);
          
          
          //normalMaterial();
          //strokeWeight(2);
          //stroke(0);
          
          
          //Material set to ambient to reflect light
          ambientMaterial(255);
          
          //x and z position of each box calculated and transformed
          var boxPosX = startPos + i*boxSize;
          var boxPosY = startPos + j* boxSize;
          
          translate(boxPosX,0, boxPosY);
          
          // distance between center of box and center of screen
          var distance = dist((boxPosX + boxSize/2) ,0 , (boxPosY + boxSize/2), 0, 0 ,0);
          
          //distance and frame count mapped between 100 and 300
          var length = map(sin(distance + frameCount*speedW), -1, 1 , 200 - (100*heightW), 200 + (100*heightW))
          
          box(boxSize, length, boxSize,4,4);
          
        pop();
      }
    }

    //calls the confetti function
    confetti();
}


function confetti()
{
  //the vector is assigned values
  confSpeed = createVector(0,1,0);
  
  for(var i=0; i<confLocs.length; i++)
  {
    push();
      //different colored lights on each axis
      directionalLight(255,0,0, 1,0,0);
      directionalLight(0,255,0, 0,1,0);
      directionalLight(0,0,255, 0,0,1);
      
      noStroke();
      //Material set as specular to give confetti a shiny appearence
      specularMaterial(255);
      
      //the location and speed vectors are added giving the new location
      confLocs[i] = confLocs[i].add(confSpeed);
    
      //translates to the locations in the confLocs vector
      translate(confLocs[i].x , confLocs[i] .y , confLocs[i].z);
      
      //Rotates it on y and x axis
      //rotation incremented by 10 on x axis
      rotateX(confTheta[i] += 10);
      //incrementation on y axis set to 2 to give it a realistic appearance
      rotateY(confTheta[i] += 2);
      
      //Draws the confetti
      plane(15,15);
      
    pop();
    
    //Resets y position if a confetti exits the desired area
    if (confLocs[i].y > 0)
    {
      confLocs[i].y = -800;
    }
      
    
  }
  
}

