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
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.01,
            1000
        );

        this.sunLight = new THREE.PointLight("#ccffcc");
        this.__set_light();


        this.floor = this.__set_floor();
        this.walls = new PacWalls([28, 31]);
        this.borders = [];
        this.meshes = undefined;
        this.set_walls();

        this.pacman = new PacMan()
        this.ghost0 = new PacGhost(this.walls.grid);
        this.scene.add(this.pacman.mesh);
        this.scene.add(this.ghost0.mesh);

        this.board = new PacBoard(this.walls.grid, this.meshes, this.walls.dim, this.scene);
    }

    __set_light() {
        this.sunLight.position.set(0, 0, 100);
        this.sunLight.intensity = 1;
        this.sunLight.distance = 1000;

        this.scene.add(this.sunLight);
    }


    __set_floor() {
        const floor = new THREE.PlaneGeometry(112, 124);
        const floor_blue = new THREE.MeshLambertMaterial({ color: 0x051F42, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(floor, floor_blue);

        this.scene.add(plane);
        return plane
    }


    pacman_controls(key) {
        let step = 1;

        switch (key) {
            case 'a': if (0 != this.board.board[this.pacman.position[0] - 1][this.pacman.position[1]]){
                this.pacman.mesh.position.x -= step;
                this.pacman.position[0] -= step;
                this.camera.position.x -= step;
                this.board.remove_coin([this.pacman.mesh.position.x + 56, this.pacman.mesh.position.y + 62])
                this.ghost0.find_pacman(this.pacman.position)
            }
                break;

            case 'd':
                if (0 != this.board.board[this.pacman.position[0] + 1][this.pacman.position[1]]) {

                    this.pacman.mesh.position.x += step;
                    this.pacman.position[0] += step;
                    this.camera.position.x += step;
                    this.board.remove_coin([this.pacman.mesh.position.x + 56, this.pacman.mesh.position.y + 62])
                    this.ghost0.find_pacman(this.pacman.position)
                    
                }
                break;

            case 's':
                if (0 != this.board.board[this.pacman.position[0]][this.pacman.position[1] - 1]) {
                    this.pacman.mesh.position.y -= step;
                    this.pacman.position[1] -= step;
                    this.camera.position.y -= step;
                    this.board.remove_coin([this.pacman.mesh.position.x + 56, this.pacman.mesh.position.y + 62])
                    this.ghost0.find_pacman(this.pacman.position)
                }
                break;

            case 'w':
                if (0 != this.board.board[this.pacman.position[0]][this.pacman.position[1] + 1]) {
                    this.pacman.mesh.position.y += step;
                    this.pacman.position[1] += step;
                    this.camera.position.y += step;
                    this.board.remove_coin([this.pacman.mesh.position.x + 56, this.pacman.mesh.position.y + 62])
                    this.ghost0.find_pacman(this.pacman.position)
                }
                break;
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

        let wall_geo = new THREE.BoxGeometry(0.9, 0.9, 1);
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
                        break;

                    case 1:
                        this.meshes[i][j] = new THREE.Mesh(wall_geo, this.texture);
                        this.meshes[i][j].name = 'wall0';
                        break;

                    case 2:
                        this.meshes[i][j] = new THREE.Mesh(wall_geo, this.texture2);
                        this.meshes[i][j].name = 'wall1';
                        break;

                    case 3:
                        this.meshes[i][j] = new THREE.Mesh(wall_geo, this.texture3);
                        this.meshes[i][j].name = 'wall2';
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
        this.pacman.mesh.rotation.x += 0.01;
        this.pacman.mesh.rotation.y += 0.02;

        this.set_board()

        this.renderer.render(this.scene, this.camera);


    }



}