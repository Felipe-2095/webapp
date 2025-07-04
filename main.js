function cargarDatos() {
  const tipo = $('#dataType').val();
  fetch('https://jsonplaceholder.typicode.com/' + tipo)
    .then(response => response.json())
    .then(data => {
      let encabezado = '';
      let cuerpo = '';
      if (data.length > 0) {
        Object.keys(data[0]).forEach(key => {
          encabezado += '<th>' + key + '</th>';
        });
        data.forEach(item => {
          cuerpo += '<tr>';
          Object.values(item).forEach(val => {
            cuerpo += '<td>' + val + '</td>';
          });
          cuerpo += '</tr>';
        });
      }
      $('#encabezado').html(encabezado);
      $('#cuerpo').html(cuerpo);
      $('#tabla').DataTable();
    });
}

function guardarUsuario() {
  $('.error').text('');
  $('input').removeClass('input-error');

  let valid = true;

  const nombre = $('#nombre').val().trim();
  const usuario = $('#usuario').val().trim();
  const fecha = $('#fechaIngreso').val().trim();
  const email = $('#email').val().trim();
  const genero = $('#genero').val().trim();
  const sitio = $('#sitioWeb').val().trim();

  if (!nombre) {
    $('#errNombre').text('El nombre es obligatorio');
    $('#nombre').addClass('input-error');
    valid = false;
  }

  if (!usuario) {
    $('#errUsuario').text('El usuario es obligatorio');
    $('#usuario').addClass('input-error');
    valid = false;
  }

  const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!fecha || !fechaRegex.test(fecha)) {
    $('#errFecha').text('Formato inválido. Use dd/MM/yyyy');
    $('#fechaIngreso').addClass('input-error');
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    $('#errEmail').text('Email inválido');
    $('#email').addClass('input-error');
    valid = false;
  }

  if (valid) {
    const fila = `
      <tr>
        <td>${nombre}</td>
        <td>${usuario}</td>
        <td>${fecha}</td>
        <td>${email}</td>
        <td>${genero}</td>
        <td>${sitio}</td>
      </tr>`;
    $('#tablaUsuarios').append(fila);
    alert('Usuario agregado correctamente');
    $('#usuarioForm')[0].reset();
  }
}

function cancelarFormulario() {
  $('#usuarioForm')[0].reset();
  $('.error').text('');
  $('input').removeClass('input-error');
}
