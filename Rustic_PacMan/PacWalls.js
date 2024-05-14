
export class PacWalls {
    constructor(dimensions) {
        this.walls = new PacLayers(dimensions);
        this.dim = [4 * dimensions[0], 4 * dimensions[1]]
        this.grid = [];
    }


    generate_paths() {
        this.grid = this.walls.path();
    }


}



class PacLayers {
    constructor(dimensions) {
        this.dim = dimensions.slice();

        this.layer1 = new PacBoxes(dimensions);
        this.layer2 = new PacBoxes(dimensions);
        this.layer3 = new PacBoxes(dimensions);
        this.layer4 = new PacBoxes(dimensions);

        this.layers = [];


        this.dim[1] = 4 * this.dim[1];

    }


    _create_layerpaths() {

        const random_int_4 = () => {
            return (((this.dim[1] / 4) - 1) / 2
                + Math.floor((Math.random() * 4)) * this.dim[1] / 4
            );
        }

        let path_position = Array(4).fill().map(random_int_4);

        for (let l = 0; l < this.layers.length; l++) {
            change_range(1, [0, 0], [0, this.dim[1]], this.layers[l], 2);
            change_range(1, [this.dim[0] - 1, 0], [this.dim[0] - 1, this.dim[1]], this.layers[l], 2);

            for (let j = 0; j < this.dim[1]; j++) {
                if (j == path_position[l]) {

                    change_range(0, [this.dim[0] / 2, j], [this.dim[0], j], this.layers[l], 2);

                    change_range(0, [this.dim[0] - 5, j], [this.dim[0] - 5, j + 4], this.layers[l], 2);
                    change_range(0, [this.dim[0] - 5, j - 4], [this.dim[0] - 5, j], this.layers[l], 2);

                    change_range(0, [this.dim[0] - 5, j + 4], [this.dim[0] - 1, j + 4], this.layers[l], 2);
                    change_range(0, [this.dim[0] - 5, j - 4], [this.dim[0] - 1, j - 4], this.layers[l], 2);

                    change_range(1, [this.dim[0] - 2, j + 1], [this.dim[0] - 2, j + 3], this.layers[l], 2);
                    change_range(1, [this.dim[0] - 2, j - 3], [this.dim[0] - 2, j - 1], this.layers[l], 2);

                    change_range(0, [this.dim[0] - 5, j], [this.dim[0], j], this.layers[l], 2);

                } if (l > 0 & j == path_position[l - 1]) {

                    change_range(0, [0, j], [this.dim[0] / 2, j], this.layers[l], 2);

                    change_range(0, [4, j], [4, j + 4], this.layers[l], 2);
                    change_range(0, [4, j - 4], [4, j], this.layers[l], 2);

                    change_range(0, [1, j + 4], [4, j + 4], this.layers[l], 2);
                    change_range(0, [1, j - 4], [4, j - 4], this.layers[l], 2);

                    change_range(1, [1, j + 1], [2, j + 3], this.layers[l], 2);
                    change_range(1, [1, j - 3], [2, j - 1], this.layers[l], 2);


                } else if (l == 0) {

                    let k = (((this.dim[1] / 4) - 1) / 2) + 93;

                    change_range(0, [0, k], [this.dim[0] / 2, k], this.layers[l], 2);

                    change_range(0, [5, k], [5, k + 4], this.layers[l], 2);
                    change_range(0, [5, k - 4], [5, k], this.layers[l], 2);

                    change_range(0, [1, k + 4], [5, k + 4], this.layers[l], 2);
                    change_range(0, [1, k - 4], [5, k - 4], this.layers[l], 2);

                    change_range(1, [1, k + 1], [2, k + 3], this.layers[l], 2);
                    change_range(1, [1, k - 3], [2, k - 1], this.layers[l], 2);

                }
            }
        }




    }


