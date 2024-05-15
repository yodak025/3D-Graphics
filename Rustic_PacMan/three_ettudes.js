import * as THREE from 'https://cdn.skypack.dev/three@0.120.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js';
import { PacWalls } from './PacWalls.js';

const game = {
    scene: new THREE.Scene(),
    renderer: new THREE.WebGLRenderer({
        antialias: true,
    }),
    camera: new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
    ),
}



const orbit = new OrbitControls(game.camera, game.renderer.domElement);



const maze = {
    walls: new PacWalls([28, 31]),
    borders: [],

    set_texture: function () {
        this.texture = new THREE.MeshBasicMaterial({ color: 0xEEEEEE, side: THREE.DoubleSide });
        this.texture2 = new THREE.MeshBasicMaterial({ color: 0x00EE11, side: THREE.DoubleSide });
        this.texture3 = new THREE.MeshBasicMaterial({ color: 0xFF2211, side: THREE.DoubleSide });
    },

    set_walls: function () {

        let wall_geo = new THREE.BoxGeometry(0.9, 0.9, 1);
        let coin_geo = new THREE.SphereGeometry(0.1, 16, 16);
        let walls = []
        let aux_walls = []
        this.walls.generate_paths();
        let pac_map = this.walls.grid;
        let dim = this.walls.dim;

        let idx = 0

        for (let i = 0; i < dim[0]; i++) {
            for (let j = 0; j < dim[1]; j++) {
                if (pac_map[i][j] == 0) {
                    aux_walls.push(new THREE.Mesh(coin_geo, this.texture));
                    aux_walls[idx].position.x = i - 56;
                    aux_walls[idx].position.y = j - 62;
                    aux_walls[idx].position.z = 0.5;
                    game.scene.add(aux_walls[idx]);
                    idx += 1;
                }else if (pac_map[i][j] == 1) {
                    aux_walls.push(new THREE.Mesh(wall_geo, this.texture));
                    aux_walls[idx].position.x = i - 56;
                    aux_walls[idx].position.y = j - 62;
                    aux_walls[idx].position.z = 0.5;
                    game.scene.add(aux_walls[idx]);
                    idx += 1;
                    
                }else if (pac_map[i][j] == 2) {
                    aux_walls.push(new THREE.Mesh(wall_geo, this.texture));
                    aux_walls[idx].position.x = i - 56;
                    aux_walls[idx].position.y = j - 62;
                    aux_walls[idx].position.z = 0.5;
                    game.scene.add(aux_walls[idx]);
                    idx += 1;
                }
                else if (pac_map[i][j] == 3) {
                    aux_walls.push(new THREE.Mesh(wall_geo, this.texture));
                    aux_walls[idx].position.x = i - 56;
                    aux_walls[idx].position.y = j - 62;
                    aux_walls[idx].position.z = 0.5;
                    game.scene.add(aux_walls[idx]);
                    idx += 1;
                }

            }
            walls.push(aux_walls);
            aux_walls = [];
            idx = 0;
        }
        return walls
    },

    set_borders: function (x, y, len) {
        let bot_vert = new THREE.BoxGeometry(2 * x, len, 5);
        let top_vert = new THREE.BoxGeometry(2 * x, len, 5);
        let left_vert = new THREE.BoxGeometry(len, 2 * y, 5);
        let right_vert = new THREE.BoxGeometry(len, 2 * y, 5);

        this.borders.push(
            new THREE.Mesh(bot_vert, this.texture),
            new THREE.Mesh(top_vert, this.texture),
            new THREE.Mesh(left_vert, this.texture),
            new THREE.Mesh(right_vert, this.texture)
        );

        this.borders[0].position.y = y;
        this.borders[1].position.y = -y;
        this.borders[2].position.x = x;
        this.borders[3].position.x = -x;

        for (let i = 0; i < this.borders.length; i++) {
            game.scene.add(this.borders[i]);
        }
    }

}



function animate(mesh, renderer, scene, camera) {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    let step = 1;

    document.onkeydown = function (ev) {
        
            switch (ev.key) {
                case 'a':if (0 == maze.walls.grid[
                    (mesh.position.x + maze.walls.dim[0]/2) - 1
                ][
                    mesh.position.y + maze.walls.dim[1]/2
                ] ) {
                    mesh.position.x -= step;
                    camera.position.x -= step;
                    scene.remove(grid_elements[mesh.position.x + 56][mesh.position.y + 62])
                    }
                    break;

                case 'd':
                    if (0 == maze.walls.grid[
                        (mesh.position.x + maze.walls.dim[0]/2) + 1
                    ][
                        mesh.position.y + maze.walls.dim[1]/2
                    ] ) {

                    mesh.position.x += step;
                    camera.position.x += step;
                    scene.remove(grid_elements[mesh.position.x + 56][mesh.position.y + 62])
                    }
                    break;

                case 's':
                    if (0 == maze.walls.grid[
                        mesh.position.x + maze.walls.dim[0]/2
                    ][
                        (mesh.position.y + maze.walls.dim[1]/2) - 1
                    ] ) {
                    mesh.position.y -= step;
                    camera.position.y -= step;
                    scene.remove(grid_elements[mesh.position.x + 56][mesh.position.y + 62])
                    }
                    break;

                case 'w':
                    if (0 == maze.walls.grid[
                        mesh.position.x + maze.walls.dim[0]/2
                    ][
                        (mesh.position.y + maze.walls.dim[1]/2) + 1
                    ] ) {
                    mesh.position.y += step;
                    camera.position.y += step;
                    scene.remove(grid_elements[mesh.position.x + 56][mesh.position.y + 62])
                    }
                    break;
            }
        }

    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        animate(mesh, renderer, scene, camera);
    });
}



let axes_helper = new THREE.AxesHelper(200);
game.scene.add(axes_helper);


let grid = new THREE.GridHelper(112, 124);
grid.rotation.x = Math.PI / 2;
game.scene.add(grid);


maze.set_texture()

maze.set_borders(57, 63, 0.9)
let grid_elements = maze.set_walls()


game.camera.position.x = -56;
game.camera.position.y = 46;
game.camera.position.z = 15;


var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshNormalMaterial();
var mesh = new THREE.Mesh(geometry, material);


mesh.position.x = -56;
mesh.position.y = 46;
mesh.position.z = 0.5;


game.scene.add(mesh);


const floor = new THREE.PlaneGeometry(112, 124);
const floor_blue = new THREE.MeshBasicMaterial({ color: 0x051F42, side: THREE.DoubleSide });
const plane = new THREE.Mesh(floor, floor_blue);

game.scene.add(plane);


game.renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(game.renderer.domElement);

animate(mesh, game.renderer, game.scene, game.camera, grid_elements);

