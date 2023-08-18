// fetch("http://localhost:5678/api/works")
// .then(response => response.json())
// .then(data => {
//     travaux = data;
// })

// function generalGallerie();

// Affiche une image
function showWork(url, title) {
  console.log("test showimage");
  const gallery = document.querySelector(".gallery");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = url;
  img.alt = title;
  const figcaption = document.createElement("figcaption");
  figcaption.innerText = title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

// Affiche la galerie
async function showGalerie(categoryId = 0) {
  console.log("showGalerie");
  const clean = document.querySelector(".gallery");
  clean.innerHTML = '';
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
      showWork(work.imageUrl, work.title);
    }
  });
  // .then(datas => {
  //    datas.forEach ((data) => {
  //     showImage(data.imageUrl, data.title);
  //    })
}

showGalerie();

const btTous = document.getElementById("btTous");
btTous.addEventListener("click", (event) => {
  showGalerie();
});

function showButtons() {
  const divfilter = document.getElementById("filtres");
  return fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      return categories;
    })
    .then((filtres) => {
      filtres.forEach((filtre) => {
        const button = document.createElement("button");
        button.innerText = filtre.name;
        button.className = "filtre";
        button.onclick = function () {
          showGalerie(filtre.id);
        };
        divfilter.appendChild(button);
      });
    });
}

showButtons();

// se déconnecter , supprimer le token :
// 1 créer et styliser les éléments d'administrations (header noir, bouton modifier, logout)
// ces éléments doivent avoir une classe propre.
// si la page a un token, affiche tous les éléments, sinon, elle les cache (interface administateur)

const deconnexion = document.getElementById("logOut");
deconnexion.addEventListener("click", function (event) {
  event.preventDefault();
  window.localStorage.removeItem("token");
  window.location = "./index.html";
});

function showAdmin() {
  const tokenAdmin = window.localStorage.getItem("token");
  const adminElements = document.querySelectorAll(".admin");
  const noAdminElement = document.querySelector(".noAdmin");

  if (tokenAdmin != null) {
    adminElements.forEach((adminElement) => (adminElement.style.display = ""));
    noAdminElement.style.display = "none";
  } else {
    adminElements.forEach(
      (adminElement) => (adminElement.style.display = "none")
    );
  }
}
showAdmin();

// fonction qui ouvre la modale en annulant ses attributs d'invisibilités

function openModale (f){
  f.preventDefault();
  const modal = document.getElementById("modale");
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");  
}

const modify = document.querySelector(".modifier");
modify.addEventListener("click", openModale);

// récupère la croix et la modale "const";
const cross = document.querySelectorAll(".closeModale");
// rajouter un évènement au click 
cross.forEach((a) => { 
  a.addEventListener("click", closeModale);
}); 
// stop-propagation ne pas mettre closeModal sur Modalcontent

const stopPropagation = function (e) { 
    e.stopPropagation(); 
  };
  const modalcont = document.querySelector(".modalContent");
  modalcont.addEventListener("click", stopPropagation); 



  // fonction closeModale (comme pour la fonction openModale)  // inverser ls propriétés
  function closeModale(f){
    f.preventDefault();
    const modal = document.getElementById("modale");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal"); 
  }