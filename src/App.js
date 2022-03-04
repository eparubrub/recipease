import React from "react";
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';


class App extends React.Component {
  state = {
    newName: '',
    newAge: 0,
    users: []
  };

  setName = async (name) => {
    this.setState({newName: name});
  }

  setAge = async (age) => {
    this.setState({newAge: age});
  }

  createUser = async () => {
    await addDoc(collection(db, "users"), {
      name: this.state.newName, 
      age: Number(this.state.newAge)
    });
  };

  upddateUser = async (id, age) => {
    const newFields = {age: age + 1}
    await updateDoc(doc(db, "users", id), newFields)
  }

  deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
  };


  componentDidMount = async () => {
    const data = await getDocs(collection(db, "users"));
    this.setState({
      users: data.docs.map((doc) => ({...doc.data(), id: doc.id }))  
    });
  }


  render() {
    return (
      <div className="App">
        <input 
          placeholder="Name..." 
          onChange={(event) => {
            this.setName(event.target.value);
          }}
        />
        <input 
          type ="number" 
          placeholder="Age..."
          onChange={(event) => {
            this.setAge(event.target.value);
          }}
        />
        <button onClick={this.createUser}>Create User</button>
        {this.state.users.map((user) => {
          return(
            <div key={user.id}>
              {" "}
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <button 
                onClick={() => {
                  this.upddateUser(user.id, user.age);
                }}>
                Increase Age
              </button>
              <button onClick={() => {this.deleteUser(user.id)}}>Delete User</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
