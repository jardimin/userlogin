export default {
  methods: {
    cadastrar () {
      this.$root.auth.createUserWithEmailAndPassword(this.cadastro.email, this.cadastro.senha)
        .then((user) => {
          console.log(this.$root.firebaseApp.auth().currentUser)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signin () {
      this.$root.auth.signInWithEmailAndPassword(this.logar.email, this.logar.senha).then((data) => {
        console.log('data: ', data)
      }).catch((error) => {
        console.log('error: ', error)
      })
    },
    deleteUser (key) {
      this.$firebaseRefs.users.child(key).remove(() => {
        console.log('worked')
      })
    },
    signout () {
      this.$root.auth.signOut().then((t) => {
        console.log('t: ', t)
        console.log('Foi then')
      }).catch((c) => {
        console.log('c: ', c)
        console.log('Foi catch')
      })
    }
  }
}
