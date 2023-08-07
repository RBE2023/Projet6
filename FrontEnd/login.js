// // 1 soumettre le formulaire - annuler l'envoi en html
// const formLogin = document.getElementById("formLogin");
// formLogin.addEventListener("submit", submitForm);

// // 2 récupérer les données du formulaire : le noms des input (ligne 8 et 9)
// function submitForm(event) {
//   event.preventDefault(); // annulation de l'envoi html
//   const formEmail = document.getElementById("mail").value;
//   const formPassword = document.getElementById("mdp").value;
//     // console.log(formEmail, formPassword);
// };

// // 3 envoyer les données à l'Api : /users/login - requête Post
// const login = await fetch("http://localhost:5678/api/users/login", {
//   method: "POST",
//   headers:{"Content-Type: application/json"},
//   body: JSON.stringify(submitForm ())

// })
//     .then(function (    response  ) {
//         if (response.ok) {
//         return response.json();
//         } else {
//         throw new Error("error");
//         }
//     });

// 4 en fonction du retour si les idenfiaints sont incorrect : faire une action : message d'erreur - mettre une alert "vos identifiants sont incorrects"
// 5 si les éléments sont corrects, faire une autre action :
// a) créer un Token et l'enregistrer dans la session;
// b) rediriger vers la page d'accueil;

// fonction connect
function connect(event) {
  event.preventDefault();
  const logInput = {
    formEmail: document.getElementById("mail").value,
    formPassword: document.getElementById("mdp").value,
  };
  console.log(logInput);
  const identify = JSON.stringify(logInput);
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: identify
  })
    .then((resp) => resp.json())
    .then((logs) => {
      if (!logs.token) {
        alert("identifiant ou mot de passe incorrecte");
        return;
      }
      const key = JSON.stringify(logs.token);
      window.localStorage.setItem("key", key);
      window.location = "./index.html";
    });
}
const formLogin = document.getElementById("formLogin");
formLogin.addEventListener("submit", connect);
