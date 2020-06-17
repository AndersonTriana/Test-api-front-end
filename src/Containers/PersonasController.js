import React, { Component } from 'react'
import ListaPersonas from '../Components/ListaPersonas'
import EditarPersona from '../Components/EditarPersona'
import CrearPersona from '../Components/CrearPersona'
import BuscarPersona from '../Components/BuscarPersona'
import '../Styles/Controller.css'

class ListaPersonasContainer extends Component {
    constructor() {
        super()
        this.state = {
            Personas: [],
            isLoading: false,
            error: null,
            isEditing: null,
            Encontrado: null
        }

        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleStore = this.handleStore.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        this.refreshState()
    }

    refreshState() {
        this.setState({ isLoading: true })
        const api = 'http://localhost/api/personas'
        const options = { method: 'GET' }

        fetch(api, options)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ...')
                }
            })
            .then(data => {
                const Personas = data.map(person => ({
                    id: person.id,
                    Nombre: person.Nombre,
                    Documento: person.Documento
                }))
                this.setState({
                    Personas: Personas,
                    isLoading: false
                })
            })
            .catch(error => this.setState({ error, isLoading: false }))
    }

    handleDelete(event) {
        const { id } = event.target
        const api = 'http://localhost/api/personas/' + id
        const options = { method: 'DELETE' }

        if (this.state.isEditing == id) {
            this.setState({ isEditing: null })
        }

        fetch(api, options)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong deleting')
                }
            })
            .then(() => this.refreshState())
            .catch(error => this.setState({ error, isLoading: false }))
    }

    handleEdit(event) {
        const { id } = event.target

        this.setState({ isEditing: id })
    }

    handleCancel() {
        this.setState({ isEditing: false })
    }

    handleUpdate(event) {

        const { Nombre, Documento, id } = event.target

        const api = 'http://localhost/api/personas/' + id

        const query = JSON.stringify({
            id: id,
            Nombre: Nombre.value,
            Documento: Documento.value
        })

        const options = {
            method: 'put',
            body: query,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        event.preventDefault()

        fetch(api, options)
            .then(response => response.json())
            .then(() => this.refreshState())
            .then(error => console.error(error))

    }

    handleStore(event) {
        const { Nombre, Documento } = event.target

        const api = 'http://localhost/api/personas'

        const query = JSON.stringify({
            Nombre: Nombre.value,
            Documento: Documento.value
        })

        const options = {
            method: 'post',
            body: query,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        event.preventDefault()

        fetch(api, options)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(() => this.refreshState())
            .catch(error => console.error(error))

    }

    handleSearch(event) {
        event.preventDefault()

        const { Busqueda } = event.target
        const { Personas, Encontrado } = this.state

        console.log(Busqueda.value)
        console.log(Personas[0].Nombre)
        console.log(Encontrado)


        this.setState({
            Encontrado: Personas.find(persona => { return persona.Nombre === Busqueda.value ? true : false })
        })
    }

    render() {
        const { Personas, isLoading,
            error, isEditing, Encontrado } = this.state

        const editarComponent = isEditing ?
            <EditarPersona
                key={isEditing}
                item={Personas.find(persona => persona.id == isEditing ? true : false)}
                handleCancel={this.handleCancel}
                handleUpdate={this.handleUpdate}
            />
            :
            ''

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

        const crearComponent = <CrearPersona handleStore={this.handleStore} />

        const buscarComponent = <BuscarPersona handleSearch={this.handleSearch} />

        const encontradoComponent = Encontrado ?
            <ListaPersonas
                style={{color: 'red'}}
                key={Encontrado.id}
                item={Encontrado}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
            />
            :
            ''

        if (error) {
            return (
                <h3>{error.message}</h3>
            )
        }

        if (isLoading) {
            return (
                <h2 className='load'>Cargando...</h2>
            )
        }

        return (
            <div className='body'>
                <div className='header'>
                    <h1>Prueba api</h1>

                    {buscarComponent}
                </div>

                <h2 className='list-title'>Lista de personas</h2>

                {editarComponent}

                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {encontradoComponent}
                        {personasComponents}
                    </tbody>
                </table>
                {crearComponent}
            </div >
        )
    }
}

export default ListaPersonasContainer