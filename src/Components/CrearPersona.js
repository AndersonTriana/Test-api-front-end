import React, { Component } from 'react'


class CrearPersona extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Nombre: '',
            Documento: '',
            handleStore: props.handleStore
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        console.log(this.state.Nombre)
        console.log(this.state.Documento);
        
        this.setState({ [name]: value })
    }

    render() {
        const { Nombre, Documento, handleStore } = this.state

        return (
            <div className='create'>
                <h2>Crear persona:</h2>
                <form onSubmit={handleStore}>
                    <input
                        type='text'
                        name='Nombre'
                        placeholder='Nombre'
                        value={Nombre}
                        onChange={this.handleChange}
                    ></input>

                    <input
                        type='text'
                        name='Documento'
                        placeholder='Documento'
                        value={Documento}
                        onChange={this.handleChange}
                    ></input>

                    <button type='submit' >Crear</button>
                </form>
            </div>
        )
    }
}

export default CrearPersona