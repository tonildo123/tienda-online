import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import {db} from '../firebaseConfig/firebase';

// import vectoricon from '../Assets/vectoricon.png';


// https://www.youtube.com/watch?v=A5yjN73Aj7s

const Create = () => {

const [descripcion, setDescripcion] = useState('');
const [precio, setPrecio] = useState(0);
// const [imagen, setImagen] = useState(null);
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
      console.log('--------------------------------------------------------')
      console.log(e)
      console.log('--------------------------------------------------------')
      // convertirBase64(imagen);
      await addDoc(prodcutsCollection, {descripcion: descripcion,fotobase64:imagen64, precio:precio})
      navigate('/');
  }
      const changeInput = (e) => {
      //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
      let indexImg;

      //aquí evaluamos si ya hay imagenes antes de este input, para saber en dónde debe empezar el index del proximo array
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
  
      //el array con las imagenes nuevas
      const arrayImages = [];
  
      Object.keys(files).forEach((i) => {
        const file = files[i];
  
        let url = URL.createObjectURL(file);
  
        //console.log(file);
        arrayImages.push({
          index: indexInicial,
          name: file.name,
          url,
          file
        });
  
        indexInicial++;
      });
  
      //despues de haber concluido el ciclo retornamos las nuevas imagenes
      return arrayImages;
    }

    function deleteImg(indice) {
      //console.log("borrar img " + indice);
  
      const newImgs = images.filter(function (element) {
        return element.index !== indice;
      });
      console.log(newImgs);
      setimages(newImgs);
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Crear Producto con imagen</h1>
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
                    <div className="mb-3">
                    <label className="btn btn-warning">
                      <span>Seleccionar archivos </span>
                      <input hidden type="file" multiple onChange={changeInput}></input>
                    </label>
                    </div>

                    <button type='submit' className='btn btn-primary'>Guardar</button>
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
                    <div className='card-body'>
                      <h4 className='card-title'>Imagen</h4>
                      <p className='card-text text-secondary'>Loremnwjencfqwjencwjpnfjqebi
                        fbweibfhiweb ew weghiruweugfihqwegfi weif fwerqcw4rwercewrcewcewrcewcrew
                        crerrwtyvbtryttr
                        btybttrnuynymtykmubokpyvbynvtijyvtenyij</p>
                    </div>
                
                </div>

            </div>
        </div>
    </div>
  )
}

export default Create