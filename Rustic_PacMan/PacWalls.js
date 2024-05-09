
export class PacWalls {
    constructor(dimensions) {
        this.walls = new PacLayers(dimensions);
        this.dimensions = {
            global: [4 * dimensions[0], 4 * dimensions[1]],
            box: dimensions,
        }
    }


    get_walls() {
        return this.walls.get_layers();
    }

}



class PacLayers {
    constructor(dimensions) {
        this.dim = dimensions.slice();

        this.layer1 = new PacBoxes(dimensions);
        this.layer2 = new PacBoxes(dimensions);
        this.layer3 = new PacBoxes(dimensions);
        this.layer4 = new PacBoxes(dimensions);


        this.dim[1] = 4 * this.dim[1];

    }


    get_layers() {
        let layers = [];
        let c_boxes = [];

        c_boxes.push(
            this.layer1.get_boxes(),
            this.layer2.get_boxes(),
            this.layer3.get_boxes(),
            this.layer4.get_boxes()
        );

        for (let i = 0; i < 4 * this.dim[0]; i++) {
            layers.push([
                ...c_boxes[0][i],
                ...c_boxes[1][i],
                ...c_boxes[2][i],
                ...c_boxes[3][i]
            ]);
        }

        return layers;
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

    _create_layerpaths() {
        let path_position = Math.floor(Math.random() * (this.dim[1] - 10) + 5);;

        let r_box = Math.floor(Math.random() * 4);
        for (let j = 0; j < this.dim[1]; j++) {
            if (j == path_position) {
                change_range(0, [this.dim[0] - 5, j], [this.dim[0], j], this.boxes[r_box], 2);
                return
            }
        }


    }

    create_paths() {
        this._create_borderpaths();
        this._create_layerpaths();
    }


    get_boxes() {
        let boxes = [];

        this.create_paths();

        return boxes.concat(
            this.box1,
            this.box2,
            this.box3,
            this.box4
        );
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
            for (let i = min[0]; i < max[0]; i++) {
                for (let j = min[1]; j <= max[1]; j++) {
                    array[i][j] = n;
                }
            }
            break;

        default:
            console.log("error with 'change_range()' function: dim value not allowed");
            break;

    }
}