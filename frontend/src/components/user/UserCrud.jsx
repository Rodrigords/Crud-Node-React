import React, { Component } from 'react'
import Main from '../template/Main'
// import Axios from 'axios'
import api from '../../services/api'

const headerProps = {
  icon: 'users',
  title: 'Usuarios',
  subtitle: 'Cadastro de usuarios: Incluir, Listar, Alterar e Excluir'
}

// const baseUrl = 'http://localhost:3001/users'
const initialState = {
  user: { name: '', email: '' },
  list: []
}

export default class UserCrud extends Component {
  state = { ...initialState }

  async componentWillMount() {

    const response = await api.get('/users')
    this.setState({ list: response.data })


    // Axios(baseUrl).then(resp => {
    //   this.setState({ list: resp.data })
    // })
  }

  clear() {
    this.setState({ user: initialState.user })
  }

  async save() {
    const user = this.state.user
    user._id ? await api.put('/users', { user }) : await api.post('/users', { user })
    const response = await api.get('/users')
    const list = response.data
    this.setState({ user: initialState.user, list })
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter(u => u.id !== user.id)
    if (add) list.unshift(user)
    return list
  }

  updateField(event) {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value
    this.setState({ user })
  }

  renderForm() {
    return (
      <div className='form'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                name='name'
                value={this.state.user.name}
                onChange={e => this.updateField(e)}
                placeholder='Nome'
              />
            </div>
          </div>
          <div className='col-12 col-md-6'>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                name='email'
                value={this.state.user.email}
                onChange={e => this.updateField(e)}
                placeholder='email'
              />
            </div>
          </div>
        </div>

        <hr />

        <div className='row'>
          <div className='col-12 d-flex justify-content-end'>
            <button className='btn btn-success' onClick={e => this.save(e)}>
              Salvar
            </button>
            <button
              className='btn btn-secondary ml-2'
              onClick={e => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  load(user) {
    this.setState({ user })
  }

  async remove(user) {
    
    await api.delete('/users', { user })
    const response = await api.get('/users')
    const list = response.data
    this.setState({ user: initialState.user, list })
    // this.clear()

  }

  renderTable() {
    return (
      <table className='table mt-4'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    )
  }

  renderRows() {
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button className='btn btn-primary' onClick={() => this.load(user)}>
              <i className='fa fa-pencil' />
            </button>
            <button
              className='btn btn-danger ml-2'  
              onClick={() => this.remove(user)}
            >
              <i className='fa fa-trash' />
            </button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    )
  }
}
