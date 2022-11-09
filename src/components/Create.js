import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';
import NavbarTienda from './NavbarTienda';




const Create = () => {

const [descripcion, setDescripcion] = useState('');
const [precio, setPrecio] = useState();
const [images, setimages] = useState([]);
const [imagen64, setImagen64] = useState(null);
const navigate = useNavigate();

const prodcutsCollection = collection(db, 'productos');

  const convertirBase64 = (archivos) =>{

    Array.from(archivos).forEach( archivo =>{
      let reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload=function(){
        let base64 = reader.result;
        setImagen64(base64);
      };
    }
      
    )

  }

  const store = async (e) =>{
      e.preventDefault();
      
      
      await addDoc(prodcutsCollection, {descripcion: descripcion,foto:imagen64, precio:precio, idUsuario:'Tony'})
      navigate('/');
  }
      const changeInput = (e) => {
      
      let indexImg;
      if (images.length > 0) {
        indexImg = images[images.length - 1].index + 1;
      } else {
        indexImg = 0;
      }
      
      let newImgsToState = readmultifiles(e, indexImg);
      let newImgsState = [...images, ...newImgsToState];
      setimages(newImgsState);
      
      console.log(newImgsState);
    };
    function readmultifiles(e, indexInicial) {
      const files = e.currentTarget.files;
      convertirBase64(e.currentTarget.files);
  
      
      const arrayImages = [];
  
      Object.keys(files).forEach((i) => {
        const file = files[i];
  
        let url = URL.createObjectURL(file);
  
        
        arrayImages.push({
          index: indexInicial,
          name: file.name,
          url,
          file
        });
  
        indexInicial++;
      });
  
      return arrayImages;
    }

    function deleteImg(indice) {
  
      const newImgs = images.filter(function (element) {
        return element.index !== indice;
      });
      console.log(newImgs);
      setimages(newImgs);
    }

  return (
    <div className='container' style={{backgroundColor:'#34495E'}}>
        <div className='row' style={{}}> 
        <NavbarTienda />
            <div className='col-md-3' style={{backgroundColor:'#34495E'}}></div>
            <div className='col-md-6' style={{backgroundColor:'#5D6D7E', 
                height:'98vh',  marginBottom:'1rem', marginTop:'1rem',
                alignItems:'center', borderRadius:'1rem', padding:'2rem'}}>
                <h1>CARGAR PRODUCTO</h1>
                <form onSubmit={store}>
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
                    <label className="btn btn-warning"  style={{width:'100%'}}>
                      <span>SELECCIONAR IMAGEN</span>
                      <input hidden type="file" multiple onChange={changeInput}></input>
                    </label>
                    <button type='submit' className='btn btn-dark' style={{width:'100%', color:'white'}}>GUARDAR</button>
                    </div>
                    
                </form>
                <div
                    className='card'
                    style={{
                      justifyContent:'center',
                      alignItems: 'center',
                      
                    }}>
                    {images.map((imagen) => (
                    <div className="col-6 col-sm-4 col-lg-3 square" key={imagen.index}>
                      <div className="content_img">
                        <button
                          className="position-absolute btn btn-danger"
                          onClick={deleteImg.bind(this, imagen.index)}
                        >
                          x
                        </button>
                        <img
                          alt="algo"
                          src={imagen.url}
                          style={{height:'250px',
                                  width:'150px',
                                    }}  
                          data-toggle="modal"
                          data-target="#ModalPreViewImg"
                          className="img-responsive"
                        ></img>
                      </div>
                    </div>
                  ))}
                    <div className='card-body' >
                      <h4 className='card-title'>IMAGEN..</h4>
                    </div>                
                </div>
            </div>
            <div className='col-md-3' style={{backgroundColor:'#34495E'}}></div>
        </div>
    </div>
  )
}

export default Create