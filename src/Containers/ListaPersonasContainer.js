import React, { Component } from 'react'
import ListaPersonas from '../Components/ListaPersonas'

class ListaPersonasContainer extends Component {
    constructor() {
        super()
        this.state = {
            Personas: [],
            isLoading: false,
            error: null
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.refreshState()      
    }

    refreshState() {
        this.setState({isLoading: true})  
        const api = 'http://localhost/api/personas' 
        const options = { method: 'GET' } 

        fetch(api, options)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ...');
                }
            })
            .then(data => {
                const Personas = data.map(person => ({
                    id: person.id,
                    Nombre: person.Nombre,
                    Documento: person.Documento
                }))
                console.log(Personas)
                this.setState({
                    Personas: Personas,
                    isLoading: false
                })
                console.log(this.state.isLoading)
            })
            .catch(error => this.setState({ error, isLoading: false })) 
    }

    handleDelete(event) {
        const { id } = event.target
        console.log(id)
        const api = 'http://localhost/api/personas/' + id 
        const options = { method: 'DELETE'} 

        console.log(api)

        fetch(api, options)
            .then(response => {
                if(response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong deleting');
                }
            })
            .then(data => this.refreshState())
            .catch(error => this.setState({error, isLoading: false}))
    }

    handleEdit(event) {

    }

    render() {
        const { Personas, isLoading, error } = this.state

        const personasComponents = Personas.map(persona => {
            return (
                <ListaPersonas
                    key={persona.id}
                    item={persona}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                />
            )
        })

        console.log(Personas)

        if (error) {
            return(
                <h3>{error.message}</h3>
            )
        }

        if (isLoading){ 
            return(
                <h2>Cargando...</h2>
            )
        }        

        return (
            <div>
                <h1>Prueba api</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personasComponents}
                    </tbody>    
                </table>             
            </div >
        )
    }
}

export default ListaPersonasContainer