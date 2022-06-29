import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

const firebaseConfig = {
     apiKey: "AIzaSyAczfyXu-N3s0MeatvLo1RfCXpR0L0FGg0",
     authDomain: "liber-24ce7.firebaseapp.com",
     databaseURL: "https://liber-24ce7-default-rtdb.firebaseio.com/",
     projectId: "liber-24ce7",
     storageBucket: "liber-24ce7.appspot.com",
     messagingSenderId: "16217782629",
     appId: "1:16217782629:web:6a4a155abc19c92e10c98c"
};

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
  })
  .catch((error)=>{
       console.log("erro de inclusão");
  })
}
