import * as THREE from 'https://cdn.skypack.dev/three@0.120.0/build/three.module.js';
import { PacWalls } from './PacWalls.js';
import { PacMan } from './PacEntities.js';
import { PacGhost } from './PacEntities.js';
import { PacBoard } from './PacBoard.js';

export class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,

        });
        this.renderer.shadowMap.enabled = true;
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        );

        this.sunLight = new THREE.PointLight("#ccffcc");

        this.state = {
            game_over: false,
        }


        this.floor = this.__set_floor();
        this.walls = new PacWalls([28, 31]);
        this.borders = [];
        this.meshes = undefined;
        this.set_walls();
        this.board = new PacBoard(this.walls.grid, this.meshes, this.walls.dim, this.scene);

        this.pacman = new PacMan()

        this.blue_ghost = new PacGhost(this.board.board);
        this.orange_ghost = new PacGhost(this.board.board);
        this.pink_ghost = new PacGhost(this.board.board);
        this.red_ghost = new PacGhost(this.board.board);

        this.ghosts = [this.blue_ghost, this.orange_ghost, this.pink_ghost, this.red_ghost];

        
    }


    set_light() {
        this.sunLight.position.set(0, 0, 100);
        this.sunLight.intensity = 2.5;
        this.sunLight.distance = 300;
        this.sunLight.castShadow = true;

        this.sunLight.shadow.camera.near = 50;
        this.sunLight.shadow.camera.far = 300;
        this.sunLight.shadow.mapSize.width = 4096;
        this.sunLight.shadow.mapSize.height = 4096;


        this.scene.add(this.sunLight);
    }


    __set_floor() {
        const floor = new THREE.PlaneGeometry(112, 124);
        const floor_blue = new THREE.MeshLambertMaterial({ color: 0x051F42, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(floor, floor_blue);

        plane.receiveShadow = true;

        this.scene.add(plane);
        return plane
    }


    pacman_controls(key) {
        let lastpos = this.pacman.position;

        switch (key) {
            case ' ':
                if (this.pacman.orbs > 0) {
                    this.pacman.step = 5
                    this.pacman.orbs -= 1
                }

                break;
            case 'ArrowLeft':
                if (0 != this.board.board[this.pacman.position[0] - this.pacman.step][this.pacman.position[1]]) {
                    this.pacman.position[0] -= this.pacman.step;
                    this.camera.position.x -= this.pacman.step;
                    this.pacman.step = 1
                    
                    
                }
                else if (this.pacman.step > 1) {
                    this.pacman.step -= 1;
                    this.pacman_controls(key);
                }
                break;

            case 'ArrowRight':
                if (0 != this.board.board[this.pacman.position[0] + this.pacman.step][this.pacman.position[1]]) {

                    this.pacman.position[0] += this.pacman.step;
                    this.camera.position.x += this.pacman.step;
                    this.pacman.step = 1

                }
                else if (this.pacman.step > 1) {
                    this.pacman.step -= 1;
                    this.pacman_controls(key);
                }
                break;

            case 'ArrowDown':
                if (0 != this.board.board[this.pacman.position[0]][this.pacman.position[1] - this.pacman.step]) {
                    this.pacman.position[1] -= this.pacman.step;
                    this.camera.position.y -= this.pacman.step;
                    this.pacman.step = 1

                }
                else if (this.pacman.step > 1) {
                    this.pacman.step -= 1;
                    this.pacman_controls(key);
                }
                break;

            case 'ArrowUp':
                if (0 != this.board.board[this.pacman.position[0]][this.pacman.position[1] + this.pacman.step]) {
                    this.pacman.position[1] += this.pacman.step;
                    this.camera.position.y += this.pacman.step;
                    this.pacman.step = 1

                }
                else if (this.pacman.step > 1) {
                    this.pacman.step -= 1;
                    this.pacman_controls(key);
                }
                break;
        }
        this.pacman.update_movement();

        this.board.remove_coin(this.pacman.position)


        this.blue_ghost.find_pacman(this.pacman)
        this.orange_ghost.find_pacman(this.pacman)
        this.pink_ghost.find_pacman(this.pacman)
        this.red_ghost.find_pacman(this.pacman)

        for (const ghost of this.ghosts) {

            let c1 = (((this.pacman.position[0] > ghost.position[0]) && (lastpos[0] < ghost.position[0]))
                && (this.pacman.position[1] == ghost.position[1]));
            let c2 = (((this.pacman.position[0] < ghost.position[0]) && (lastpos[0] > ghost.position[0]))
                && (this.pacman.position[1] == ghost.position[1]));
            let c3 = (((this.pacman.position[1] > ghost.position[1]) && (lastpos[1] < ghost.position[1]))
                && (this.pacman.position[0] == ghost.position[0]));
            let c4 = (((this.pacman.position[1] < ghost.position[1]) && (lastpos[1] > ghost.position[1]))
                && (this.pacman.position[0] == ghost.position[0]));

            if (c1 || c2 || c3 || c4) {
                ghost.position = ghost.init_position.slice();
                ghost.update_movement();
            }

            if (ghost.position[0] == this.pacman.position[0]
                && ghost.position[1] == this.pacman.position[1]
                && ghost.is_dead == false
            ) {
                this.pacman.iframes = 10;
                this.pacman.lives -= 1;

                ghost.delay = 10;

            }



        }








    }


    set_camera_to_start() {

        this.camera.position.x = -56;
        this.camera.position.y = 40 - 2;
        this.camera.position.z = 10;

        this.camera.rotation.x = Math.PI / 5;

    }


    set_texture() {
        this.texture = new THREE.MeshLambertMaterial({ color: 0xEEEEEE, side: THREE.DoubleSide });
        this.texture2 = new THREE.MeshLambertMaterial({ color: 0x00EE11, side: THREE.DoubleSide });
        this.texture3 = new THREE.MeshLambertMaterial({ color: 0xFF2211, side: THREE.DoubleSide });
    }


    set_walls() {

        let wall_geo = new THREE.BoxGeometry(0.9, 0.6, 1);
        let coin_geo = new THREE.SphereGeometry(0.1, 16, 16);

        this.set_texture();
        this.walls.generate_paths();
        let pac_map = this.walls.grid;
        let dim = this.walls.dim;

        this.meshes = new Array(dim[0]).fill(undefined).map(
            () => new Array(dim[1]).fill(undefined)
        );

        for (let i = 0; i < dim[0]; i++) {
            for (let j = 0; j < dim[1]; j++) {
                switch (pac_map[i][j]) {
                    case 0:
                        this.meshes[i][j] = new THREE.Mesh(coin_geo, this.texture);
                        this.meshes[i][j].name = 'coin';
                        this.meshes[i][j].castShadow = true;
                        break;

                    case 1:
                        this.meshes[i][j] = new THREE.Mesh(wall_geo, this.texture);
                        this.meshes[i][j].name = 'wall0';
                        this.meshes[i][j].receiveShadow = true;
                        break;

                    case 2:
                        this.meshes[i][j] = new THREE.Mesh(wall_geo, this.texture);
                        this.meshes[i][j].name = 'wall1';
                        this.meshes[i][j].receiveShadow = true;
                        break;

                    case 3:
                        this.meshes[i][j] = new THREE.Mesh(wall_geo, this.texture);
                        this.meshes[i][j].name = 'wall2';
                        this.meshes[i][j].receiveShadow = true;
                        break;

                    default:
                        alert("Error in the wall constructor");
                        exit();
                }
                this.meshes[i][j].position.x = i - 56;
                this.meshes[i][j].position.y = j - 62;
                this.meshes[i][j].position.z = 0.5;


                this.scene.add(this.meshes[i][j]);
            }

        }

    };


    set_board() {
        //Comprobar la posición de pacman en el tablero 
        for (let i = 0; i < this.walls.dim[0]; i++) {
            for (let j = 0; j < this.walls.dim[1]; j++) {
                if (this.meshes[i][j]) {
                    this.meshes[i][j].position.x = 10000
                    this.scene.remove(this.meshes[i][j])

                    //this.meshes[i][j].geometry.dispose();
                    //this.meshes[i][j].material.dispose();
                    //this.meshes[i][j] = undefined;

                }

            }

        }
    }


    set_borders(x, y, len) {
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
            this.scene.add(this.borders[i]);
        }
    }


    each_frame() {

        this.set_board()

        if (this.board.score > 10000) {
            this.pacman.orbs += 1;
            this.board.score -= 10000;
        }

        this.renderer.render(this.scene, this.camera);


    }

}