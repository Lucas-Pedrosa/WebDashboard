import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, get, set, child, push, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyAczfyXu-N3s0MeatvLo1RfCXpR0L0FGg0",
  authDomain: "liber-24ce7.firebaseapp.com",
  databaseURL: "https://liber-24ce7-default-rtdb.firebaseio.com",
  projectId: "liber-24ce7",
  storageBucket: "liber-24ce7.appspot.com",
  messagingSenderId: "16217782629",
  appId: "1:16217782629:web:6a4a155abc19c92e10c98c"
};

const app= initializeApp(firebaseConfig);

//const db=getDatabase();



/*-------- funções -----------*/

export function lerDados(){

    var grafico1 = {
        acao : 0.0,
        investigacao : 0.0,
        policial : 0.0,
        romance : 0.0,
        terror : 0.0
    };

    const db = getDatabase();
    const starCountRef = ref(db, 'grafico1');
    onValue(starCountRef, (snapshot) => {

    grafico1.acao = snapshot.val().acao;
    grafico1.investigacao = snapshot.val().investigacao;
    grafico1.policial = snapshot.val().policial;
    grafico1.romance = snapshot.val().romance;
    grafico1.terror = snapshot.val().terror;

    return grafico1;

    });
}
