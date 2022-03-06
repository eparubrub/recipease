import React from "react";
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';


class App extends React.Component {
  state = {
    newName: '',
    newAge: 0,
    users: {}
  };

  setName = async (name) => {
    this.setState({newName: name});
  }

  setAge = async (age) => {
    this.setState({newAge: age});
  }

  createUser = async () => {
    const name = this.state.newName;
    const age = Number(this.state.newAge);
    let newId = await addDoc(collection(db, "users"), {
      name: name, 
      age: age
    })
    .then(function(docRef) {
      return docRef.id;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    const users = { ...this.state.users };
    users[newId] = {name: name, age: age, id: newId};
    this.setState({ users });

  };

  upddateUser = async (id, age) => {
    const updatedAge = age + 1
    const newFields = {age: updatedAge}
    await updateDoc(doc(db, "users", id), newFields)
    const users = { ...this.state.users };
    let name = users[id].name;
    users[id] = {name: name, age: updatedAge, id: id};
    this.setState({ users });
  }

  deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    const users = { ...this.state.users };
    delete users[id];
    this.setState({ users });
  };


  componentDidMount = async () => {
    const data = await getDocs(collection(db, "users"));
    let tempUsers = {}
    for (let i = 0; i < data.docs.length; i++) {
      let docId = data.docs[i].id
      tempUsers[docId] = {...data.docs[i].data(), id: docId}
    }
    console.log(tempUsers)
    this.setState({
      users: tempUsers
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
        {Object.keys(this.state.users).map(userId => {
          const thisUser = this.state.users[userId];
          return(
            <div key={userId}>
              {" "}
              <h1>Name: {thisUser.name}</h1>
              <h1>Age: {thisUser.age}</h1>
              <button 
                onClick={() => {
                  this.upddateUser(userId, thisUser.age);
                }}>
                Increase Age
              </button>
              <button onClick={() => {this.deleteUser(userId)}}>Delete User</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
