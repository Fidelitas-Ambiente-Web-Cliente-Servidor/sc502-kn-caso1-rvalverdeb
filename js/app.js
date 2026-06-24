/**
 * Estudio de Caso #1 - Ambiente Web Cliente Servidor
 * Carrera: Ingeniería en Sistemas de Computación
 * Estudiante: Reyner Fabian Valverde Barboza
 */

// Array de datos obligatorio
const menu = [
  { nombre: 'Bruschetta Clásica',     descripcion: 'Pan tostado con tomate y albahaca fresca',   precio: 4500,  categoria: 'Entrada'       },
  { nombre: 'Tabla de Quesos',         descripcion: 'Selección de quesos importados con mermelada', precio: 7800,  categoria: 'Entrada'       },
  { nombre: 'Lomo al Vino Tinto',      descripcion: 'Lomo de res en reducción de vino tinto',      precio: 15500, categoria: 'Plato Fuerte'  },
  { nombre: 'Pasta Carbonara',         descripcion: 'Pasta con tocino, huevo y queso parmesano',    precio: 10200, categoria: 'Plato Fuerte'  },
  { nombre: 'Salmón a la Plancha',     descripcion: 'Filete de salmón con vegetales al vapor',      precio: 13800, categoria: 'Plato Fuerte'  },
  { nombre: 'Tiramisú',               descripcion: 'Postre italiano con café y mascarpone',         precio: 5200,  categoria: 'Postre'        },
  { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá',    precio: 4800,  categoria: 'Postre'        },
];

// Array en memoria global para almacenar los objetos de reservas registradas
const reservas = [];

/**
 * Renderiza los platillos en el DOM en forma de tarjetas (cards)
 * @param {Array} listaPlatos - Segmento o total de platillos a desplegar
 */
function renderMenu(listaPlatos = menu) {
  const contenedor = document.getElementById('contenedor-menu');
  contenedor.innerHTML = ''; // Limpiar el contenedor antes de renderizar

  // Imagenes
  const imagenesPlatillos = {
    'Bruschetta Clásica': 'https://plus.unsplash.com/premium_photo-1677686707252-16013f466e61?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Tabla de Quesos': 'https://images.unsplash.com/photo-1668094497457-29f4bd775c95?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Lomo al Vino Tinto': 'https://images.unsplash.com/photo-1702998083637-cafe8320b508?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Pasta Carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60',
    'Salmón a la Plancha': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60',
    'Tiramisú': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop&q=60',
    'Cheesecake de Maracuyá': 'https://plus.unsplash.com/premium_photo-1713443949105-2661c841508f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  };
  listaPlatos.forEach(plato => {
    // Creación de elementos mediante HTML5 Puro semántico (createElement)
    const col = document.createElement('div');
    col.className = 'col';

    const card = document.createElement('div');
    card.className = 'card-plato'; // Uso obligatorio de clase solicitada

    const imgContenedor = document.createElement('div');
    imgContenedor.className = 'img-container-plato';
    
    const img = document.createElement('img');
    img.src = imagenesPlatillos[plato.nombre] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500';
    img.alt = plato.nombre;
    img.className = 'img-plato';

    imgContenedor.appendChild(img);
    card.appendChild(imgContenedor);

    // Cuerpo superior de la tarjeta
    const topBody = document.createElement('div');
    topBody.className = 'p-3 d-flex flex-column flex-grow-1'; 

    const categoriaBadge = document.createElement('span');
    categoriaBadge.className = 'categoria-badge mb-2 d-inline-block';
    categoriaBadge.textContent = plato.categoria;
    
    const titulo = document.createElement('h5');
    titulo.className = 'fw-bold mb-1';
    titulo.textContent = plato.nombre;

    const descripcion = document.createElement('p');
    descripcion.className = 'text-muted small mb-3';
    descripcion.textContent = plato.descripcion || plato.cheesecake;

    topBody.appendChild(categoriaBadge);
    topBody.appendChild(titulo);
    topBody.appendChild(descripcion);

    // Pie de la tarjeta con el precio estructurado
    const footerCard = document.createElement('div');
    footerCard.className = 'd-flex justify-content-between align-items-center mt-auto';

    const precio = document.createElement('span');
    precio.className = 'precio-plato';
    // Formateo obligatorio en colones costarricenses (₡)
    precio.textContent = `₡${plato.precio.toLocaleString('es-CR')}`;

    footerCard.appendChild(precio);
    card.appendChild(topBody);
    card.appendChild(footerCard);
    col.appendChild(card);
    
    contenedor.appendChild(col);
  });
}

/**
 * Filtra los platos según la categoría seleccionada y gestiona el estado visual de los botones
 * @param {string} categoria - Categoría por la cual filtrar ('Entrada', 'Plato Fuerte', 'Postre', 'Todos')
 */
function filtrarCategoria(categoria) {
  // Filtrado de la lista lógica
  if (categoria === 'Todos') {
    renderMenu(menu);
  } else {
    const filtrados = menu.filter(plato => plato.categoria === categoria);
    renderMenu(filtrados);
  }

  // Gestión visual de la clase 'active' en los botones de filtrado
  const botones = document.querySelectorAll('.btn-filtro');
  botones.forEach(btn => btn.classList.remove('active'));

  // Vinculación explícita del botón activo mediante evaluación de texto o ID
  if (categoria === 'Todos') document.getElementById('btn-todos').classList.add('active');
  if (categoria === 'Entrada') document.getElementById('btn-entradas').classList.add('active');
  if (categoria === 'Plato Fuerte') document.getElementById('btn-fuertes').classList.add('active');
  if (categoria === 'Postre') document.getElementById('btn-postres').classList.add('active');
}

/**
 * Ejecuta la lógica estricta de validación del formulario de reservas en tiempo real.
 * Renderiza mensajes de error directly en el DOM sin alertas nativas.
 * @returns {boolean} True si el formulario es 100% válido, False de lo contrario.
 */
function validarFormulario() {
  let formularioValido = true;

  // Obtención de elementos de entrada
  const inputNombre = document.getElementById('nombre');
  const inputCorreo = document.getElementById('correo');
  const inputFecha = document.getElementById('fecha');
  const inputPersonas = document.getElementById('personas');

  // Obtención de divs contenedores de error (.error-campo)
  const errNombre = document.getElementById('error-nombre');
  const errCorreo = document.getElementById('error-correo');
  const errFecha = document.getElementById('error-fecha');
  const errPersonas = document.getElementById('error-personas');

  // 1. VALIDACIÓN: Nombre Completo (Obligatorio, >= 5 caracteres, solo letras y espacios)
  const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!inputNombre.value.trim()) {
    errNombre.textContent = 'El nombre completo es obligatorio.';
    formularioValido = false;
  } else if (inputNombre.value.trim().length < 5) {
    errNombre.textContent = 'Debe ingresar un mínimo de 5 caracteres.';
    formularioValido = false;
  } else if (!regexLetras.test(inputNombre.value.trim())) {
    errNombre.textContent = 'El nombre solo debe contener letras y espacios.';
    formularioValido = false;
  } else {
    errNombre.textContent = '';
  }

  // 2. VALIDACIÓN: Correo Electrónico (Obligatorio, Formato Regex Estándar)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!inputCorreo.value.trim()) {
    errCorreo.textContent = 'El correo electrónico es obligatorio.';
    formularioValido = false;
  } else if (!regexEmail.test(inputCorreo.value.trim())) {
    errCorreo.textContent = 'Ingrese un formato de correo electrónico válido.';
    formularioValido = false;
  } else {
    errCorreo.textContent = '';
  }

  // 3. VALIDACIÓN: Fecha (Obligatoria, No puede ser del pasado)
  if (!inputFecha.value) {
    errFecha.textContent = 'La fecha de reserva es obligatoria.';
    formularioValido = false;
  } else {
    // Configuración de comparación de fechas en formato local a medianoche
    const fechaSeleccionada = new Date(inputFecha.value + 'T00:00:00');
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < fechaActual) {
      errFecha.textContent = 'La fecha seleccionada no puede ser una fecha pasada.';
      formularioValido = false;
    } else {
      errFecha.textContent = '';
    }
  }

  // 4. VALIDACIÓN: Número de Personas (Obligatorio, Entero entre 1 y 20)
  const cantPersonas = parseInt(inputPersonas.value, 10);
  if (!inputPersonas.value) {
    errPersonas.textContent = 'El número de personas es obligatorio.';
    formularioValido = false;
  } else if (isNaN(cantPersonas) || cantPersonas < 1 || cantPersonas > 20) {
    errPersonas.textContent = 'El número de personas debe estar entre 1 y 20.';
    formularioValido = false;
  } else {
    errPersonas.textContent = '';
  }

  // Habilitar o deshabilitar botón de envío según resultado final
  const btnSubmit = document.getElementById('btn-submit');
  if (btnSubmit) {
    btnSubmit.disabled = !formularioValido;
  }

  return formularioValido;
}

