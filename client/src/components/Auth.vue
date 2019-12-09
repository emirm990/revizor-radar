<template>
  <div class="hello">
    <div v-if="!auth">
      <button v-if="loginActive" @click="loginForm">Login</button>
      <button v-if="registerActive" @click="registerForm">Register</button>
    </div>
    <div v-if="auth">
      <p>Welcome {{name}}</p>
      <button v-if="auth" @click="logout">Logout</button>
    </div>

    <form v-if="registerClicked" id="register" v-on:submit.prevent="handleRegister">
      <input type="text" name="name" id="name" v-model="name" required autocomplete="name" />
      <input type="email" name="email" id="email" v-model="email" required autocomplete="username" />
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        required
        autocomplete="new-password"
      />
      <input type="submit" />
    </form>
    <form v-if="loginClicked" id="login" v-on:submit.prevent="handleLogin">
      <input type="email" name="email" id="email" v-model="email" required autocomplete="username" />
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        required
        autocomplete="current-password"
      />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import AuthService from "../AuthService";
export default {
  name: "Auth",
  components: {},
  data() {
    return {
      loginActive: true,
      loginClicked: false,
      registerActive: true,
      registerClicked: false,
      name: "",
      email: "",
      password: "",
      auth: false,
      error: false
    };
  },
  watch: {
    auth: function() {
      this.$emit("authChange", { auth: this.auth, name: this.name });
    }
  },
  methods: {
    async handleRegister() {
      await AuthService.register(this.name, this.email, this.password);
    },
    async handleLogin() {
      let authData = await AuthService.login(this.email, this.password);
      if (authData.data.response === true) {
        this.auth = authData.data.response;
        this.name = authData.data.name;
        this.loginActive = false;
        this.loginClicked = false;
        this.error = false;
      } else {
        this.error = authData.data.error;
      }
      this.password = "";
    },
    loginForm() {
      this.loginClicked = !this.loginClicked;
      this.registerClicked = false;
      this.registerActive = false;
    },
    registerForm() {
      this.registerClicked = !this.registerClicked;
      this.loginClicked = false;
      this.loginActive = false;
    },
    logout() {
      this.loginActive = true;
      this.loginClicked = false;
      this.registerActive = true;
      this.registerClicked = false;
      this.auth = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
