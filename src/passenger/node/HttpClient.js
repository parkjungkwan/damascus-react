import React, {useState} from 'react';
const HttpClient = () => {
    const [name, setName] = useState("React")
    const httpRequest = () =>{
        fetch('http://localhost:3001/api')
            .then(response => response.json())
            .then(response=>setName(response.name))
    }
    return (
        <div>
            <h1>Hello {name}</h1>
            <button onClick={httpRequest}>httpRequest</button>
        </div>
    );
};


export default HttpClient