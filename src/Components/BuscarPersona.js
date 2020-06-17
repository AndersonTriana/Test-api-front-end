import React, { Component } from 'react'

class BuscarPersona extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Busqueda: '',
            handleSearch: props.handleSearch
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target

        this.setState({ [name]: value })
    }

    render() {
        const {Busqueda, handleSearch} = this.state
        return (
            <div>
                <form onSubmit={handleSearch}>
                    <input
                        type='text'
                        name='Busqueda'
                        className='search-input'
                        placeholder='Buscar por nombre'
                        value={Busqueda}
                        onChange={this.handleChange}
                    ></input>

                    <button className='search-button'>Buscar</button>
                </form>
            </div>
        )
    }

}

export default BuscarPersona
