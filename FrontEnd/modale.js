// Affiche une image
function showModaleWork(url, title, id) {
  console.log("test showimage");
  const gallery = document.getElementById("galleryModale");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = url;
  img.alt = title;
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = "éditer";
  const deleteButton = document.createElement("div");
  deleteButton.classList.add("deleteButton");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  figure.appendChild(deleteButton);
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();
    deleteWorks(id, JSON.parse(localStorage.getItem("token")));
  });
}

function deleteWorks(idWorks, token) {
  console.log("test delete");
  fetch("http://localhost:5678/api/works/" + idWorks, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((resp) => resp.json())
    .then(() => {
      // alert("travail supprimé" + idWorks);
      showModaleGalerie();
    });
}

// Affiche la galerie
async function showModaleGalerie(categoryId = 0) {
  console.log("showGalerie");
  const clean = document.querySelector("#galleryModale");
  clean.innerHTML = "";
  const works = await fetch("http://localhost:5678/api/works").then(function (
    response
  ) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("error");
    }
  });
  works.map(function (work) {
    if (categoryId === work.categoryId || categoryId == 0) {
      showModaleWork(work.imageUrl, work.title, work.id);
    }
  });
}

showModaleGalerie();

// Ajout de photo

const ajoutPhoto = document.getElementById("buttonAjouter");
const modalGallery = document.querySelector(".modalGallery");
const modalAjout= document.querySelector(".modalAjout");
const arrowLeft = document.querySelector(".fa-arrow-left");
ajoutPhoto.addEventListener("click", (event) => {
  console.log("test3");
  console.log(modalAjout);
  console.log(modalGallery);
modalAjout.style.display="block"
modalGallery.style.display="none"

});

console.log(arrowLeft);
arrowLeft.addEventListener("click",(event) => {
  console.log("flèche cliqué")
  modalAjout.style.display="none";
  modalGallery.style.display="flex";

} );