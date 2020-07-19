import React,{Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

// crear state de citas

    const [cita, actualizarCita]=useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const [error, actualizarError]= useState(false)

    //funcion de actualizar cuando hace cada registro
    const actualizarState= e =>{
       // console.log(e.target.name);
        //console.log(e.target.value);
        actualizarCita({
            ...cita,
          [e.target.name] : e.target.value
        })
    }
    // extraer los valores 
    const {mascota,propietario,fecha,hora,sintomas}=cita;
    // ejecucion del boton agregar 
    const submitCita=e=>{
       // alert('enviando...')
       e.preventDefault();

   

        // validar

        if(mascota.trim()===''||propietario.trim()===''|| fecha.trim()===''||hora.trim()===''|| sintomas.trim()===''){
            actualizarError(true);
            return;
        }
         //eliminar mensaje de error
         actualizarError(false);

        // asiganar un id
         cita.id=uuid();
      
        //crear la cita 
        crearCita(cita);

        //reinicial form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
       
    }
    

    return ( 
        <Fragment>
            <h2>Crear Cita</h2>

            {error ?  <p className="alerta-error">Todos los campos son obligatorios</p>   :null}
            <form
            onSubmit={submitCita}
            >
                    <label>Nombre Mascota</label>
                    <input
                    type ="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder=" Introducir Nombre de la Mascota"
                    onChange={actualizarState}
                    value={mascota}
                    />
                    <label>Nombre Propietario</label>
                    <input
                    type ="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder=" Introducir Nombre del Propietario"
                    onChange={actualizarState}
                    value={propietario}
                    />
                     <label>Fecha Registro</label>
                    <input
                    type ="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                    />
                     <label>Hora de alta</label>
                    <input
                    type ="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                    />
                     <label>Sintomas</label>
                     <textarea
                     name="sintomas"
                     className="u-full-width"
                     onChange={actualizarState}
                     value={sintomas}
                     ></textarea>
                   
                   <button
                   type="submit"
                   className="u-full-width button-primary"

                   >Registrar cita</button>


                    
              
                
            </form>
        </Fragment>
      );
}

Formulario.propTypes={
    crearCita:PropTypes.func.isRequired
}
 
export default Formulario;