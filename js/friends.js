import { db } from "./firebase.js";
import { collection, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function addFriend(code) {
  const q = query(collection(db, "users"), where("friendCode", "==", code));
  const snap = await getDocs(q);
  if (snap.empty) return alert("Friend not found");
  
  const friendId = snap.docs[0].id;
  const uid = localStorage.getItem("uid");
  
  await updateDoc(doc(db, "users", uid), { friends: arrayUnion(friendId) });
  alert("Friend added!");
}
