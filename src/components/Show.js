import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { async } from '@firebase/util';
import { Button } from 'bootstrap';
const MySwal = withReactContent(Swal);


const Show = () => {
// 1ero confirguramos los hooks
const [products, setProduct] = useState([]);
// 2do referenciamos db firestore
const productColection = collection(db, "productos");
// 3ro funcion para mostrar todos los DOCS
const getProdcuts = async () => {
    
    const data = await getDocs(productColection);
    console.log('data');
    console.log(data);

    setProduct(
        data.docs.map((doc) => ({ ...doc.data(),id:doc.id}))
    )
    console.log('products : ');
    console.log(products);
}
// 4to fujncion para deleto doc

const deleteProduct = async (id)=>{

    const productDoc = doc(db, "productos", id);
    await deleteDoc(productDoc);

    getProdcuts();

}
// 5to funcion de confirmacion de alert con sweet alert

const confirmDelete = (id) =>{

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

}
// 6to usamos useEffect
useEffect(() => {
  getProdcuts();
}, [])

// 7mo devolvemos la vista en nuestro component

  return (
    <>
    <div className="container">
        <div className="row ">
            <div className="col">
                <div className="d-grid gap-2">
                    <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                </div>
                 <table className='table table-dark table-hover'>
                     <thead>
                        <tr>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Producto</th>
                            <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {products.map((product)=>(<tr key={product.id}>
                            <td>{product.descripcion}</td>
                            <td>{product.precio}</td>
                            <td>
                            <img
                          alt="algo"
                          src={product.fotobase64}
                          style={{height:'50px',
                                  width:'30px',
                                    }}  
                          data-toggle="modal"
                          data-target="#ModalPreViewImg"
                          className="img-responsive"
                        ></img>
                                </td>
                            <td>
                                <Link to={`/edit/${product.id}`}  className="btn btn-light">
                                    <i className="fa-solid fa-pencil"></i>
                                </Link>
                                <button 
                                    onClick={() => {confirmDelete(product.id)}}
                                    className="btn btn-danger">
                                <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>))}
                     </tbody>
                 </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Show;