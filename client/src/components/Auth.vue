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
    <div>
      <p>{{message}}</p>
    </div>
    <form v-if="registerClicked" id="register" v-on:submit.prevent="handleRegister">
      <input
        type="text"
        name="name"
        id="name"
        v-model="name"
        required
        autocomplete="name"
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        id="email"
        v-model="email"
        required
        autocomplete="username"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        required
        autocomplete="new-password"
        placeholder="Password"
      />
      <input
        type="password"
        name="password"
        id="password-repeat"
        v-model="repeatedPassword"
        required
        autocomplete="new-password"
        placeholder="Repeat your password"
      />
      <input type="submit" />
    </form>
    <form v-if="loginClicked" id="login" v-on:submit.prevent="handleLogin">
      <input
        type="email"
        name="email"
        id="email"
        v-model="email"
        required
        autocomplete="username"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        required
        autocomplete="current-password"
        placeholder="Password"
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
      repeatedPassword: "",
      auth: false,
      error: false,
      message: ""
    };
  },
  watch: {
    auth: function() {
      this.$emit("authChange", { auth: this.auth, name: this.name });
    }
  },
  methods: {
    async handleRegister() {
      if (this.password === this.repeatedPassword) {
        let response = await AuthService.register(
          this.name,
          this.email,
          this.password
        );
        this.message = response.data.message;
        this.registerActive = false;
        this.registerClicked = false;
        this.error = false;
        setTimeout(() => (this.message = ""), 5000);
      } else {
        this.message = "Your passwords don't match!";
      }
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
    },
    registerForm() {
      this.registerClicked = !this.registerClicked;
      this.loginClicked = false;
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
#login,
#register {
  display: flex;
  flex-direction: column;
}
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