    mazepaths_phase_01() {
        for (let l = 0; l < this.layers.length; l++) {
            let phase = Math.floor(Math.random() * 6)

            for (let j = 0; j < this.dim[1]; j++) {
                let t_type = (j + phase) % 6

                if (t_type == 0) {

                    change_range(0, [this.dim[0] / 2 - 5, j], [this.dim[0] / 2 + 5, j], this.layers[l], 2);
                    change_range(2, [this.dim[0] / 2 - 4, j], [this.dim[0] / 2 + 4, j], this.layers[l], 2)
                    change_range(0, [this.dim[0] / 2 - 5, j + 1], [this.dim[0] / 2 + 5, j + 1], this.layers[l], 2);
                    change_range(2, [this.dim[0] / 2 - 4, j + 1], [this.dim[0] / 2 + 4, j + 1], this.layers[l], 2)

                } else if (t_type == 3) {

                    change_range(0, [this.dim[0] / 2 - 2, j], [this.dim[0] / 2 + 2, j], this.layers[l], 2);
                    change_range(2, [this.dim[0] / 2 - 1, j], [this.dim[0] / 2 + 1, j], this.layers[l], 2);
                    change_range(0, [this.dim[0] / 2 - 2, j + 1], [this.dim[0] / 2 + 2, j + 1], this.layers[l], 2);
                    change_range(2, [this.dim[0] / 2 - 1, j + 1], [this.dim[0] / 2 + 1, j + 1], this.layers[l], 2);
                    change_range(0, [this.dim[0] / 2 - 5, j + 2], [this.dim[0] / 2 + 5, j + 2], this.layers[l], 2);
                    change_range(2, [this.dim[0] / 2 - 1, j + 2], [this.dim[0] / 2 + 1, j + 2], this.layers[l], 2);

                } else if (t_type == 2) {
                    change_range(0, [this.dim[0] / 2 - 5, j], [this.dim[0] / 2 + 5, j], this.layers[l], 2);
                }

            }
        }
    }


    mazepaths_phase_02() {
        let x0 = this.dim[0] / 2;
        for (let l = 0; l < this.layers.length; l++) {
            for (let j = 0; j < this.dim[1] - 1; j++) {

                let c0 = (this.layers[l][x0 + 1][j] == 0)
                let c1 = (this.layers[l][x0 + 2][j] == 1)
                let c2 = (this.layers[l][x0 + 3][j] == 1) && (this.layers[l][x0 + 4][j] == 1)

                let c3 = (this.layers[l][x0 + 1][j + 1] == 0)
                let c4 = (this.layers[l][x0 + 2][j + 1] == 1)
                let c5 = (this.layers[l][x0 + 3][j + 1] == 1) && (this.layers[l][x0 + 4][j] == 1)

                let ca = (this.layers[l][x0 - 2][j] == 0)
                let cb = (this.layers[l][x0 - 3][j] == 1)
                let cc = (this.layers[l][x0 - 4][j] == 1) && (this.layers[l][x0 - 5][j] == 1)

                let cd = (this.layers[l][x0 - 2][j + 1] == 0)
                let ce = (this.layers[l][x0 - 3][j + 1] == 1)
                let cf = (this.layers[l][x0 - 4][j + 1] == 1) && (this.layers[l][x0 - 5][j] == 1)

                let c_pos = c0 && c1 && c2 && c3 && c4 && c5
                let c_neg = ca && cb && cc && cd && ce && cf

                if (c_pos || c_neg) {
                    
                    let xlen = Math.floor(Math.random() * 9);
                    let xpos = Math.floor(xlen / 3) * 3 + 1;
                    let ylen = Math.floor(Math.random() * 9);
                    let ydir = Math.floor(Math.random() * 2) + 1;

                    if (c_pos && c_neg) {


                        change_range(0, [x0 + 2 - 1, j - 1], [x0 + xlen + 5 + 1, j + 1 + 1], this.layers[l], 2);
                        change_range(0, [x0 + xpos + 4 - 1, j - 1], [x0 + xpos + 6 + 1, j + 1 + ylen + 1], this.layers[l], 2);
                        change_range(3, [x0 + 2, j], [x0 + xlen + 5, j + 1], this.layers[l], 2);
                        change_range(3, [x0 + xpos + 4, j], [x0 + xpos + 6, j + 1 + ylen], this.layers[l], 2);

                        change_range(0, [x0 - xlen - 5 - 1, j - 1], [x0 - 2, j + 1 + 1], this.layers[l], 2);
                        change_range(0, [x0 - xpos - 6 - 1, j - 1], [x0 - xpos - 4, j + ylen + 1 + 1], this.layers[l], 2);
                        change_range(3, [x0 - xlen - 5, j], [x0 - 2, j + 1], this.layers[l], 2);
                        change_range(3, [x0 - xpos - 6, j], [x0 - xpos - 4, j + 1 + ylen], this.layers[l], 2);

                    } else {

                        if (c_pos) {

                            change_range(3, [x0 + 2, j], [x0 + xlen + 5, j + 1], this.layers[l], 2);
                            change_range(3, [x0 + xpos + 4, j], [x0 + xpos + 6, j + 1 + ylen], this.layers[l], 2);
                        }

                        if (c_neg) {

                            change_range(3, [x0 - xlen - 5, j - 1], [x0 - 2, j], this.layers[l], 2);
                            change_range(3, [x0 - xpos - 6, j - ylen - 1], [x0 - xpos - 4, j], this.layers[l], 2);

                        }
                    }
                }
            }
        }
    }



