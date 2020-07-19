import React,{Fragment, useState, useEffect} from 'react';
import Formulario from './components/formulario';
import Cita from './components/Cita'


function App() {

  //citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales=[];
  }


//arreglo de citas 
const [citas, guardarCitas] = useState([citasIniciales]);

// use effect  para realizar operaciones cuando cambien el estado
useEffect(()=>{
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
 // console.log('Documento Listo... o algo paso con las citas')
 if(citasIniciales){
   localStorage.setItem('citas',JSON.stringify(citas));
 } else{
   localStorage.setItem('citas',JSON.stringify([]));
 }
},[citas]);

// funcion de que toma las citas actuales y agrega la nueva
const crearCita = cita =>{
  guardarCitas([ ...citas, cita])
}
// funcion eliminar cita por id
const eliminarCita=id=>{
 // console.log('Eliminando...',id);
 const nuevasCitas =citas.filter(cita=> cita.id!==id)
 guardarCitas(nuevasCitas);
}

//mesaje del titulo condicional
const mensaje = citas.length===0  ?  'No hay citas' : 'Registro de Citas';


  return (
    <Fragment>
       <h1>Administrador de pacintes</h1>
       <div className= "container">
         <div className ="row">
           <div className="one-half column">
            <Formulario
            crearCita={crearCita}
            />

           </div>
           <div className ="one-half column">
            <h2>{mensaje}</h2>
            {citas.map(cita=>(
              <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
              />
            ))}
           </div>
         </div>

       </div>

    </Fragment>
  
  );
}

export default App;
 