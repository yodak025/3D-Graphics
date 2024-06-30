// Código extraido de los apuntes del profesor Jesus Antonio García-Parrado Alameda, 
// de la asignatura Construcción de Servicios y Aplicaciones Audiovisuales en Internet.


// Clase para representar un nodo en el grafo
export class Node {

  constructor(id, x, y, delay) {
    this.id = id; // Identificador del nodo
    this.x = x; // Coordenada X del nodo
    this.y = y; // Coordenada Y del nodo
    this.delay = delay; // Retardo del nodo en milisegundos
    this.links = []; // Array de conexiones a otros nodos
  }

  // Método para agregar una conexión desde este nodo a otro nodo con un peso dado
  connect(node, weight) {
    this.links.push({ node, weight });
  }

  remove(nodeToRemove) {
    const index = this.links.findIndex(link => link.node === nodeToRemove);
    if (index !== -1) {
      this.links.splice(index, 1); // Elimina el nodo de la lista
      nodeToRemove.remove(this); // Elimina este nodo de la lista del nodo a eliminar
    }
  }

  next_link(dir) {
    switch (dir) {
      case 'up':
        for (const link of this.links) {
          if (link.node.x != this.x) {
            if (link.node.y < this.y) {
              return link;
            }
          }
        }
        break;
      case 'down':
        for (const link of this.links) {
          if (link.node.x != this.x) {
            if (link.node.y < this.y) {
              return link;
            }
          }
        }
        break;
      case 'left':
        for (const link of this.links) {
          if (link.node.x != this.x) {
            if (link.node.y < this.y) {
              return link;
            }
          }
        }
        break;
      case 'right':
        for (const link of this.links) {
          if (link.node.x != this.x) {
            if (link.node.y < this.y) {
              return link;
            }
          }
        }
        break;
      default:
        console.error("Node.next_link: direction is not supported: direction=" + dir);
        return null;
    }

  }
}

export class DynamicNode extends Node {
  constructor(id, x, y, delay) {
    super(id, x, y, delay);
  }

  move(delta_x, delta_y) {
    let direccion = '';
    if (delta_x == 1) {
      direccion = 'right';
    } else if (delta_x == -1) {
      direccion = 'left';
    } else if (delta_y == 1) {
      direccion = 'up';
    } else if (delta_y == -1) {
      direccion = 'down';
    } else {
      console.error("DynamicNode.move: unable to determinate direction: delta_x=" + delta_x + ", delta_y=" + delta_y);
      return -1;
    }

    if (this.links.length == 1) {
      let actual_node = this.links[0].node;
      let { next_node, next_weight } = actual_node.next_link(direccion);

      this.connect(next_node, next_weight - 1);
      next_node.connect(this, next_weight - 1);

      if (next_weight == 1) {
        this.remove(actual_node);
      } else {
        this.links[0].weight += 1;
      }
    } else {
      let { next_node, next_weight } = this.next_link(direccion);

      if (next_weight == 1) {
        for (const link of this.links) {
          if (link.node != next_node) {
            this.remove(link.node);
          } else {
            link.weight = 0;
          }
        }
      } else {
        for (const link of this.links) {
          if (link.node != next_node) {
            link.weight += 1;
          } else {
            link.weight -= 1;
          }
        }
      }
    }

    this.x += delta_x;
    this.y += delta_y;

  }



}


