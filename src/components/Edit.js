import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';
import NavbarTienda from './NavbarTienda';

const Edit = () => {


    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState();

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
        
        }, [])

return (    
    <div className='container' style={{backgroundColor:'#34495E'}}>
        <div className='row' > 
        <NavbarTienda />
            <div className='col-md-3' style={{backgroundColor:'#34495E'}}></div>
            <div className='col-md-6' style={{backgroundColor:'#5D6D7E', 
                height:'98vh',  marginBottom:'1rem', marginTop:'1rem',
                alignItems:'center', borderRadius:'1rem', padding:'2rem'}}>
                <h1>EDITAR PRODUCTO</h1>
                <form onSubmit={update}>
                    <div className="mb-3">
                        <label className="form-label">DESCRIPCION</label>
                        <input 
                        value={descripcion}
                        onChange={ (e) => setDescripcion(e.target.value)}
                        type="text"
                        className='form-control'  
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">PRECIO $$$</label>
                        <input 
                        value={precio}
                        onChange={ (e) => setPrecio(e.target.value)}
                        type="number"
                        className='form-control'  
                        />
                    </div>
                    <div className="mb-3">
                    <button type='submit' className='btn btn-dark' style={{width:'100%', color:'white'}}>ACTUALIZAR</button>
                    </div>
                    
                </form>
                
            </div>
            <div className='col-md-3' style={{backgroundColor:'#34495E'}}></div>
        </div>
    </div>
)
}

export default Edit