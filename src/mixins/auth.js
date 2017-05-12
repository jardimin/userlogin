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
    // Cadastra o usuário no firebase e cria uma referência do mesmo na database
    cadastrar () {
      this.$root.auth.createUserWithEmailAndPassword(this.cadastro.email, this.cadastro.senha)
        .then((user) => {
          // Chama função de mensagem no actions do Vuex
          this.flashMessage(messages.cadastro)
          // Cria a referência do usuário na database
          this.$firebaseRefs.users.push({ nome: this.cadastro.nome, email: this.cadastro.email, confirm_email: false, logado: true })
          // Retorna os campos de cadastro para seu valor original
          this.cadastro.nome = ''
          this.cadastro.senha = ''
          this.cadastro.email = ''
        })
        .catch((error) => {
          console.log(error.code)
          // Retorna os campos de cadastro para seu valor original
          this.cadastro.nome = ''
          this.cadastro.senha = ''
          this.cadastro.email = ''
          // Chama função de mensagem no actions do Vuex
          this.flashMessage(messages[error.code])
        })
    },
    // Função para login de usuário já cadastrado
    signin () {
      this.$root.auth.signInWithEmailAndPassword(this.logar.email, this.logar.senha).then((user) => {
        // Chama função de mensagem no actions do Vuex
        this.flashMessage(messages.logado)
        // Retorna os campos de login para seu valor original
        this.logar.email = ''
        this.logar.senha = ''
        // Chama função isUser que se encontra nesse mixin
        this.isUser(user.email)
      }).catch((error) => {
        // TODO: Verificar os error que podem ocorrer e criar mensagem para cada um no objeto messages
        console.log(error.code)
      })
    },
    // Deleta um usuário da database. Precisa ter um usuário logado
    // TODO: Apenas o próprio usuário pode deletar a si mesmo e deletar também o usuário da autenticação
    deleteUser (key) {
      this.$firebaseRefs.users.child(key).remove().then(() => {
        // Chama função de mensagem no actions do Vuex
        this.flashMessage(messages.deletado)
      }).catch((error) => {
        // Chama função de mensagem no actions do Vuex
        this.flashMessage(messages[error.code])
      })
    },
    // Desloga o usuário logado
    signout () {
      // Determina a propriedade logado do usuário em sua referencia na database para false
      this.$firebaseRefs.users.child(this.user.ref).child('logado').set(false)
      this.$root.auth.signOut().then((t) => {
        // Chama função de mensagem no actions do Vuex
        this.flashMessage(messages.deslogado)
      }).catch((c) => {
        // TODO: Verificar os error que podem ocorrer e criar mensagem para cada um no objeto messages
        console.log('c: ', c)
        console.log('Foi catch')
      })
    },
    // Acha um usuário na database usando o email e mutaciona o modelo do user no Vuex
    isUser (email) {
      // Cria uma variavel e a relaciona ao usuario da database que possui o email fornecido
      let find = _.findWhere(this.users, { email: email })
      if (find !== undefined) {
        this.userUpdate(find)
      } else {
        this.$firebaseRefs.users.push({ nome: 'Anonimo', email: email })
        this.userUpdate({ nome: 'Anonimo', email: email })
      }
    }
  }
}
