import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
function App() {
  // form states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  // end of form states
  const [users, setUsers] = useState([]);

  const userReference = collection(db, "users");
  useEffect(() => {
    const getData = async () => {
      const res = await getDocs(userReference);
      setUsers(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, [users]);
  const addNewUser = async () => {
    if (age < 15 || age > 70) return;
    if (address === "") return;
    if (name === "") return;
    await addDoc(userReference, {
      name: name,
      age: Number(age),
      address: address,
    });
    setName("");
    setAddress("");
    setAge("");
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };
  const updateUser = async (index, age) => {
    const userDoc = doc(db, "users", index);
    const newAge = { age: age + 1 };
    await updateDoc(userDoc, newAge);
  };
  return (
    <div className="mx-80">
      <div className="flex justify-start gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          className="rounded  bg-slate-600  my-4 p-4 text-white"
          type="text"
          placeholder="enter your name"
        />{" "}
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
          className="rounded  bg-slate-600 my-4 p-4 text-white"
          type="text"
          placeholder="enter your address"
        />
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          id="age"
          className="rounded w-14 bg-slate-600 my-4 p-4 text-white"
          type="number"
          placeholder="enter your age"
        />
      </div>
      <button
        onClick={addNewUser}
        className="bg-slate-600 text-white p-4 rounded my-2 hover:bg-slate-400 hover:text-slate-800"
      >
        Add new user
      </button>
      {users.map((user, index) => {
        return (
          <li
            className="flex gap-10 bg-slate-600 text-white p-2 font-mono mt-2 justify-between"
            key={index}
          >
            User: {index + 1}
            <h1>Name: {user.name}</h1>
            <h2>Address: {user.address}</h2>
            <h3>Age: {user.age}</h3>
            <div>
              <button
                onClick={() => updateUser(user.id, user.age)}
                className="mx-2 bg-gray-900 p-1"
              >
                Increase age by 1
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="mx-2 bg-red-900 p-1 "
              >
                delete
              </button>
            </div>
          </li>
        );
      })}
    </div>
  );
}

export default App;