/**
 * Agrega una nueva reserva confirmada a la estructura de la tabla del DOM.
 */
function agregarReserva() {
  // Captura directa de datos limpios
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const personas = parseInt(document.getElementById('personas').value, 10);
  const comentarios = document.getElementById('comentarios').value.trim();

  // Instanciación del objeto reserva para empujar al listado
  const nuevaReserva = { nombre, correo, fecha, hora, personas, comentarios };
  reservas.push(nuevaReserva);

  // Ocultar mensaje por defecto de la tabla ("No hay reservas")
  const filaSinReservas = document.getElementById('sin-reservas');
  if (filaSinReservas) {
    filaSinReservas.style.display = 'none';
  }

  // Generación dinámica de la fila de la tabla
  const tbody = document.getElementById('lista-reservas');
  const tr = document.createElement('tr');
  tr.className = 'fila-reserva'; // Uso obligatorio de clase solicitada

  // Renderizado condicional basado en volumen de personas (Fondo diferente si es >= 6)
  if (personas >= 6) {
    tr.classList.add('resaltado-grupo');
  }

  // Creación de las celdas internas de datos
  tr.innerHTML = `
    <td class="px-4 py-3 fw-bold text-secondary">${nombre}</td>
    <td class="py-3 text-muted">${correo}</td>
    <td class="py-3">${fecha.split('-').reverse().join('/')}</td>
    <td class="py-3"><span class="badge bg-secondary">${hora}</span></td>
    <td class="py-3 text-center fw-bold">${personas}</td>
  `;

  tbody.appendChild(tr);

  // Limpieza integral del formulario y re-evaluación del ciclo de validación
  document.getElementById('form-reserva').reset();
  validarFormulario();

  // Actualización sincronizada de paneles métricos
  actualizarResumen();
}

