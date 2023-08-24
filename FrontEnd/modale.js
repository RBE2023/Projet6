// fonction qui affiche la galerie

// fontion qui affiche les images

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

  // deleteButton.addEventListener("click", deleteWorks(id));
}
function deleteWorks(idWorks) {
  console.log("test delete");
  fetch("http://localhost:5678/api/works/" + idWorks, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((response) => {
      alert("travail supprimé" + idWorks);
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
  // .then(datas => {
  //    datas.forEach ((data) => {
  //     showImage(data.imageUrl, data.title);
  //    })
}

showModaleGalerie();
