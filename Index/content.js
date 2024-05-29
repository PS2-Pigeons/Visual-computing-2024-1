import { AssignmentContainer } from './assignmentContainer.js';
import { hoverContainer } from './hoverContainer.js';

let assignmentContainers = [];
let florpCage;

let containerSize;
let horizPadding;
let vertPadding;

let textCenter;
let centerVertStartPos;

let title = "Visual computing Assignments \n 2024 - 1S";
let members = ["Santiago Reyes Ochoa", "Juan Sebastian Cabezas Mateus", "Juan Carlos Garavito Higuera", "Daniel Esteban Tobar Lozano"];
let description = "Description...";

new p5(function(p5) {

    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);

        // Left column
        assignmentContainers.push(new AssignmentContainer(p5, 'Meteorite/meteorite.html', 'Assignment 1', ['Index/Images/meteorite_0.png', 'Index/Images/meteorite_1.png'], 'Intro to processing - Meteorite Arcade Game'));
        assignmentContainers.push(new AssignmentContainer(p5, 'Tetris3D/tetris3d.html', 'Assignment 2', ['Index/Images/tetris_0.png', 'Index/Images/tetris_1.png'], 'Transformations - Tetris 3D (NOT FINISHED YET)'));
        assignmentContainers.push(new AssignmentContainer(p5, '3DModels/models.html', 'Assignment 3', ['Index/Images/3dmodels_0.png', 'Index/Images/3dmodels_1.png'], 'Representation - 3D Models'));

        //Right column
        assignmentContainers.push(new AssignmentContainer(p5, '4DPolyhedra/4d.html', 'Assignment 4', ['Index/Images/Octahedron.gif', 'Index/Images/16-cell-orig.gif'], 'Rendering - 4D shape'));
        assignmentContainers.push(new AssignmentContainer(p5, 'FogShader/fog.html', 'Assignment 5', ['Index/Images/fog_0.png', 'Index/Images/fog_1.png'], 'Shaders - Fog Shader'));
        assignmentContainers.push(new AssignmentContainer(p5, 'index.html', 'Assignment 6'));

        florpCage = new hoverContainer(p5, 'https://www.youtube.com/watch?v=AJNnZp0ZXEE', 'Florp', 200, 120);

        for (let container of assignmentContainers) await container.preload();

        p5.windowResized();

    };

    p5.draw = function() {

        p5.clear();
    
        let mouseOverAnyContainer = false;
    
        assignmentContainers.forEach(container => {
            container.display();
    
            if (container.isMouseInside()) {
                p5.cursor(p5.HAND);
                mouseOverAnyContainer = true;
                description = container.description;
            }
        });

        //florpCage.display();

        if (florpCage.isMouseInside()) {
            p5.cursor(p5.HAND);
            mouseOverAnyContainer = true;
            description = florpCage.description;
        }
    
        if (!mouseOverAnyContainer) {
            p5.cursor(p5.ARROW);
            description = '';
        }
    
        p5.push();
            // Draw title
            p5.fill(0);
            p5.textSize(32);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text(title, textCenter, centerVertStartPos);
    
            // Draw members list
            p5.textSize(24);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.textSize(18);
            for(let i = 0; i < members.length; i++) {
                p5.text(members[i], textCenter, centerVertStartPos + 80 + i * 25);
            }
    
            // Draw description
            p5.textSize(14);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.text(description, textCenter, centerVertStartPos - 220);
        p5.pop();
    };

    p5.mouseClicked = function() {
        assignmentContainers.forEach(container => {
            if (container.isMouseInside()) container.onclick();
        });

        if (p5.mouseX > textCenter - 100 && p5.mouseX < textCenter + 100 &&
            p5.mouseY > p5.windowHeight / 2 - p5.windowHeight * 0.08 && p5.mouseY < p5.windowHeight / 2 + p5.windowHeight * 0.08) {
                window.open('https://www.youtube.com/watch?v=AJNnZp0ZXEE', '_blank');
        }
    };

    p5.windowResized = function() {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

        containerSize = p5.windowHeight * 0.25;
        horizPadding = p5.windowWidth * 0.05;
        vertPadding = p5.windowHeight * 0.0625;
        textCenter = p5.constrain(p5.windowWidth / 2,  2 * (horizPadding + containerSize) , p5.windowWidth - (2 * horizPadding + containerSize));
        centerVertStartPos = p5.windowHeight / 2 + vertPadding;

        for(let i = 0; i < assignmentContainers.length / 2 ; i++ ){
            let y = vertPadding + i * (containerSize + vertPadding);
            assignmentContainers[i].adjust(horizPadding , y, containerSize);
        }

        for(let i = assignmentContainers.length / 2; i < assignmentContainers.length; i++ ){
            let y = vertPadding + (i - assignmentContainers.length / 2) * (containerSize + vertPadding);
            assignmentContainers[i].adjust(p5.constrain(p5.windowWidth - horizPadding - containerSize, 3 * (horizPadding + containerSize), p5.windowWidth - horizPadding - containerSize) , y, containerSize);
        }

        florpCage.adjust(p5.width / 2 , p5.height / 2 - 80);

    };

}, 'content');