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
enviar.addEventListener('click', inserirDados);

async function inserirDados(){
  var ref= doc(db,'Musicas',"chave123");
  const docRef = await setDoc(
       ref,{
       titulo: "testeTitulo",
       artista: "testeArtista"
  }).then(()=>{
       console.log("incluído com sucesso");
  })
  .catch((error)=>{
       console.log("erro de inclusão");
  })
}
