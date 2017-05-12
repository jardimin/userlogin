import _ from 'underscore'

const messages = {
  cadastro: {
    title: 'Você foi cadastrado com sucesso!',
    desc: 'Agora você só precisa checar seu email para confirmar o cadastro.'
  },
  logado: {
    title: 'Bem vindo!',
    desc: 'Você está logado.'
  },
  deletado: {
    title: 'Usuário deletado.',
    desc: ''
  },
  deslogado: {
    title: 'Desconectado.',
    desc: ''
  },
  PERMISSION_DENIED: {
    title: 'Você não tem permissão.',
    desc: ''
  },
  'auth/email-already-in-use': {
    title: 'Esse email já está cadastrado no sistema.',
    desc: ''
  }
}

export default {
  methods: {
    cadastrar () {
      this.$root.auth.createUserWithEmailAndPassword(this.cadastro.email, this.cadastro.senha)
        .then((user) => {
          this.flashMessage(messages.cadastro)
          this.$firebaseRefs.users.push({ nome: this.cadastro.nome, email: this.cadastro.email, confirm_email: false, logado: true })
          this.cadastro.nome = ''
          this.cadastro.senha = ''
          this.cadastro.email = ''
        })
        .catch((error) => {
          console.log(error.code)
          this.cadastro.nome = ''
          this.cadastro.senha = ''
          this.cadastro.email = ''
          this.flashMessage(messages[error.code])
        })
    },
    signin () {
      this.$root.auth.signInWithEmailAndPassword(this.logar.email, this.logar.senha).then((user) => {
        this.flashMessage(messages.logado)
        this.logar.email = ''
        this.logar.senha = ''
        this.isUser(user.email)
      }).catch((error) => {
        console.log(error)
      })
    },
    deleteUser (key) {
      this.$firebaseRefs.users.child(key).remove().then(() => {
        this.flashMessage(messages.deletado)
      }).catch((error) => {
        this.flashMessage(messages[error.code])
      })
    },
    signout () {
      this.$firebaseRefs.users.child(this.user.ref).child('logado').set(false)
      this.$root.auth.signOut().then((t) => {
        this.flashMessage(messages.deslogado)
      }).catch((c) => {
        console.log('c: ', c)
        console.log('Foi catch')
      })
    },
    // Acha um usuário na database usando o email e mutaciona o modelo do user no Vuex
    isUser (email) {
      let find = _.findWhere(this.users, { email: email })
      console.log(this.users);
      if (find !== undefined) {
        this.userUpdate(find)
      } else {
        this.$firebaseRefs.users.push({ nome: 'Anonimo', email: email })
        this.userUpdate({ nome: 'Anonimo', email: email })
      }
    }
  }
}
