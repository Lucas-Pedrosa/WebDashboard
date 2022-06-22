import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyASv5h92BfWQ1LfYVeKLVjeCw0pbzCtizQ",
  authDomain: "webdashboard-5f557.firebaseapp.com",
  projectId: "webdashboard-5f557",
  storageBucket: "webdashboard-5f557.appspot.com",
  messagingSenderId: "1053170750729",
  appId: "1:1053170750729:web:335cdfb159b8ea324b2fd8"
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
