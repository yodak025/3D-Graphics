import * as THREE from 'https://cdn.skypack.dev/three@0.120.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/loaders/GLTFLoader.js';
import { Game } from './PacGame.js';

const game = new Game();



function main(game){

    game.set_texture()
    /game.set_borders(57, 63, 0.9)
    game.set_walls();
    
    
    
    //const helper = {
    //    orbit: new OrbitControls(game.camera, game.renderer.domElement),
    //    axes: new THREE.AxesHelper(200),
    //    grid: new THREE.GridHelper(112, 124)
    //}
    
    //game.scene.add(helper.axes);
    //helper.grid.rotation.x = Math.PI / 2;
    //game.scene.add(helper.grid);
    
    
    
    game.set_camera_to_start();
    game.set_light();
    game.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(game.renderer.domElement);


    function animate() {
   
        document.onkeydown = function (ev) {
                game.pacman_controls(ev.key);
            }
    
            game.each_frame();
            document.getElementById("score").innerHTML = game.board.score;
            document.getElementById("lives").innerHTML = game.pacman.lives;
            document.getElementById("orbs").innerHTML = game.pacman.orbs;

            if (game.pacman.position[0] == 111) {
                alert("You win!");
                game.state.game_over = true
            }
            if (game.pacman.lives == 0){
                alert("Game Over!");
                game.state.game_over = true
            }
    
        requestAnimationFrame(function () {
            if(game.state.game_over == false){
                animate();
            }
            else{
                window.location.reload();
            }
        });
    }


    animate();
}



document.getElementById('start-game').addEventListener('click', function() {
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    main(game); 
});



let loader = new GLTFLoader();


loader.load('Pacman_Blue_Ghost.glb', (gltf) => {
    const scene = gltf.scene;
    scene.traverse((child) => {
      if (child.isMesh) {
        game.blue_ghost.add_mesh(child);
        game.scene.add(child);
      }
      
    });
  });


  loader.load('Pacman_Orange_Ghost.glb', (gltf) => {
    const scene = gltf.scene;
    scene.traverse((child) => {
      if (child.isMesh) {
        game.orange_ghost.add_mesh(child);
        game.scene.add(child);
      }
      
    });
  });

  loader.load('Pacman_Pink_Ghost.glb', (gltf) => {
    const scene = gltf.scene;
    scene.traverse((child) => {
      if (child.isMesh) {
        game.pink_ghost.add_mesh(child);
        game.scene.add(child);
      }
      
    });
  });

  loader.load('Pacman_Red_Ghost.glb', (gltf) => {
    const scene = gltf.scene;
    scene.traverse((child) => {
      if (child.isMesh) {
        game.red_ghost.add_mesh(child);
        game.scene.add(child);
      }
      
    });
  });

  loader.load('Pacman.glb', (gltf) => {
    const scene = gltf.scene;
    scene.traverse((child) => {
      if (child.isMesh) {
        game.pacman.add_mesh(child);
        game.scene.add(child);
      }
      
    });
  });
