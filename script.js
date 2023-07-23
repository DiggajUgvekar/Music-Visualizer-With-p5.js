var song
var fft

function preload(){    // used to load external assets
    song = loadSound('./song/techno.mp3');
}
function setup(){    //used to set up initial settings
    //put setup code 
    createCanvas(windowWidth-19.5, windowHeight-19.5);
    fft = new p5.FFT()
}

function draw(){   // used to update the canvas and handle animations
    //put drawing code here
    background(0)
    stroke(255)

    var wave = fft.waveform()

    for(var i = 0; i < width; i++){
        var index = floor(map(i, 0, width, 0, wave.length))
        var x = i
        var y = wave[index] * 300 + height / 2
        point(x,y)
    }
}


function mouseClicked(){  //behaviors when the mouse is clicked.
    if(song.isPlaying()){
        song.pause();
    }
    else{
        song.play();
    }
}