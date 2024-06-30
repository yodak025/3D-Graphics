import * as THREE from 'https://cdn.skypack.dev/three@0.120.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/loaders/GLTFLoader.js';
import { PacWalls } from './PacWalls.js';
import { Node } from './PacDijsktra.js';


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
    constructor(position) {
        this.direction = [0, 0];

        this.is_dead = false;
        this.meshes = [];


        this.position = [position[0], position[1]]
        //this.random_spawn();
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
        let spawn = Math.floor(Math.random() * this.board.nodes.length - 1);
        this.position[0] = this.board.nodes[spawn].x;
        this.position[1] = this.board.nodes[spawn].y;
        this.update_movement();

    }
}