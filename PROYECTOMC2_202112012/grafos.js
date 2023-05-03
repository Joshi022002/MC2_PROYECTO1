// Obtener el canvas y el contexto
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

// Definir una lista de vértices y aristas vacía
let vertices = [];
let edges = [];

// Agregar un listener para detectar cuando se hace clic en el canvas
canvas.addEventListener('click', function(event) {
  // Obtener las coordenadas del clic
  let rect = canvas.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  
  // Buscar si ya existe un vértice en este lugar
  let vertex = vertices.find(vertex => distance(vertex.x, vertex.y, x, y) < 20);
  
  if (vertex) {
    // Si ya existe un vértice, borrarlo y todas sus aristas
    vertices.splice(vertices.indexOf(vertex), 1);
    edges = edges.filter(edge => edge[0] != vertex.name && edge[1] != vertex.name);
  } else {
    // Si no existe un vértice, agregar uno nuevo
    let name = prompt('Ingrese el nombre del vértice:');
    vertices.push({name: name, x: x, y: y});
  }
});

// Agregar un listener para detectar cuando se presiona una tecla
document.addEventListener('keydown', function(event) {
  if (event.keyCode == 65) { // La tecla 'a' agrega una arista
    let start = prompt('Ingrese el nombre del vértice de inicio de la arista:');
    let end = prompt('Ingrese el nombre del vértice de fin de la arista:');
    edges.push([start, end]);
  } else if (event.keyCode == 68) { // La tecla 'd' elimina una arista
    let start = prompt('Ingrese el nombre del vértice de inicio de la arista que desea eliminar:');
    let end = prompt('Ingrese el nombre del vértice de fin de la arista que desea eliminar:');
    edges = edges.filter(edge => !(edge[0] == start && edge[1] == end || edge[0] == end && edge[1] == start));
  }
});

// Función para calcular la distancia entre dos puntos
function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Función para dibujar los vértices y las aristas
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dibujar las aristas
  for (let i = 0; i < edges.length; i++) {
    let vertex1 = vertices.find(vertex => vertex.name == edges[i][0]);
    let vertex2 = vertices.find(vertex => vertex.name == edges[i][1]);
    context.beginPath();
    context.moveTo(vertex1.x, vertex1.y);
    context.lineTo(vertex2.x, vertex2.y);
    context.stroke();
  }
  
  // Dibujar los vértices
  for (let i = 0; i < vertices.length; i++) {
    context.beginPath();
    context.arc(vertices[i].x, vertices[i].y, 20, 0, 2 * Math.PI);
    context.stroke();
    context.fillText(vertices[i].name, vertices[i].x - 5, vertices[i].y - 25);
  }
  
  // Solicitar una nueva animación de la función draw
  window.requestAnimationFrame(draw);
}

// Función para buscar el camino más corto entre dos vértices
function dijkstra(start, end) {
  // Crear una lista de vértices no visitados
  let unvisited = [...vertices];
  
  // Crear una lista de distancias, inicialmente todas en infinito
  let distances = {};
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i].name] = Infinity;
  }
  
  // La distancia del vértice de inicio a sí mismo es 0
  distances[start] = 0;
  
  // Crear una lista de padres, inicialmente todos nulos
  let parents = {};
  for (let i = 0; i < vertices.length; i++) {
    parents[vertices[i].name] = null;
  }
  
  // Mientras haya vértices no visitados
  while (unvisited.length > 0) {
    // Encontrar el vértice no visitado con la distancia mínima
    let current = unvisited.reduce((minVertex, vertex) => distances[vertex.name] < distances[minVertex.name] ? vertex : minVertex, unvisited[0]);
    
    // Si hemos llegado al vértice final, detener la búsqueda
    if (current.name == end) {
      break;
    }
    
    // Marcar el vértice actual como visitado
    unvisited.splice(unvisited.indexOf(current), 1);
    
    // Actualizar las distancias y padres de los vértices adyacentes al vértice actual
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i];
      if (edge[0] == current.name) {
        let neighbor = vertices.find(vertex => vertex.name == edge[1]);
        let distance = distances[current.name] + distance(current.x, current.y, neighbor.x, neighbor.y);
        if (distance < distances[neighbor.name]) {
          distances[neighbor.name] = distance;
          parents[neighbor.name] = current.name;
        }
      } else if (edge[1] == current.name) {
        let neighbor = vertices.find(vertex => vertex.name == edge[0]);
        let distance = distances[current.name] + distance(current.x, current.y, neighbor.x, neighbor.y);
        if (distance < distances[neighbor.name]) {
          distances[neighbor.name] = distance;
          parents[neighbor.name] = current.name;
        }
      }
    }
  }
  
  // Construir el camino más corto
  let path = [end];
  let parent = parents[end];
  while (parent != null) {
    path.unshift(parent);
    parent = parents[parent];
  }
  
  // Si no se pudo llegar al vértice final, devolver null
  if (path.length == 1 && path[0] != end) {
    return null;
  }
  
  // Devolver el camino más corto
  return path;
}

// Función para buscar dos caminos alternativos entre dos vértices
function findAlternatePaths(start, end) {
  // Encontrar el camino más corto
  let shortestPath = dijkstra(start, end);
  
  if (shortestPath == null) {
    // Si no hay camino posible, devolver null
    return null;
  }
  
  // Crear una lista de aristas que forman el camino más corto
  let shortestEdges = [];
  for (let i = 0; i < shortestPath.length - 1; i++) {
    shortestEdges.push([shortestPath[i], shortestPath[i+1]]);
  }
  
  // Encontrar todas las aristas que no forman parte del camino más corto
  let alternateEdges = edges.filter(edge => !shortestEdges.some(shortestEdge => shortestEdge[0] == edge[0] && shortestEdge[1] == edge[1] || shortestEdge[0] == edge[1] && shortestEdge[1] == edge[0]));
  
  // Encontrar el camino más corto en cada subgrafo formado por las aristas alternativas
  let alternatePaths = [];
  for (let i = 0; i < alternateEdges.length; i++) {
    let alternateStart = alternateEdges[i][0];
    let alternateEnd = alternateEdges[i][1];
    let alternatePath = dijkstra(alternateStart, alternateEnd);
    if (alternatePath != null) {
      alternatePaths.push(alternatePath);
    }
  }
  
  // Devolver el camino más corto y los dos caminos alternativos
  return [shortestPath, ...alternatePaths.slice(0, 2)];
}
// Agregar un listener para detectar cuando se presiona el botón de encontrar dos caminos alternativos
document.getElementById('alternatePathsButton').addEventListener('click', function(event) {
  let start = prompt('Ingrese el nombre del vértice de inicio:');
  let end = prompt('Ingrese el nombre del vértice de fin:');
  let paths = findAlternatePaths(start, end);
  if (paths == null) {
    alert('No hay camino posible.');
  } else {
    let message = 'El camino más corto es: ' + paths[0].join(' -> ');
    if (paths.length > 1) {
      message += '\nLos siguientes caminos alternativos también son posibles:\n';
      for (let i = 1; i < paths.length; i++) {
        message += paths[i].join(' -> ') + '\n';
      }
    }
    alert(message);
  }
});

// Solicitar una nueva animación de la función draw
window.requestAnimationFrame(draw);