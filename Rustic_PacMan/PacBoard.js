import { crearNodos } from './PacDijsktra.js';
import { dijkstraConRetardos } from './PacDijsktra.js';
import { encontrarNodoViaID } from './PacDijsktra.js';
import { PacGhost } from './PacEntities.js';

// A removecoin hay que darle una vueltecita.

export class PacBoard {
    constructor(walls, polly, dim, scene) {

        this.walls = walls.slice()
        this.paths = []
        this.corners = []
        this.nodes = null
        this.scene = scene
        this.meshes = polly
        this.dim = dim
        this.score = 0

        this.ghosts = []

        this.models = {
            blue_ghost: null,
        }


        

        // nombres de mierda, corners son las direcciones disponibles, y paths es el tablero del suelo. Cambia el let paths por ser inconsistente


    }
    init_board(){

        let p_aux = [];
        let c_aux = [];


        for (let i = 0; i < this.dim[0]; i++) {
            p_aux = [];
            c_aux = [];
            for (let j = 0; j < this.dim[1]; j++) {
                switch (this.walls[i][j]) {
                    case -1:
                        p_aux.push(-1)
                        let blue_ghost = new PacGhost([i, j]);
                        blue_ghost.add_mesh(this.models.blue_ghost);
                        this.scene.add(blue_ghost.meshes[0]);
                        this.ghosts.push(blue_ghost);
                        c_aux.push(this.__find_directions(i, j));
                        break;

                    case 0:
                        p_aux.push(1);

                        c_aux.push(this.__find_directions(i, j));

                        break;
                    default:
                        p_aux.push(0);
                        c_aux.push(-1);
                }
            }
            this.paths.push(p_aux);
            this.corners.push(c_aux);
        }

        this.nodes = crearNodos(this.corners, this.paths);

    }


    __find_directions(i, j) {
        let paths = 0;

        if (this.walls[i + 1]) {
            if (this.walls[i + 1][j] == 0) {
                paths += 1;

            }
        }
        if (this.walls[i - 1]) {
            if (this.walls[i - 1][j] == 0) {
                paths += 2;

            }
        }
        if (this.walls[i][j + 1] != undefined) {
            if (this.walls[i][j + 1] == 0) {
                paths += 4;

            }
        }
        if (this.walls[i][j - 1] != undefined) {
            if (this.walls[i][j - 1] == 0) {
                paths += 8;

            }
        }
        return paths;
    }


    remove_coin(pos) {
        if (this.paths[pos[0]][pos[1]] == 1) {
            this.paths[pos[0]][pos[1]] = -1;
            this.score += 100;
            this.scene.remove(this.meshes[pos[0]][pos[1]])
            return true
        }
        return false
    }


    find_pacman(pacman) {

        for (const ghost of this.ghosts) {
            if (this.paths[ghost.position[0]][ghost.position[1]] == 0) {
                ghost.random_spawn();
            }

            if (ghost.delay == 0) {

                let origin = this.nodes.find(
                    node => node.x == ghost.position[0] && node.y == ghost.position[1]
                )

                let pac_node = this.nodes.find(
                    node => node.x == pacman.position[0] && node.y == pacman.position[1]
                )

                let bg = encontrarNodoViaID(this.nodes, "blue_ghost") 

                let route = dijkstraConRetardos(this.nodes, bg, pac_node)

                ghost.position[0] = route[1].x;
                ghost.position[1] = route[1].y;

                ghost.update_movement();

            } else if (ghost.delay > 0) {
                ghost.delay -= 1;
            } else {
                ghost.delay = 0;
            }
        }


    }

}