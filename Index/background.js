let cols, rows;
let scl = 40; // Scale
let flying = 0;

new p5(function(p5) {

    p5.setup = function() {
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
        p5.angleMode(p5.DEGREES);
        cols = p5.floor(p5.width / scl);
        rows = 12;
    };

    p5.draw = function() {
        p5.background(255);
        p5.rotateX(98);  // Rotate the view to see the landscape in 3D
        p5.translate(-p5.width / 2, 200 , p5.map(p5.windowHeight, 0, 997, -100, -250, 1));

        const terrain = Array(rows).fill().map(() => Array(cols).fill());
        
        let yoff = flying;
        flying -= 0.005;
        
        for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
            terrain[y][x] = p5.map(p5.noise(xoff, yoff), 0, 1, -100, 100);
            xoff += 0.1;
            }
            yoff += 0.1;
        }
        
        p5.fill('#2596be');
        p5.stroke(255);
        for (let y = 0; y < rows - 1; y++) {
            p5.beginShape(p5.TRIANGLE_STRIP);
            for (let x = 0; x < cols; x++) {
            p5.vertex(x * scl, y * scl, terrain[y][x]);
            p5.vertex(x * scl, (y + 1) * scl, terrain[y+1][x]);
            }
            p5.endShape();
        }
    };

    p5.windowResized = function() {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        cols = p5.floor(p5.width / scl);

    };
    
<<<<<<< HEAD
}, 'background');
=======
}, background);
>>>>>>> e2eb2062336a2a015134d5a8bc9e80e7bc0348d1
