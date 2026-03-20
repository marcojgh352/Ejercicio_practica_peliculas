// 🎬 Movie App 🎬

// ====================
// VARIABLES
// ====================
const form = document.getElementById("movieForm"); // Formulario para agregar
const tableBody = document.querySelector("#moviesTable tbody"); // <tbody> de la tabla
const editModal = document.getElementById("editModal"); // Modal de edición
const editForm = document.getElementById("editForm"); // Formulario dentro del modal
const cancelEditBtn = document.getElementById("cancelEdit"); // Botón cancelar en modal
const filterGenre = document.getElementById("filter-genre"); // Filtro
const filterName = document.getElementById("filter-name"); // Filtro por nombre




// PELÍCULAS //

 let movies = [
  {
    title: "El Padrino",
    year: 1972,
    description:
      "La historia de la familia Corleone, un drama de crimen y poder en Nueva York.",
    photo:
      "https://cdng.europosters.eu/pod_public/1300/262788.jpg",
    genre: "acción",
  },
  {
    title: "Titanic",
    year: 1997,
    description: "Romance y tragedia en el famoso viaje del Titanic.",
    photo:
      "https://cdng.europosters.eu/pod_public/1300/266355.jpg",
    genre: "romántica",
  },
  {
    title: "El Conjuro",
    year: 2013,
    description: "Una familia enfrenta sucesos paranormales en su casa.",
    photo:
      "https://cdng.europosters.eu/pod_public/1300/280617.jpg",
    genre: "terror",
  },
  {
    title: "La Gran Apuesta",
    year: 2015,
    description:
      "Historia basada en hechos reales sobre la crisis financiera de 2008.",
    photo:
      "https://m.media-amazon.com/images/M/MV5BZDZkNDQ3YjktYjBlZC00YTY1LTgxOGYtY2RhMWFhZmNkZGY3XkEyXkFqcGc@._V1_.jpg",
    genre: "comedia",
  },
  {
    title: "Volver al Futuro",
    year: 1985,
    description:
      "Un joven viaja accidentalmente al pasado y debe arreglar el curso de la historia.",
    photo:
      "https://static.posters.cz/image/1300/posters/back-to-the-future-i2795.jpg",
    genre: "acción",
  },
  {
    title: "Intensa-Mente 2",
    year: 2015,
    description:
      "Película animada que explora las emociones dentro de la mente de una niña.",
    photo:
      "https://static.posters.cz/image/1300/posters/inside-out-2-i258585.jpg",
    genre: "comedia",
  },
];


let editIndex = null; // Índice de la película que se está editando

// ====================
// FUNCIONES AUXILIARES
// ====================

/**
 * Renderiza la tabla de películas en el DOM.
 */
