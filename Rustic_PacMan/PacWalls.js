
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
            return ( ((this.dim[1]/4) - 1) / 2
                + Math.floor((Math.random() * 4)) * this.dim[1]/4 
            );
        }
        
        let path_position = Array(4).fill().map(random_int_4);

        for (let l = 0; l < this.layers.length; l++) {
            for (let j = 0; j < this.dim[1]; j++) {
                if (j == path_position[l]) {

                    change_range(0, [this.dim[0]/2, j], [this.dim[0], j], this.layers[l], 2);

                    change_range(0, [this.dim[0] - 7, j], [this.dim[0] - 7, j + 6], this.layers[l], 2);
                    change_range(0, [this.dim[0] - 7, j - 6], [this.dim[0] - 7, j], this.layers[l], 2);

                    change_range(0, [this.dim[0] - 7, j + 6], [this.dim[0] - 1, j + 6], this.layers[l], 2);
                    change_range(0, [this.dim[0] - 7, j - 6], [this.dim[0] - 1, j - 6], this.layers[l], 2);

                    change_range(1, [this.dim[0] - 2, j + 1], [this.dim[0] - 2, j + 5], this.layers[l], 2);
                    change_range(1, [this.dim[0] - 2, j - 5], [this.dim[0] - 2, j - 1], this.layers[l], 2);

                    change_range(0, [this.dim[0] - 5, j], [this.dim[0], j], this.layers[l], 2);

                }if(l > 0 & j == path_position[l - 1]){

                    change_range(0, [0, j], [this.dim[0]/2, j], this.layers[l], 2);

                    change_range(0, [7, j], [7, j + 6], this.layers[l], 2);
                    change_range(0, [7, j - 6], [7, j], this.layers[l], 2);

                    change_range(0, [1, j + 6], [7, j + 6], this.layers[l], 2);
                    change_range(0, [1, j - 6], [7, j - 6], this.layers[l], 2);

                    change_range(1, [1, j + 1], [2, j + 5], this.layers[l], 2);
                    change_range(1, [1, j - 5], [2, j - 1], this.layers[l], 2);


                }else if(l == 0){

                    let k = (((this.dim[1]/4) - 1) / 2) + 93;

                    change_range(0, [0, k], [this.dim[0]/2, k], this.layers[l], 2);

                    change_range(0, [7, k], [7, k + 6], this.layers[l], 2);
                    change_range(0, [7, k - 6], [7, k], this.layers[l], 2);

                    change_range(0, [1, k + 6], [7, k + 6], this.layers[l], 2);
                    change_range(0, [1, k - 6], [7, k - 6], this.layers[l], 2);

                    change_range(1, [1, k + 1], [2, k + 5], this.layers[l], 2);
                    change_range(1, [1, k - 5], [2, k - 1], this.layers[l], 2);

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
        let middle1 = Math.floor(this.dim[0] / 2);
        let middle2 = Math.floor((this.dim[0] / 2) + 1);


        for (let box = 0; box < 4; box++) {
            for (let j = 0; j < this.dim[1]; j++) {
                this.boxes[box][middle1][j] = 0;
                this.boxes[box][middle2][j] = 0;
            }
        }
    }



    path() {
        this._create_borderpaths();
        this._create_middlepaths();
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