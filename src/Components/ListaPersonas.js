import React from 'react'

function ListaPersonas(props) {
    return(
            <tr>
                <td>{props.item.Nombre}</td>
                <td>{props.item.Documento}</td>
                <td><button id={props.item.id} name='edit' onClick={props.handleEdit}>Editar</button></td>
                <td><button id={props.item.id} name='delete' onClick={props.handleDelete}>Eliminar</button></td>
            </tr>
    )
}

export default ListaPersonas 