/**
 * Recalcula y actualiza los indicadores numéricos del resumen dinámico en el DOM (.resumen-reservas)
 */
function actualizarResumen() {
  const contenedorResumen = document.getElementById('resumen');
  
  if (!contenedorResumen) return;

  if (reservas.length === 0) {
    contenedorResumen.innerHTML = `
      <h3>Resumen del Estado</h3>
      <p class="mb-0 small text-white-50">Esperando ingreso de datos para computar métricas...</p>
    `;
    return;
  }

  // Operaciones de acumulación funcional con JavaScript Moderno (Reduce y Math)
  const totalReservas = reservas.length;
  const totalPersonas = reservas.reduce((acum, res) => acum + res.personas, 0);
  const maxPersonas = Math.max(...reservas.map(res => res.personas));

  // Renderizado dinámico limpio en el contenedor obligado
  contenedorResumen.innerHTML = `
    <h3 class="h5 fw-bold mb-3 text-uppercase tracking-wider">Métricas de Operación del Día</h3>
    <div class="row text-center">
      <div class="col-md-4 mb-3 mb-md-0">
        <div class="fs-3 fw-bold">${totalReservas}</div>
        <div class="small text-white-50">Total de Reservas</div>
      </div>
      <div class="col-md-4 mb-3 mb-md-0">
        <div class="fs-3 fw-bold">${totalPersonas}</div>
        <div class="small text-white-50">Personas Esperadas</div>
      </div>
      <div class="col-md-4">
        <div class="fs-3 fw-bold text-warning">${maxPersonas}</div>
        <div class="small text-white-50">Reserva de Mayor Tamaño</div>
      </div>
    </div>
  `;
}

/**
 * ─── CICLO DE EVENTOS Y VINCULACIONES AL DOM ───
 */
document.addEventListener('DOMContentLoaded', function () {
  // Inicialización de la vista base
  renderMenu();
  actualizarResumen();

  // Enlace y mapeo de eventos clic para los botones de filtrado
  document.getElementById('btn-todos').addEventListener('click', () => filtrarCategoria('Todos'));
  document.getElementById('btn-entradas').addEventListener('click', () => filtrarCategoria('Entrada'));
  document.getElementById('btn-fuertes').addEventListener('click', () => filtrarCategoria('Plato Fuerte'));
  document.getElementById('btn-postres').addEventListener('click', () => filtrarCategoria('Postre'));

  // Escucha de entradas en tiempo real (Input) para optimizar la experiencia de validación
  const inputsFormulario = document.querySelectorAll('#form-reserva input, #form-reserva select');
  inputsFormulario.forEach(input => {
    input.addEventListener('input', validarFormulario);
    input.addEventListener('blur', validarFormulario);
  });
});

// Intercepción del envío del formulario
document.getElementById('form-reserva').addEventListener('submit', function (e) {
  e.preventDefault(); // Detener el comportamiento de recarga nativa

  // Doble verificación de seguridad antes de procesar inserción
  if (validarFormulario()) {
    agregarReserva();
  }
});