import * as THREE from 'https://cdn.skypack.dev/three@0.120.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/loaders/GLTFLoader.js';
import { PacWalls } from './PacWalls.js';

export class PacMan {
    constructor() {



        this.meshes = [];

        this.step = 1;

        this.orbs = 0;


        this.position = [0, 108];

        this.lives = 3;

        this.iframes = 0;

    }
    add_mesh(model) {
        let p = this.convert2meshd()
        model.rotation.x = Math.PI / 2
        model.position.x = p[0];
        model.position.y = p[1];
        model.position.z = 0.5;
        model.castShadow = true;
        model.scale.set(0.5, 0.5, 0.5);
        
        this.meshes.push(model);
    }

    convert2meshd() {
        return [this.position[0] - 56, this.position[1] - 62]
    }

    update_movement() {
        this.meshes.forEach((m) => {
            m.position.x = this.position[0] - 56;
            m.position.y = this.position[1] - 62;
        });
    }
}



export class PacGhost {
    constructor(grid) {

        this.is_dead = false;

        this.meshes = [];

        this.grid = grid;


        this.position = [16, 108]
        this.random_spawn();
        this.init_position = this.position.slice();
        this.delay = 0
    }


    add_mesh(model) {
        let p = this.convert2meshd()
        model.scale.set(0.5, 0.5, 0.5);
        model.rotation.x = Math.PI / 2
        model.position.x = p[0];
        model.position.y = p[1];
        model.position.z = 1.5;
        model.castShadow = true;
        
        this.meshes.push(model);
    }


    convert2meshd() {
        return [this.position[0] - 56, this.position[1] - 62]
    }


    update_movement() {
        this.meshes.forEach((m) => {
            m.position.x = this.position[0] - 56;
            m.position.y = this.position[1] - 62;
        });
    }


    random_spawn() {
        let spawn_x = Math.floor(Math.random() * this.grid[0].length);
        let spawn_y = Math.floor(Math.random() * this.grid.length);
        if (this.grid[spawn_y][spawn_x] != 0) {
            this.position[0] = spawn_x;
            this.position[1] = spawn_y;
            this.position = [spawn_x, spawn_y]
        } else {
            this.random_spawn();
        }
    }


    find_pacman(pacman) {
        if (this.delay == 0) {
            if (this.position[0] < pacman.position[0] && this.grid[this.position[0] + 1][this.position[1]] != 0) {
                this.position[0] += 1;

            } else if (this.position[0] > pacman.position[0] && this.grid[this.position[0] - 1][this.position[1]] != 0) {
                this.position[0] -= 1;

            } if (this.position[1] < pacman.position[1] && this.grid[this.position[0]][this.position[1] + 1] != 0) {
                this.position[1] += 1;

            } else if (this.position[1] > pacman.position[1] && this.grid[this.position[0]][this.position[1] - 1] != 0) {
                this.position[1] -= 1;
            }
            this.update_movement();
        } else if (this.delay > 0) {
            this.delay -= 1;
        } else {
            this.delay = 0;
        }
    }
}