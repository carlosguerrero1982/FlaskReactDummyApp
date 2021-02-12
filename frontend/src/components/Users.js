import React, {useState, useEffect} from 'react';

const Users = () => {

    

    const getUsers = async() => {

        const res = await fetch("http://localhost:5000/users", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        // .then( (response) => { do something awesome that makes the world a better
        // place  const res=response.json(); console.log(res); })

        const data = await res.json();
        console.log(data);
        setUsers(data);

    }

    const handleSubmit = async(e) => {

        e.preventDefault()

        
        const res = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify({name: name, email: email, password: password})
        })
       
        const data = await res.json();
        console.log(data)
        
        await getUsers();
        setName('');
        setEmail('');
        setPassword('');

    
}

const edit = async(id)=>{
    const res = await fetch(`http://localhost:5000/users/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({name, email, password})
        })
            const data = await res.json();
            console.log(data);
        setName('');
        setEmail('');
        setPassword('');

    
    }

    const deleteUser= async(id)=>{

        const w = window.confirm("Seguro de eliminar")

        if(w){
       const res =  await fetch(`http://localhost:5000/users/${id}`,
        {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        const data = await res.json();
        console.log(data);
        getUsers();
        
    }

}

    const editUser= async(id)=>{
        
            const res =  await fetch(`http://localhost:5000/user/${id}`)

            const data = await res.json();
            console.log(data);

            setId(data.id);
            setName(data.name);
            setEmail(data.email);
            setPassword(data.password);
          

    }

    useEffect(() => {
     getUsers();

     
    }, [])

    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [users,setUsers] = useState([]);
     const [id,setId] = useState('');

    

    return (

       

        <div className="row">

            <div className="col md-4">

                <form className="card card-body" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input
                            autoFocus
                            placeholder="Nombre"
                            className="form-control"
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <input
                            autoFocus
                            placeholder="Email"
                            className="form-control"
                            value={email}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <input
                            autoFocus
                            placeholder="Password"
                            className="form-control"
                            value={password}
                            type="text"
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button className="btn btn-danger btn-block">CREATE</button>
                    <button disabled={!id} onClick={()=>edit(id)} className="btn btn-danger btn-block">EDITAR USUARIO</button>

                </form>
            </div>

            <div className="col md-8">

                
                    <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operation</th>
                        </tr>
                    </thead>

                    <tbody>

                    {users.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>

                            <td>
                            <button onClick={()=>editUser(user.id)} className="btn btn-primary btn-block btn-sm">
                                EDIT
                            </button>

                            <button onClick={()=>deleteUser(user.id)} className="btn btn-danger btn-block btn-sm">
                            DELETE
                            </button>

                            </td>
                        </tr>    
                        
                    ))}

                    </tbody>

                    </table>
                
            </div>
        </div>
    )
}


export default Users;
