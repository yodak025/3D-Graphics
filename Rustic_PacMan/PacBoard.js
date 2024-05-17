
export class PacBoard {
    constructor(board, polly, dim, scene) {

        this.board = []
        this.grid = polly
        this.scene = scene
        this.dim = dim
        this.score = 0

        let aux = [];

        for(let i = 0; i < this.dim[0]; i++){
            aux = [];
            for(let j = 0; j < this.dim[1]; j++){
                switch(board[i][j]){
                    case 0:
                        aux.push(1);
                        break;
                    default:
                        aux.push(0);
                }
            }
            this.board.push(aux);
        }


 
    }
    remove_coin(pos){
        if(this.board[pos[0]][pos[1]] == 1){
            this.board[pos[0]][pos[1]] = -1;
            this.score += 100;
            this.scene.remove(this.grid[pos[0]][pos[1]])
            return true
        }
        return false
    }




    
}