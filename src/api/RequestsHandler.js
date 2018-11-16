import axios from 'axios'
import { AsyncStorage } from 'react-native'

const RequestsHandler = class RequestsHandler {
  constructor() {
    this.token = ''
    this.user = ''
    this.$http = axios
  }

  init() {
    _reAuthenticateUser()
    // AsyncStorage.getItem('token').then((token) => {
    //   if (token) {
    //     // c'è un token e va validato
    //     console.log('token valido')
    //     this._validateToken(token)
    //   }  else {
    //     // user non è loggato
    //     console.log('token NON valido')
    //     // this._redirectUnauthorized()
    //     this._reAuthenticateUser()
    //   }
    // }).done()
  }

  _validateToken = (token) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    axios.get(config.api.path + '/user').then(response => {

      // formatta la risposta e la salva nel dispositivo
      const user = JSON.stringify(response.data)
      AsyncStorage.setItem('user', user).then(() => {
        this._redirectAuthorized()
      })

    }).catch(err => {
      // se non riesce a recuperare l'utente prova ad autenticarlo di nuovo
      this._reAuthenticateUser()
    })
  }

  _reAuthenticateUser = () => {
    console.log('nuovo tentativo di autenticazione')
    AsyncStorage.multiGet(['email', 'password'], (err, stores) => {
      console.log(stores)
    })


    // AsyncStorage.getItem('email').then(value => {
    //   email = value
    //   AsyncStorage.getItem('password').then(value => {
    //     password = value
    //     this._attemptLogin(email, password)
    //   })
    // })
  }

  _attemptLogin = (email, password) => {
    let data = new FormData()
    data.append('email', email)
    data.append('password', password)

    axios.post(config.api.path + '/login', data).then(response => {
      // user logged in
      if (response.data.success) {
        console.log('nuovo tentativo di autenticazione riuscito')
        const user = JSON.stringify(response.data.user)
        const token = response.data.token

        // Salva il token
        AsyncStorage.multiSet([
          ['token', token],
          ['user', user]
        ], (err) => {
          this._redirectAuthorized()
        })

      } else {
        // se il login non funziona l'utente dovrà loggarsi di nuovo manualmente
        console.log('nuovo tentativo di autenticazione NON riuscito')
        const remove = ['token', 'user', 'email', 'password']
        AsyncStorage.multiRemove(remove, (err) => {
          this._redirectUnauthorized()
        })
      }
    })
  }
}

export default RequestsHandler
