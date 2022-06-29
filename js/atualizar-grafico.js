import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, get, set, child, push, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
import { firebaseConfig } from './firebase.js';

const app= initializeApp(firebaseConfig);

let atualizar = document.getElementById("btnAtualizar");
let acao = document.getElementById("acao");
let investigacao = document.getElementById("investigacao");
let policial = document.getElementById("policial");
let romance = document.getElementById("romance");
let terror = document.getElementById("terror");

atualizar.addEventListener('click', atualizarDados);

function GenerosMaisRecomendados(acao, investigacao, policial, romance, terror) {
  this.acao = acao;
  this.investigacao = investigacao;
  this.policial = policial;
  this.romance = romance;
  this.terror = terror;
}

const db = getDatabase();
const starCountRef = ref(db, 'GenerosMaisRecomendados');
onValue(starCountRef, (snapshot) => {
  acao.value = snapshot.val().acao;
  investigacao.value = snapshot.val().investigacao;
  policial.value = snapshot.val().policial;
  romance.value = snapshot.val().romance;
  terror.value = snapshot.val().terror;
});

function atualizarDados() {

  set(ref(db, 'GenerosMaisRecomendados'),{
    acao:parseInt(acao.value),
    investigacao: parseInt(investigacao.value),
    policial: parseInt(policial.value),
    romance: parseInt(romance.value),
    terror: parseInt(terror.value)

}).then(()=>{
    console.log("atualizado com sucesso");
    alert("Atualizado com Sucesso.");
})
.catch((error)=>{
    console.log("erro de inclusão");
    alert("Erro na Atualização");
})
}
