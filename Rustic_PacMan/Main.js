import * as THREE from 'https://cdn.skypack.dev/three@0.120.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js';
import { Game } from './PacGame.js';







function main(){
    const game = new Game();

    game.set_texture()
    //game.set_borders(57, 63, 0.9)
    game.set_walls();
    
    
    
    const helper = {
        orbit: new OrbitControls(game.camera, game.renderer.domElement),
        axes: new THREE.AxesHelper(200),
        grid: new THREE.GridHelper(112, 124)
    }
    
    game.scene.add(helper.axes);
    helper.grid.rotation.x = Math.PI / 2;
    game.scene.add(helper.grid);
    
    
    
    game.set_camera_to_start();
    game.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(game.renderer.domElement);


    function animate() {
   
        document.onkeydown = function (ev) {
                game.pacman_controls(ev.key);
                console.log(game.board.score)
            }
    
            game.each_frame();
            document.getElementById("score").innerHTML = game.board.score;
            document.getElementById("lives").innerHTML = game.pacman.lives;

            if (game.board.score == 100000) {
                alert("You win!");
                window.location.reload();
            }
            if (game.pacman.lives == 0) {
                alert("Game Over!");
                window.location.reload();
            }
    
        requestAnimationFrame(function () {
            animate();
        });
    }


    animate();
}

document.getElementById('start-game').addEventListener('click', function() {
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    main(); 
});



