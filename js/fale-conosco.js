import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { firebaseConfig } from './firebase.js';


const app = initializeApp(firebaseConfig);
const db = getFirestore();

let enviar = document.getElementById("btnEnviar");
let email = document.getElementById("email");
let nome = document.getElementById("nome");
let telefone = document.getElementById("telefone");
let mensagem = document.getElementById("mensagem");

enviar.addEventListener('click', inserirDados);

async function inserirDados(){
  var ref= doc(db,'Fale_Conosco',email.value);
  const docRef = await setDoc(
       ref,{
       nome: nome.value,
       telefone: telefone.value,
       mensagem: mensagem.value
  }).then(()=>{
       console.log("incluído com sucesso");
       alert('Incluído com Sucesso.');

       email.value = "";
       nome.value = "";
       telefone.value = "";
       mensagem.value = "";
  })
  .catch((error)=>{
       console.log("erro de inclusão");
       alert('Erro na Inclusão.');

       email.value = "";
       nome.value = "";
       telefone.value = "";
       mensagem.value = "";
  })
}
