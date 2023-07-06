import { useState } from 'react';
import './App.css';

// Human resource assistant-OD

function App() {

  const [copyFrom, setCopyFrom] = useState("");
  const [copyTo, setCopyTo] = useState("");
  const [roleToDuplicate, setRoleToDuplicate] = useState("");
  const reader = new FileReader();

  const findRoleMatch = (roleToFind) => {
    const myRegex = new RegExp(`<AxSecurityRole.+?</AxSecurityRole>`, "sg");
    const allRoles = [...copyFrom.matchAll(myRegex)];
    console.log("ALL ROLES", allRoles);
    // let matchedRole = null
    for (let i=0; i < allRoles.length; i++) {
      if (allRoles[i][0].includes(roleToFind)) {
        console.log('THE MATCH', allRoles[i][0]);
        setRoleToDuplicate(allRoles[i][0])
        // matchedRole = allRoles[i][0];
      }
    }
    // console.log("MATCHED ROLE", matchedRole);
    // return matchedRole
  }
  // <_x003C_NewObjectList_x003E_k__BackingField>
  
  const insertRole = () => {
    console.log("Inside Insert Role",roleToDuplicate);
    const roleInsert = `<_x003C_NewObjectList_x003E_k__BackingField>${roleToDuplicate}<AxSecurityRole xmlns="">`
    const replaceRegex = new RegExp('<_x003C_NewObjectList_x003E_k__BackingField>.*<AxSecurityRole xmlns="">', "sg");


  }

  const handleFromChange = async (e) => {
    const [fileName] = await e.target.files;
    if (fileName) {
      reader.readAsText(fileName);
      reader.addEventListener('load', (e) => {
        setCopyFrom(reader.result);
    })
    }
  }

  const handleToChange = async (e) => {
    const [fileName] = await e.target.files;
    if (fileName) {
      reader.readAsText(fileName);
      reader.addEventListener('load', (e) => {
        setCopyTo(reader.result);
    })
    }
  }

  const handleProcess = () => {
    if ((!copyFrom) || (!copyTo) || (roleToDuplicate)) {
// Everything in this function should be based on the condition that none of the inputs is empty
    }
    console.log('Role To DUPLICATE', roleToDuplicate);
    findRoleMatch(roleToDuplicate);
    insertRole()

  }

  const handleTextInputChange = (e) => {
    setRoleToDuplicate(e.target.value)
  }

  const handleDragOver = (e) => {
    console.log(e);
  }



  return (
    <div className="App" style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"30px"}}>
      
      <div style={{display: "flex", flexDirection:"column", border:"2px solid red"}} onDragOver={handleDragOver} >
        <label htmlFor="copy_from_file" >File To Copy From</label>

        <input multiple type="file" accept='.xml' id='copy_from_file' onChange={handleFromChange} />
      </div>

      <div style={{display: "flex", flexDirection:"column"}}>
        <label htmlFor="role_to_copy" >Role To Copy</label>

        <input type='text' id='role_to_copy' onChange={handleTextInputChange} placeholder='Note that this field is case sensitive' />
      </div>

      <div>
        <label htmlFor="copy_to_file" >File To Copy To</label>
        <input type="file" accept='.xml' id='copy_to_file' onChange={handleToChange} />
      </div>

      <div>
        <button onClick={handleProcess}>Generate File</button>
      </div>

    </div>
  );
}

export default App;









 