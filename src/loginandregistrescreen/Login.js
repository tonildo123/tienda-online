import React, { useState } from 'react';
import NavbarTienda from '../components/NavbarTienda';

const Login = () => {

  

  const [user, setUser] = useState('');
  const [pass, setPass] = useState();



const handlelogin =()=>{
  console.log('me logueo')
}


  return (
    <div className='container' style={{backgroundColor:'#34495E'}}>
        <div className='row' style={{}}> 
        <NavbarTienda />
            <div className='col-md-3' style={{backgroundColor:'#34495E'}}></div>
            <div className='col-md-6' style={{backgroundColor:'#5D6D7E', 
                height:'98vh',  marginBottom:'1rem', marginTop:'1rem',
                alignItems:'center', borderRadius:'1rem', padding:'2rem'}}>
                <h1>INICIAR SESIÓN</h1>
                <form onSubmit={handlelogin}>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input 
                        value={user}
                        onChange={ (e) => setUser(e.target.value)}
                        type="text"
                        className='form-control'  
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input 
                        value={pass}
                        onChange={ (e) => setPass(e.target.value)}
                        type="text"
                        className='form-control'  
                        />
                    </div>
                    <div className="mb-3">
                    <button type='submit' className='btn btn-dark' style={{width:'100%', color:'white'}}>INICIAR SESIÓN</button>
                    </div>
                    
                </form>
                
            </div>
            <div className='col-md-3' style={{backgroundColor:'#34495E'}}></div>
        </div>
    </div>
  )
}

export default Login