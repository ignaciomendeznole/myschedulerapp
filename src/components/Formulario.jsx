import React, { Fragment, useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //CREAR STATE DE CITAS CON ESTADO INICIAL DE OBJETOS PERO VACIOS PARA QUE SE VAYAN RELLENANDO CUANDO SE ACTUALIZA EL ESTADO

    const [ cita, actualizarCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '', 
        sintomas: ''

    });

    const [ error, actualizarError ] = useState(false)

    //FUNCION QUE SE EJECUTA CADA VEZ QUE EL USUARIO ESCRIBE EN UN INPUT
    //LE PASAMOS COMO PARAMETRO EL EVENTO QUE SE ESTA EJECUTANDO
    const actualizarState = (e) => {
        actualizarCita( {
            ...cita, //Creamos una copia del onjeto anterior para que no se pierdan los cambios
            [e.target.name]: e.target.value //Asigna el valor del input a la propiedad correspondiente del objeto
        } )
    }


    const { mascota, propietario, fecha, hora, sintomas } = cita; //Extraemos los datos de la cita con object destructuring


    // CUANDO EL USUARIO PRESIONA ENVIAR CITA Y ENVIA EL FORMULARIO

    const submitCita = (e) => {
        e.preventDefault();


        // Validar

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true)
            return;
        }

        //ELIMINAR MENSAJE DE ERROR EN EL CASO QUE COMPLETE TODOS LOS CAMPOS    

        actualizarError(false);

        // Asignar un ID

        cita.id = shortid();
        

        // Crear la cita

        crearCita(cita);



        //Reiniciar el form para cada vez que se agregue una nueva, se reinicien los campos
        
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '', 
            sintomas: ''
      });
    }

    return ( 
        <Fragment>
            <h2> Crear cita </h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Paciente</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                
                />

                <label>Nombre Propietario</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Propietario"
                    onChange={actualizarState}
                    value={propietario}
                
                />
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
            

        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired
}
 
export default Formulario;