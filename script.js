// 🎬MOVIE APP🎬 //

const form = document.getElementById("movieForm");

//ALMACENAR PELÍCULAS//
let movies = [];
//===================//
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //VARIABLES//
  const title = event.target.title.value.trim();
  const year = event.target.year.value.trim();
  const description = event.target.description.value.trim();
  const photo = event.target.photo.value.trim();
  const genre = event.target.genre.value;

  titleInput = document.getElementById("title");
  yearInput = document.getElementById("year");
  descInput = document.getElementById("description");
  photoInput = document.getElementById("description");

  //ALMACENAR MÚLTIPLES ERRORES DE HABERLOS//
  const errores = [];

  // REGEX TEXTO //
  const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 ,.\-¡!¿?]+$/;

  // VALIDACIÓN TÍTULO
  if (!title) {
    errores.push("El título es obligatorio.");
  } else if (title.length > 100) {
    errores.push("El título no puede tener más de 100 caracteres.");
  } else if (!regexTexto.test(title)) {
    errores.push(
      "El título solo puede contener letras, números y signos básicos de puntuación.",
    );

    titleInput.classList.add("error");
  }

  // VALIDACIÓN AÑO
  const regexAño = /^\d{4}$/;
  const añoActual = new Date().getFullYear();
  if (!regexAño.test(year)) {
    errores.push("El año debe tener 4 dígitos.");
  } else if (parseInt(year) < 1800 || parseInt(year) > añoActual) {
    errores.push(`El año debe estar entre 1800 y ${añoActual}.`);

    yearInput.classList.add("error");
  }

  // VALIDACIÓN DESCRIPCIÓN
  if (!description) {
    errores.push("La descripción es obligatoria.");
  } else if (description.length > 500) {
    errores.push("La descripción no puede exceder 500 caracteres.");
  } else if (!regexTexto.test(description)) {
    errores.push(
      "La descripción solo puede contener letras, números y signos básicos de puntuación.",
    );

    descInput.classList.add("error");
  }

  // VALIDACIÓN URL
  const regexURL = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;
  if (photo && !regexURL.test(photo)) {
    errores.push("La URL de la foto no es válida.");

    photoInput.classList.add("error");
  }

  // ALERT ERRORES
  if (errores.length > 0) {
    alert("Errores:\n" + errores.join("\n"));
    return;
  }
  
  titleInput.classList.remove("error");
  yearInput.classList.remove("error");
  descInput.classList.remove("error");
  photoInput.classList.remove("error");
  // AGREGAR PELÍCULA
  const nuevaPelicula = {
    title,
    year: parseInt(year),
    description,
    photo,
    genre,
  };

  movies.push(nuevaPelicula);

  // CLEAR //
  form.reset();
  // CLEAR //
  console.log("Películas guardadas:", movies);
});