function renderMovies(lista = movies) {
  tableBody.innerHTML = "";

  lista.forEach((movie) => {
    const realIndex = movies.indexOf(movie);

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.year}</td>
      <td>${movie.description}</td>
      <td>${movie.photo ? `<img src="${movie.photo}" alt="${movie.title}">` : ""}</td>
      <td>${movie.genre}</td>
      <td>
        <button onclick="showEditModal(${realIndex})">Editar</button>
        <button onclick="deleteMovie(${realIndex})">Borrar</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

/**
 * Borra una película del array y actualiza la tabla.
 *
 */
function deleteMovie(index) {
  if (confirm(`¿Deseas borrar "${movies[index].title}"?`)) {
    movies.splice(index, 1);
    applyFilters();
  }
}

/**
 * Muestra el modal de edición y carga los datos de la película.
 *
 */
function showEditModal(index) {
  const movie = movies[index];

  editForm.editTitle.value = movie.title;
  editForm.editYear.value = movie.year;
  editForm.editDescription.value = movie.description;
  editForm.editPhoto.value = movie.photo;
  editForm.editGenre.value = movie.genre;

  editIndex = index;
  editModal.style.display = "flex"; // Mostrar modal
}

/**
 * Valida los campos de un formulario y devuelve un array de errores.
 **/
function validateMovie({ title, year, description, photo }) {
  const errores = [];

  const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9 ,.\-¡!¿?\n\r]+$/;
  const regexAño = /^\d{4}$/;
  const añoActual = new Date().getFullYear();
  const regexURL = /^(https?:\/\/[^\s$.?#].[^\s]*)$/;

  const titleInput =
    document.getElementById("title") || document.getElementById("editTitle");
  const yearInput =
    document.getElementById("year") || document.getElementById("editYear");
  const descInput =
    document.getElementById("description") ||
    document.getElementById("editDescription");
  const photoInput =
    document.getElementById("photo") || document.getElementById("editPhoto");

  titleInput.classList.remove("error");
  yearInput.classList.remove("error");
  descInput.classList.remove("error");
  photoInput.classList.remove("error");

  if (!title) {
    errores.push("El título es obligatorio.");
    titleInput.classList.add("error");
  } else if (title.length > 100) {
    errores.push("El título no puede tener más de 100 caracteres.");
    titleInput.classList.add("error");
  } else if (!regexTexto.test(title)) {
    errores.push(
      "El título solo puede contener letras, números y signos básicos.",
    );
    titleInput.classList.add("error");
  }

  if (!regexAño.test(year)) {
    errores.push("El año debe tener 4 dígitos.");
    yearInput.classList.add("error");
  } else if (parseInt(year) < 1800 || parseInt(year) > añoActual) {
    errores.push(`El año debe estar entre 1800 y ${añoActual}.`);
    yearInput.classList.add("error");
  }

  if (!description) {
    errores.push("La descripción es obligatoria.");
    descInput.classList.add("error");
  } else if (description.length > 500) {
    errores.push("La descripción no puede exceder 500 caracteres.");
    descInput.classList.add("error");
  } else if (!regexTexto.test(description)) {
    errores.push(
      "La descripción solo puede contener letras, números y signos básicos de puntuación.",
    );
    descInput.classList.add("error");
  }

  if (photo && !regexURL.test(photo)) {
    errores.push("La URL de la foto no es válida.");
    photoInput.classList.add("error");
  }

  return errores;
}

// ====================
// EVENTOS
// ====================

function applyFilters() {
  const genre = filterGenre.value;
  const name = filterName.value.toLowerCase();

  let resultado = movies;

  if (genre) {
    resultado = resultado.filter((m) => m.genre === genre);
  }

  if (name) {
    resultado = resultado.filter((m) =>
      m.title.toLowerCase().includes(name),
    );
  }

  renderMovies(resultado);
}

// Submit para agregar nueva película
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const movieData = {
    title: form.title.value.trim(),
    year: form.year.value.trim(),
    description: form.description.value.trim(),
    photo: form.photo.value.trim(),
    genre: form.genre.value,
  };

  const errores = validateMovie(movieData);

  if (errores.length > 0) {
    alert("Errores:\n" + errores.join("\n"));
    return;
  }

  movies.push({
    ...movieData,
    year: parseInt(movieData.year),
  });

  applyFilters();
  form.reset();
});

// Submit del formulario de edición (modal)
editForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const movieData = {
    title: editForm.editTitle.value.trim(),
    year: editForm.editYear.value.trim(),
    description: editForm.editDescription.value.trim(),
    photo: editForm.editPhoto.value.trim(),
    genre: editForm.editGenre.value,
  };

  const errores = validateMovie(movieData);

  if (errores.length > 0) {
    alert("Errores:\n" + errores.join("\n"));
    return;
  }

  movies[editIndex] = {
    ...movieData,
    year: parseInt(movieData.year),
  };

  editIndex = null;
  editModal.style.display = "none";
  applyFilters();
});

// Cancelar edición
cancelEditBtn.addEventListener("click", () => {
  editIndex = null;
  editModal.style.display = "none";
});

// ====================
// Cerrar modal al hacer click fuera del contenido
// ====================
editModal.addEventListener("click", (e) => {
  if (e.target === editModal) {
    editIndex = null;
    editModal.style.display = "none";
  }
});

filterGenre.addEventListener("change", applyFilters);
filterName.addEventListener("input", applyFilters);

//==============//
//RENDER INICIAL//
//==============//
renderMovies();