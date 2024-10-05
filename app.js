document.addEventListener('DOMContentLoaded', function () {
    const juegos = [
      { id: 1, nombre: 'Juego 1', categoria: 'accion', favorito: false },
      { id: 2, nombre: 'Juego 2', categoria: 'aventura', favorito: false },
      { id: 3, nombre: 'Juego 3', categoria: 'deportes', favorito: false },
      { id: 4, nombre: 'Juego 4', categoria: 'accion', favorito: false },
      { id: 5, nombre: 'Juego 5', categoria: 'aventura', favorito: false },
    ];
  
    const juegosDiv = document.getElementById('juegos');
    const categoriaFiltro = document.getElementById('categoriaFiltro');
  
    function mostrarJuegos(filtro) {
      juegosDiv.innerHTML = '';
      const juegosFiltrados = filtro === 'todos' ? juegos : juegos.filter(j => j.categoria === filtro);
  
      juegosFiltrados.forEach(juego => {
        const juegoDiv = document.createElement('div');
        juegoDiv.classList.add('juego');
        juegoDiv.innerHTML = `
          <h3>${juego.nombre}</h3>
          <p>Categoría: ${juego.categoria}</p>
          <span class="favorito ${juego.favorito ? 'activado' : ''}">&#9733;</span>
        `;
        juegoDiv.querySelector('.favorito').addEventListener('click', function () {
          juego.favorito = !juego.favorito;
          this.classList.toggle('activado');
        });
        juegosDiv.appendChild(juegoDiv);
      });
    }
  
    categoriaFiltro.addEventListener('change', function () {
      mostrarJuegos(this.value);
    });
  
    mostrarJuegos('todos');
  
    // Funcionalidad para el formulario de subir juego
    const subirJuegoForm = document.getElementById('subirJuegoForm');
    subirJuegoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('¡Juego subido exitosamente!');
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    // Almacena los juegos que son favoritos
    let favoritos = new Set();
  
    // Manejo de los botones de filtrado
    const botonesFiltro = document.querySelectorAll('.categoria-btn');
    const juegos = document.querySelectorAll('.juego');
  
    botonesFiltro.forEach(boton => {
      boton.addEventListener('click', function() {
        const categoria = this.dataset.categoria;
  
        juegos.forEach(juego => {
          // Mostrar u ocultar los juegos según la categoría seleccionada
          if (categoria === 'todos') {
            juego.style.display = 'block';
          } else if (categoria === 'favoritos') {
            // Mostrar solo juegos favoritos
            if (favoritos.has(juego)) {
              juego.style.display = 'block';
            } else {
              juego.style.display = 'none';
            }
          } else {
            // Filtrar por categoría específica
            if (juego.dataset.categoria === categoria) {
              juego.style.display = 'block';
            } else {
              juego.style.display = 'none';
            }
          }
        });
      });
    });
  
    // Manejo de los botones de favorito
    const botonesFavorito = document.querySelectorAll('.favorito');
  
    botonesFavorito.forEach(boton => {
      boton.addEventListener('click', function() {
        const juego = this.closest('.juego');
  
        // Alterna el estado de favorito
        if (favoritos.has(juego)) {
          favoritos.delete(juego);
          this.classList.remove('activado'); // Remueve la clase activado
        } else {
          favoritos.add(juego);
          this.classList.add('activado'); // Marca el juego como favorito
        }
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const detallesJuego = document.getElementById('detalles-juego');
    const detallesImg = document.getElementById('detalles-img');
    const detallesTitulo = document.getElementById('detalles-titulo');
    const detallesDescripcion = document.getElementById('detalles-descripcion');
    const closeDetalles = document.querySelector('.close-detalles');
    const btnJugar = document.getElementById('btn-jugar');
  
    const juegos = document.querySelectorAll('.juego');
  
    juegos.forEach(juego => {
      juego.addEventListener('click', function() {
        const imgSrc = juego.querySelector('.juego-img').src;
        const title = juego.querySelector('h3').textContent;
        const descripcion = juego.dataset.descripcion;
        const jugar = juego.dataset.jugar === "true";
  
        // Actualizamos el contenido de la ventana de detalles
        detallesImg.src = imgSrc;
        detallesTitulo.textContent = title;
        detallesDescripcion.textContent = descripcion;
  
        // Mostrar u ocultar el botón Jugar
        btnJugar.style.display = jugar ? 'block' : 'none';
  
        // Mostramos la ventana de detalles
        detallesJuego.style.display = 'flex';
      });
    });
  
    // Cerrar la ventana de detalles
    closeDetalles.addEventListener('click', function() {
      detallesJuego.style.display = 'none';
    });
  
    // También se puede cerrar al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
      if (event.target === detallesJuego) {
        detallesJuego.style.display = 'none';
      }
    });
  
    // Manejo de teclado para el botón Jugar
    document.addEventListener('keydown', function(event) {
      if (detallesJuego.style.display === 'flex') {
        if (event.key === "ArrowRight") {
          // Acción para mover a la derecha
          alert("Ir a jugar!");
        } else if (event.key === "ArrowLeft") {
          // Acción para mover a la izquierda
          alert("Volver!");
        }
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const player = document.getElementById('player');
    const gameContainer = document.getElementById('game-container');

    // Posición inicial del jugador
    let posX = 0;
    let posY = 0;

    // Variable para controlar si el juego está activo
    let juegoActivo = false;

    // Movimiento del jugador con las flechas del teclado
    document.addEventListener('keydown', (event) => {
        if (!juegoActivo) return; // Si el juego no está activo, no se mueve

        const step = 5; // Cantidad de píxeles a mover

        switch (event.key) {
            case 'ArrowUp':
                if (posY - step >= 0) { // Verifica los límites
                    posY -= step;
                }
                break;
            case 'ArrowDown':
                if (posY + step <= gameContainer.clientHeight - player.clientHeight) {
                    posY += step;
                }
                break;
            case 'ArrowLeft':
                if (posX - step >= 0) {
                    posX -= step;
                }
                break;
            case 'ArrowRight':
                if (posX + step <= gameContainer.clientWidth - player.clientWidth) {
                    posX += step;
                }
                break;
            default:
                break;
        }

        // Actualiza la posición del jugador en el DOM
        player.style.transform = `translate(${posX}px, ${posY}px)`;
    });

    // Manejo del modal para el juego simple
    const detallesJuegoSimple = document.getElementById('modal-juego-simple');
    const closeDetallesJuegoSimple = detallesJuegoSimple.querySelector('.close-detalles');

    // Mostrar el modal al hacer clic en el juego
    const juegoSimple = document.querySelector('.juego[data-categoria="juego-simple"]');
    
    // Evento para abrir el modal al hacer clic en el juego
    juegoSimple.querySelector('.jugar').addEventListener('click', function() {
        detallesJuegoSimple.style.display = 'flex';
        juegoActivo = true; // Activar el juego al hacer clic en "Jugar"
        // Resetear posición al iniciar el juego
        posX = 0;
        posY = 0;
        player.style.transform = `translate(${posX}px, ${posY}px)`;
    });

    // Cerrar el modal
    closeDetallesJuegoSimple.addEventListener('click', function() {
        detallesJuegoSimple.style.display = 'none';
        juegoActivo = false; // Desactivar el juego al cerrar el modal
    });

    // Cerrar al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === detallesJuegoSimple) {
            detallesJuegoSimple.style.display = 'none';
            juegoActivo = false; // Desactivar el juego al cerrar el modal
        }
    });
});
