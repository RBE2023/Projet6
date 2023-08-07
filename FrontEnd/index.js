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
  clean.innerHTML ="";
  const works = await fetch("http://localhost:5678/api/works")
    .then(function (    response  ) {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error("error");
        }
    });
  works.map(function (work) {
    if (categoryId===work.categoryId || categoryId==0){        
    showWork(work.imageUrl, work.title);}
  });
  // .then(datas => {
  //    datas.forEach ((data) => {
  //     showImage(data.imageUrl, data.title);
  //    })
}

showGalerie();

const btTous = document.getElementById("btTous");
btTous.addEventListener("click", (event) => {showGalerie()});

function showButtons(){
  const divfilter = document.getElementById("filtres");
  return fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(categories => {return categories;})
  .then(filtres => {
     filtres.forEach (filtre => {
      const button = document.createElement("button");
      button.innerText = filtre.name;
      button.className = "filtre";
      button.onclick = function() {
        showGalerie(filtre.id)
      }
      divfilter.appendChild(button);
     })
    })
}

showButtons();