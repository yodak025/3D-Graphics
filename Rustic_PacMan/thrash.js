switch (paths) {
    case 0: // no hay camino
        this.random_spawn()
        break

    case 1: // derecha
        this.direction = [1, 0];
        break;

    case 2: // izquierda
        this.direction = [-1, 0];
        break;
    
    case 3: // derecha + izquierda
        break;
        
    case 4: // arriba 
        this.direction = [0, 1];
        break;

    case 5: // arriba + derecha
        this.__decide_direction(pacman, 1, 0, 1, 0)
        break;

    case 6: // arriba + izquierda
        this.__decide_direction(pacman, 0, 1, 1, 0)
        break;

    case 7: // arriba + izquierda + derecha
        this.__decide_direction(pacman, 1, 1, 1, 0)
        break;

    case 8: // abajo
        this.direction = [0, -1];
        break;
    
    case 9: // abajo + derecha
        this.__decide_direction(pacman, 1, 0, 0, 1)
        break;
    
    case 10: // abajo + izquierda
        this.__decide_direction(pacman, 0, 1, 0, 1)
        break;

    case 11: // abajo + izquierda + derecha
        this.__decide_direction(pacman, 1, 1, 0, 1)
        break;
    
    case 12: // arriba + abajo
        break;

    case 13: // arriba + abajo + derecha
        this.__decide_direction(pacman, 1, 0, 1, 1)
        break;

    case 14: // arriba + abajo + izquierda
        this.__decide_direction(pacman, 0, 1, 1, 1)
        break;

    case 15: // arriba + abajo + izquierda + derecha
        this.__decide_direction(pacman, 1, 1, 1, 1)
        break;
    

}