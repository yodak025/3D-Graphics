import * as THREE from 'https://cdn.skypack.dev/three@0.120.0/build/three.module.js';
import { PacWalls } from './PacWalls.js';

export class PacMan {
    constructor() {

        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);

        this.mesh.position.x = -56;
        this.mesh.position.y = 46;
        this.mesh.position.z = 0.5;

        this.position = [0, 108];

        this.lives = 5;

        this.iframes = 0;

    }
}

export class PacGhost {
    constructor(grid) {
        var geometry = new THREE.SphereGeometry(1, 10, 10);
        var material = new THREE.MeshNormalMaterial();

        this.mesh = new THREE.Mesh(geometry, material);

        this.grid = grid;

        //this.random_spawn();
        this.mesh.position.x = -40;
        this.mesh.position.y = 46;
        this.mesh.position.z = 0.5;

        this.position = [16, 108]
        this.delay = 0
    }

    random_spawn() {
        let spawn_x = Math.floor(Math.random() * this.grid[0].length);
        let spawn_y = Math.floor(Math.random() * this.grid.length);
        if (this.grid[spawn_y][spawn_x] == 0) {
            this.mesh.position.x = spawn_x - 56;
            this.mesh.position.y = spawn_y - 62;
            this.position = [spawn_x, spawn_y]
        } else {
            this.random_spawn(this.grid);
        }
    }

    find_pacman(position) {
        if (this.delay == 0) {
            if (this.position[0] < position[0] && this.grid[this.position[0] + 1][this.position[1]] == 0) {
                this.mesh.position.x += 1;
                this.position[0] += 1;

            } else if (this.position[0] > position[0] && this.grid[this.position[0] - 1][this.position[1]] == 0) {
                this.mesh.position.x -= 1;
                this.position[0] -= 1;

            } if (this.position[1] < position[1] && this.grid[this.position[0]][this.position[1] + 1] == 0) {
                this.mesh.position.y += 1;
                this.position[1] += 1;

            } else if (this.position[1] > position[1] && this.grid[this.position[0]][this.position[1] - 1] == 0) {
                this.mesh.position.y -= 1;
                this.position[1] -= 1;
            }
        }
    }
}