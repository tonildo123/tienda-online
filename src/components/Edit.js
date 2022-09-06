import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';

const Edit = () => {


    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState(0);

    const navigate = useNavigate();
    const {id} =useParams();

    const update = async (e) =>{
        e.preventDefault();
        const product = doc(db, 'productos', id)
        const data = {descripcion: descripcion, precio:precio}
        await updateDoc(product, data);
        navigate('/');
    }


    const getProductsById = async(id) =>{
        const producto = await getDoc(doc(db, 'productos', id));
        if (producto.exists()) 
        {
            setDescripcion(producto.data().descripcion);
            setPrecio(producto.data().precio);

        } else {
            console.log('not exists')
        }
    }

    useEffect( () => {
        getProductsById(id)
        // eslint-disable-next-line
    }, [])

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar Producto</h1>
                <form onSubmit={update}>
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

                    <button type='submit' className='btn btn-primary'>Actualizar</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit