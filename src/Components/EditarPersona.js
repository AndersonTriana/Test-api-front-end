import React, { Component } from 'react'

class EditarPersona extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Nombre: props.item.Nombre,
            Documento: props.item.Documento,
            id: props.item.id,
            handleCancel: props.handleCancel,
            handleUpdate: props.handleUpdate
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target

        this.setState({ [name]: value })
    }

    render() {
        const { Nombre, Documento, id, handleUpdate, handleCancel } = this.state

        return (
            <div className='edit'>
                <h2>Editar Persona</h2>

                <form onSubmit={handleUpdate} id={id} >

                    <input
                        type='text'
                        name='Nombre'
                        onChange={this.handleChange}
                        value={Nombre}
                    ></input>

                    <input
                        type='text'
                        name='Documento'
                        onChange={this.handleChange}
                        value={Documento}
                    ></input>

                    <button
                        type='submit'
                        name='Guardar'
                    >Guardar</button>

                    <button
                        type='button'
                        name='Cancelar'
                        onClick={handleCancel}
                    >Cancelar</button>

                </form>
            </div>
        )
    }
}

export default EditarPersona