export function crearNodos(caminos, casillas) {
  let nodos = [];
  let id = 0;

  // Crear nodos basados en el tablero
  for (let x = 0; x < caminos.length; x++) {
    for (let y = 0; y < caminos[x].length; y++) {
      if (caminos[x][y] !== -1) {
        let delay = calcularDelay(caminos[x][y]); // Suponiendo que tienes una función para calcular el retardo, QUE NO LO TENGO; Susurro y pienso
        if(casillas[x][y] == -1){
          let Dnode = new DynamicNode("blue_ghost", x, y, delay);
          nodos.push(Dnode);
        }
        let nodo = new Node(id++, x, y, delay);
        nodos.push(nodo);
      }
    }
  }

  // Conectar nodos
  for (let nodo of nodos) {
    let dir_val = caminos[nodo.x][nodo.y];
    let direcciones = obtenerDirecciones(dir_val);

    if (dir_val != 12 & dir_val != 3 | nodo instanceof DynamicNode) {
      for (let direccion of direcciones) {
        let x = nodo.x + direccion.x;
        let y = nodo.y + direccion.y;
        let vecino = encontrarNodo(nodos, x, y);
        let n_value = caminos[x][y];
        if (vecino) {
          let weight = 0;
          while (n_value == 12) {

            weight += 1;
            if (nodo.y < vecino.y) {
              y += 1
            }
            else if (nodo.y > vecino.y) {
              y -= 1
            }
            else {
              Error("Error logico en la generación de conexión de los nodos ")
            }

            remove_node(nodos, vecino);
            vecino = encontrarNodo(nodos, x, y);
            n_value = caminos[x][y];
          }

          while (n_value == 3) {

            weight += 1;

            if (nodo.x < vecino.x) {
              x += 1
            }
            else if (nodo.x > vecino.x) {
              x -= 1
            }
            else {
              Error("Error logico en la generación de conexión de los nodos ")
            }
            remove_node(nodos, vecino);
            vecino = encontrarNodo(nodos, x, y);
            n_value = caminos[x][y];
          }

          nodo.connect(vecino, weight);
        }
      }
    }
  }
  return nodos;
}


export function createPacmanNode(x, y) {
  let nodo = new Node(0, x, y, 0);
  return nodo;
}

function calcularDelay(valor) {
  // Implementa tu lógica para calcular el retardo aquí
  return 0;
}

function obtenerDirecciones(valor) {
  let direcciones = [];
  if (valor & 1) direcciones.push({ x: 1, y: 0 }); // Derecha
  if (valor & 2) direcciones.push({ x: -1, y: 0 }); // Izquierda
  if (valor & 4) direcciones.push({ x: 0, y: 1 }); // Arriba
  if (valor & 8) direcciones.push({ x: 0, y: -1 }); // Abajo
  return direcciones;
}

export function encontrarNodo(nodos, x, y) {
  return nodos.find(nodo => nodo.x === x && nodo.y === y);
}

export function encontrarNodoViaID(nodos, id) {
  return nodos.find(nodo => nodo.id === id);
}

function remove_node(nodes, node) {
  nodes.splice(nodes.indexOf(node), 1);
}


export function dijkstraConRetardos(red, origen, destino) {
  const distancia = {}; // Almacena la distancia mínima desde el nodo origen hasta cada nodo
  const anterior = {}; // Almacena el nodo anterior en la ruta mínima desde el nodo origen hasta cada nodo
  const nodosNoVisitados = new Set(); // Conjunto de nodos no visitados

  // Inicializar las distancias a cada nodo como infinito y el nodo anterior como null
  for (const nodo of red) {
    distancia[nodo.id] = Infinity;
    anterior[nodo.id] = null;
    nodosNoVisitados.add(nodo.id);
  }

  // La distancia al nodo origen es 0
  distancia[origen.id] = 0;
  let auxNode = null;


  while (nodosNoVisitados.size > 0) {
    // Encontrar el nodo no visitado con la distancia mínima
    let nodoActual = null;

    for (const nodoId of nodosNoVisitados) {
      if (nodoActual == null || distancia[nodoId] < distancia[nodoActual]) {
        nodoActual = nodoId;
      }
    }

    // Si no se encuentra un nodo actual, salir del bucle
    if (nodoActual === null) break;

    nodosNoVisitados.delete(nodoActual); // Marcar el nodo actual como visitado

    // Actualizar las distancias a los nodos adyacentes al nodo actual
    auxNode = red[nodoActual];
    if (auxNode.links) {
      for (const { node, weight } of auxNode.links) {
        const distanciaTotal = distancia[nodoActual] + weight + node.delay; // Considerar el retardo en el procesamiento del nodo
        if (distanciaTotal < distancia[node.id]) {
          distancia[node.id] = distanciaTotal;
          anterior[node.id] = nodoActual;
        }
      }
    }
  }

  // Reconstruir la ruta mínima desde el nodo destino hasta el nodo origen
  const rutaMinima = [];
  let nodoActual = destino.id;

  while (anterior[nodoActual] !== null) {
    rutaMinima.unshift(nodoActual);
    nodoActual = anterior[nodoActual];
  }
  rutaMinima.unshift(origen.id);

  // Devolver la ruta mínima como una lista de nodos
  return rutaMinima.map(id => red.find(nodo => nodo.id === id));
}

// Y para mañana, ya me he comido mi pequeña ración de esperanza. 