import React, {useEffect, useState} from 'react';
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import {Card,  Button} from "react-bootstrap";
import NavbarTienda from './NavbarTienda';
import {Link} from 'react-router-dom';


const Show = () => {

const [products, setProduct] = useState([]);
const productColection = collection(db, "productos");

const getProductos = async () => {
    
    const data = await getDocs(productColection);
    console.log('data');
    console.log(data);

    setProduct(
        data.docs.map((doc) => ({ ...doc.data(),id:doc.id}))
    )
    console.log('products : ');
    console.log(products);
}


const deleteProduct = async (id)=>{

    const productDoc = doc(db, "productos", id);
    await deleteDoc(productDoc);

    getProductos();

}


const confirmDelete = (id) =>{

    console.log(id)

    Swal.fire({
        title: '¿Esta usted seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id);
          Swal.fire(
            'Eliminado!',
            'Su producto fue borrado.',
            'success'
          )
        }
      })

}

useEffect(() => {
  getProductos();
}, [])



const renderCard = (card, index) =>{
  return(
    <div className="col-md-3">
    <Card style={{width:'100%', marginBottom:'1rem', marginTop:'1rem'}} key={index} className='box'>
      <Card.Img variant='top' src ={card.foto} style={{height:'70vh'}}/>
      <Card.Body>
        <Card.Title>{card.descripcion}</Card.Title>
        <Card.Text>$ {card.precio}</Card.Text>
        <div className=' container row'>
          <div className="col-8">
            <Button 
            onClick={()=>{console.log('item : ', JSON.stringify(card, null, 4))}}
            variant="primary">Comprar</Button>
          </div>
          <div className="col-2" 
              style={{
                flexDirection:'column',
              }}
              onClick={()=>{confirmDelete(card.id)}}
              >  
            <ion-icon name="trash-outline" style={{color:'red'}}></ion-icon>
          </div>
          <div className="col-2" 
              style={{flexDirection:'column'}}
              onClick={()=>{console.log('Editar....')}}> 
              <Link to={`/edit/${card.id}`} style={{color:'red'}}>
                <ion-icon name="create-outline"></ion-icon>
              </Link>
          </div>
        </div>        
      </Card.Body>
    </Card>
    </div>
  );
}

  return (
    <div style={{backgroundColor:'grey'}}>
      <NavbarTienda />
      <div>
        <div className="row">           
          {products.map(renderCard)}
        </div>
      </div>
    </div>   
  )
}

export default Show;