    path() {
        // Genera los cambios a nivel de box.

        this.layer1.path();
        this.layer2.path();
        this.layer3.path();
        this.layer4.path();

        // Carga los layers.

        this.layers = [
            this.layer1.get_boxes(),
            this.layer2.get_boxes(),
            this.layer3.get_boxes(),
            this.layer4.get_boxes()
        ];

        // Genera cambios a nivel de layer. 

        this.mazepaths_phase_01();
        this.mazepaths_phase_02();

        this._create_layerpaths();

        // Devuelve la matriz grid.

        return this.get_layers();
    }


    get_layers() {
        let layers = [];

        return layers.concat(
            this.layers[0],
            this.layers[1],
            this.layers[2],
            this.layers[3]
        );
    }

}



class PacBoxes {
    constructor(dimensions) {
        this.dim = dimensions;

        this.box1 = new Array(this.dim[0]).fill(1).map(
            () => new Array(this.dim[1]).fill(1)
        );
        this.box2 = new Array(this.dim[0]).fill(1).map(
            () => new Array(this.dim[1]).fill(1)
        );
        this.box3 = new Array(this.dim[0]).fill(1).map(
            () => new Array(this.dim[1]).fill(1)
        );
        this.box4 = new Array(this.dim[0]).fill(1).map(
            () => new Array(this.dim[1]).fill(1)
        );

        this.boxes = [
            this.box1,
            this.box2,
            this.box3,
            this.box4
        ];


    }


    _create_borderpaths() {
        for (let box = 0; box < 4; box++) {
            for (let i = 0; i < this.dim[0]; i++) {
                for (let j = 0; j < this.dim[1]; j++) {
                    if (i == 0) {
                        this.boxes[box][i + 1][j] = 0;
                    } else if (i == this.dim[0] - 1) {
                        this.boxes[box][i - 1][j] = 0;
                    }
                }
            }
        }
    }


    _create_middlepaths() {
        let middle1 = Math.floor((this.dim[0] / 2) - 1);
        let middle2 = Math.floor(this.dim[0] / 2);


        for (let box = 0; box < 4; box++) {
            for (let j = 0; j < this.dim[1]; j++) {
                this.boxes[box][middle1][j] = 0;
                this.boxes[box][middle2][j] = 0;
            }
        }
    }

    _create_edgepaths() {
        change_range(0, [2, 0], [26, 0], this.box1, 2)
        change_range(0, [2, 30], [26, 30], this.box4, 2)
    }


    path() {
        this._create_borderpaths();
        this._create_middlepaths();
        this._create_edgepaths();
    }


    get_boxes() {
        let boxes = [];
        let c_boxes = [];

        c_boxes.push(
            this.box1,
            this.box2,
            this.box3,
            this.box4
        );

        for (let i = 0; i < this.dim[0]; i++) {
            boxes.push([
                ...c_boxes[0][i],
                ...c_boxes[1][i],
                ...c_boxes[2][i],
                ...c_boxes[3][i]
            ]);
        }

        return boxes;
    }
}



const change_range = (n, min, max, array, dim) => {
    switch (dim) {
        case 1:
            for (let i = min; i <= max; i++) {
                array[i] = n;
            }
            break;

        case 2:
            for (let j = min[1]; j <= max[1]; j++) {
                if (min[0] == max[0]) {
                    array[min[0]][j] = n;
                }
                for (let i = min[0]; i < max[0]; i++) {

                    array[i][j] = n;
                }
            }
            break;

        default:
            console.log("error with 'change_range()' function: dim value not allowed");
            break;

    }
}