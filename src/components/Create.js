import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';



const Create = () => {

const [descripcion, setDescripcion] = useState('');
const [precio, setPrecio] = useState(0);
const navigate = useNavigate();

const prodcutsCollection = collection(db, 'productos');

const store = async (e) =>{
    e.preventDefault();
    await addDoc(prodcutsCollection, {descripcion: descripcion, precio:precio})
    navigate('/');
}

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Crear Producto</h1>
                <form onSubmit={store}>
                    <div className="mb-3">
                        <label className="form-label">Descripcion</label>
                        <input 
                          value={descripcion}
                          onChange={ (e) => setDescripcion(e.target.value)}
                          type="text"
                          className='form-control'  
                          />
                          
                          
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Precio</label>
                        <input 
                          value={precio}
                          onChange={ (e) => setPrecio(e.target.value)}
                          type="number"
                          className='form-control'  
                          />
                          
                          
                    </div>

                    <button type='submit' className='btn btn-primary'>Guardar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create