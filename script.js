var song
var img
var fft 
var particles = []

function preload(){    // used to load external assets
    song = loadSound('./song/techno.mp3');
    img = loadImage('./img/bg.jpg')
}
function setup(){    //used to set up initial settings
    //put setup code 
    createCanvas(windowWidth-19.5, windowHeight-19.5);
    angleMode(DEGREES)
    imageMode(CENTER)
    rectMode(CENTER)
    fft = new p5.FFT(0.3)

    img.filter(BLUR,12)
    noLoop() 
}

function draw(){   // used to update the canvas and handle animations
    //put drawing code here
    background(0)
    


    translate(width / 2, height / 2)   //translate to get to the center
    
    fft.analyze()
    amp = fft.getEnergy(20,200)

    push()
    if(amp > 200){
        rotate(random(-0.5,0.5))  //rotate slightly with bass kick
    }
    
    image(img, 0 ,0 , width+100, height+100)   //draw the bg image
    pop()

    var alpha = map(amp, 0, 255, 180, 150)
    fill(0, alpha)
    noStroke()
    rect(0, 0, width, height)

    stroke(255)
    strokeWeight(3)
    noFill()    

    var wave = fft.waveform()
    //RIGHT HALF AND LEFT HALF USING LOOP 
    for(var t = -1; t <= 1; t += 2){
    beginShape()
    for(var i = 0; i <= 180; i +=0.5 ){
        var index = floor(map(i, 0, 180, 0, wave.length - 1))
        
        var r = map(wave[index], -1, 1, 150, 350)  //radius
        
        var x = r * sin(i) * t  //multiply t to get negative and postive
        var y = r * cos(i)
        vertex(x,y)
    }
    endShape()
    } 

    var p = new Particle()
    particles.push(p)

    for(var i = particles.length - 1 ; i >= 0 ; i--){
        if(!particles[i].edges()){
        particles[i].update(amp > 200)
        particles[i].show()
        }
        else{
            particles.splice(i, 1)
        }
    }
}


function mouseClicked(){  //behaviors when the mouse is clicked.
    if(song.isPlaying()){
        song.pause();
        noLoop()  //freeze visualizer
    }
    else{
        song.play();
        loop()
    }
}

//particle
class Particle{
    constructor(){
        this.pos = p5.Vector.random2D().mult(250) //place particle randomly
        this.vel = createVector(0,0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.000010))
        this.w = random(3,5)
        this.color = [random(200,255),random(200,255),random(200,255)]
    }
    update(cond){
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if(cond)   //if condition true then add more velocity the particel(in simple with bass kick hits)
        {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
    edges(){
        if(this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < -height /2 || this.pos.y > height / 2){
                return true
        }else{
            return  false
        }
    }
    show(){
        noStroke()
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.w)
    }
}