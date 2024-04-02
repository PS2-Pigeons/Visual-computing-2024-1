

new p5(function(p5) {

    let matrixWidth = (8) + 2;  // Width of the playable area + 2 (borders)
    let matrixHeight = (8) + 2; // Height of the playable area + 2 (borders)
    let matrixDepth = (12) + 2;  // Depth of the playable area + 2 (borders)
    let boxSize = 25;     // Size of each box
    let gameMatrix = [];    // 3D array to store colors
    let lineLengthX = matrixWidth * boxSize;
    let lineLengthY = matrixHeight * boxSize;
    let blackLineZ = matrixDepth * boxSize;
    let cam;

    let zoomLevel = 1;    // Zoom level
    let vertRotation = 0;    // Vertical rotation
    let rotationZ = 0;    // Rotation angle around the Z-axis

    p5.setup = function() {
        p5.createCanvas(600, 600, p5.WEBGL);
        p5.angleMode(p5.DEGREES);

        cam = p5.createCamera();
        cam.camera(lineLengthX * 1.55, lineLengthY * 1.55, blackLineZ * 1.85 , boxSize, boxSize, boxSize, 0, 0, -1);
        cam.perspective(40);
        
        // Initialize the 3D matrix
        for (let i = 0; i < matrixWidth; i++) {
            gameMatrix[i] = [];
            for (let j = 0; j < matrixHeight; j++) {
                gameMatrix[i][j] = [];
                for (let k = 0; k < matrixDepth; k++) {
                    let col = 'transparent';
                    if (i == 0 || i == matrixWidth - 1 || j == 0 || j == matrixHeight - 1 || k == 0) col = 'gray';
                    if (k == matrixDepth - 1) col = 'purple';
                    gameMatrix[i][j][k] = col;
                }
            }
        }

        p5.setColor(2, 3, 1, 'red'); // Set the color of the box at position (2, 3, 1) to red
    };

    p5.draw = function() {
        p5.background(255);
        p5.rotateX(-vertRotation);
        p5.rotateY(vertRotation);
        p5.rotateZ(rotationZ); // Rotate around the Y-axis

        // Draw 3D matrix
        for (let i = 0; i < matrixWidth - 1; i++) {
            for (let j = 0; j < matrixHeight - 1; j++) {
                for (let k = 0; k < matrixDepth - 1; k++) {
                    let x = i * boxSize;
                    let y = j * boxSize;
                    let z = k * boxSize;

                    p5.push(); // Save the current transformation matrix
                        p5.translate(x, y, z);
                        
                        let col = gameMatrix[i][j][k];    
                        if (col != 'transparent') {
                            p5.fill(col);
                        } else {
                            p5.noStroke();
                            p5.noFill();
                        } 
                        p5.box(boxSize);
                    p5.pop(); // Restore the previous transformation matrix
                }
            }
        }
    };

    // Function to set color at a specific matrix position
    p5.setColor = function(x, y, z, col) {
        if (x >= 0 && x < matrixWidth && y >= 0 && y < matrixHeight && z >= 0 && z < matrixDepth) {
            gameMatrix[x][y][z] = col;
        }
    };

    // Custom camera controls
    p5.mouseDragged = function() {
        let dx = p5.mouseX - p5.pmouseX;
        let dy = p5.mouseY - p5.pmouseY;
        rotationZ = p5.constrain(rotationZ - dx * 0.05, -25 * zoomLevel, 25 * zoomLevel);
        vertRotation = p5.constrain(vertRotation + dy * 0.05, -4.5 * zoomLevel, 12 * zoomLevel);
    };

    p5.mouseWheel = function(event) {
        zoomLevel += event.delta * 0.005;
        zoomLevel = p5.constrain(zoomLevel, 0.5, 1.5);
        cam.perspective(40 * zoomLevel);
    };

    p5.keyPressed = function() {
        if (p5.key === ' ') {
            rotationZ = 0;
            vertRotation = 0;
            zoomLevel = 1;
            cam.perspective(40);
        }
    };

}, canvasContainer);
