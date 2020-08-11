<template>
  <header>
    <b-navbar toggleable="md" fixed="top" :class="['py-3', {'nav_bg':clientHeight > 60}]">
      <b-navbar-brand to="/">
        <b-img src="logo.png" style="max-height:27px" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav></b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Home" class="font-weight-bold c_h6" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to="/about" class="font-weight-bold c_h6">About</b-nav-item>
          <b-nav-item to="/services" class="font-weight-bold c_h6">Services</b-nav-item>
          <b-nav-item
            class="font-weight-bold c_h6"
            v-if="!currentUser"
            @click="loginModal=!loginModal"
          >Login</b-nav-item>
          <b-nav-item
            class="font-weight-bold c_h6"
            v-if="!currentUser"
            @click="signupModal=!signupModal"
          >Signup</b-nav-item>
          <b-nav-item
            class="font-weight-bold c_h6"
            v-if="currentUser"
            @click="goToDashboard()"
          >Dashboard</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- Login Modal -->
    <b-modal v-model="loginModal" centered hide-header hide-footer>
      <div class="text-center">
        <h1>Login</h1>
        <b-row class="modal-input-group px-md-5">
          <b-col cols="12" class="pt-5">
            <b-input
              type="text"
              class="modal-input rounded-0"
              :state="isLoginEmailValid"
              v-model="login.email"
              placeholder=" Email"
            />
            <b-form-invalid-feedback class="input-helper" :state="isLoginEmailValid">Invalid email!</b-form-invalid-feedback>
            <b-form-valid-feedback class="input-helper" :state="isLoginEmailValid">Just Perfect.</b-form-valid-feedback>
          </b-col>
          <b-col cols="12" class="pt-3">
            <b-input
              type="password"
              class="modal-input rounded-0"
              v-model="login.password"
              placeholder=" Password"
              :state="isLoginPasswordValid"
            />
            <b-form-invalid-feedback
              class="input-helper"
              :state="isLoginPasswordValid"
            >Password can't be less then 6 characters</b-form-invalid-feedback>
            <b-form-valid-feedback class="input-helper" :state="isLoginPasswordValid">Just Perfect.</b-form-valid-feedback>
          </b-col>

          <b-col cols="12" class="pt-3">
            <b-button
              variant="primary"
              class="w-100 rounded-0 text-uppercase M-bold"
              @click="emailPasswordLogin()"
              :disabled="!isLoginEmailValid || !isLoginPasswordValid"
            >Login</b-button>
          </b-col>
        </b-row>
        <div class="d-flex justify-content-between px-5 pt-3">
          <span>
            <input type="checkbox" />Remember Me ?
          </span>
          <span class="M-bold secondary pointer">Forget Password</span>
        </div>
        <hr />
        <div class="text-center">
          Not A Memmber ?
          <span
            @click="loginModal =false ;signupModal=true"
            class="M-bold secondary pointer"
          >Sign Up</span>
        </div>
      </div>
    </b-modal>
    <!-- Signup  Modal -->
    <b-modal v-model="signupModal" centered hide-header hide-footer>
      <div class="text-center">
        <h1>Sign Up</h1>
        <b-row class="modal-input-group px-md-5">
          <b-col cols="12" class="pt-3">
            <b-input
              type="text"
              class="modal-input rounded-0"
              v-model="signup.email"
              :state="isSignupEmailValid"
              placeholder="Email"
            />
            <b-form-invalid-feedback class="input-helper" :state="isSignupEmailValid">Invalid email!</b-form-invalid-feedback>
            <b-form-valid-feedback class="input-helper" :state="isSignupEmailValid">Just Perfect.</b-form-valid-feedback>
          </b-col>
          <b-col cols="12" class="pt-3">
            <b-input
              type="password"
              class="modal-input rounded-0"
              v-model="signup.password"
              :state="isSignupPasswordValid"
              placeholder="Password"
            />
            <b-form-invalid-feedback
              class="input-helper"
              :state="isSignupPasswordValid"
            >Password Can't be less than 6 characters!</b-form-invalid-feedback>
            <b-form-valid-feedback class="input-helper" :state="isSignupPasswordValid">Just Perfect.</b-form-valid-feedback>
          </b-col>

          <b-col cols="12" class="pt-3">
            <b-input
              type="password"
              class="modal-input rounded-0"
              v-model="signup.cPassword"
              :state="isSignupPasswordSame"
              placeholder="Confirm Password"
            />
            <b-form-invalid-feedback
              class="input-helper"
              :state="isSignupPasswordSame"
            >Password Must Be Same!</b-form-invalid-feedback>
            <b-form-valid-feedback class="input-helper" :state="isSignupPasswordSame">Just Perfect.</b-form-valid-feedback>
          </b-col>

          <b-col cols="12" class="pt-3">
            <b-button
              :disabled="!isRoleSelected || !isSignupEmailValid || !isSignupPasswordValid || !isSignupPasswordSame"
              variant="primary"
              class="w-100 rounded-0 text-uppercase M-bold"
              @click="emailPasswordSignUp()"
            >Create A New Account</b-button>
          </b-col>
        </b-row>
        <div class="text-center px-5 pt-3">
          <span>
            By joining I agree to the
            <a href="/terms-and-conditions">
              <span class="M-bold secondary pointer">Terms And Conditions</span>
            </a>
            from Happy Sewa.
          </span>
        </div>
        <hr />
        <div class="text-center">
          Already A Memmber ?
          <span
            @click="signupModal =false ;loginModal=true"
            class="M-bold secondary pointer"
          >Login</span>
        </div>
      </div>
    </b-modal>
  </header>
</template>
<script>
import { auth } from "@/services/firebase";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loc: location.protocol + "//" + location.hostname,
      signupModal: false,
      loginModal: false,
      login: {
        email: null,
        password: null,
      },
      signup: {
        email: null,
        password: null,
        cPassword: null,
        role: null,
      },
      clientHeight: 0,
    };
  },
  computed: {
    ...mapGetters({ currentUser: "getUser" }),
    isLoginEmailValid() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var email = this.login.email;
      return email == null ? null : re.test(String(email).toLowerCase());
    },
    isLoginPasswordValid() {
      var password = this.login.password;
      return password == null ? null : password.length > 5;
    },
    isRoleSelected() {
      var role = this.signup.role;
      return role ? true : false;
    },
    isSignupEmailValid() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var email = this.signup.email;
      return email == null ? null : re.test(String(email).toLowerCase());
    },
    isSignupPasswordValid() {
      var password = this.signup.password;
      return password == null ? null : password.length > 5;
    },
    isSignupPasswordSame() {
      var password = this.signup.password;
      var cPassword = this.signup.cPassword;
      return cPassword == null ? null : password == cPassword;
    },
  },
  mounted() {
    if (!process.server) {
      window.addEventListener("scroll", (e) => {
        console.log(window.scrollY);
        this.clientHeight = window.scrollY;
      });
    }
  },
  methods: {
    goToDashboard() {
      location.replace(this.loc + ":8080/happysewa/dashboard");
    },
    reset() {
      this.login = {
        email: null,
        password: null,
      };
      this.signup = {
        email: null,
        password: null,
        cPassword: null,
        role: null,
      };
      this.signupModal = false;
      this.loginModal = false;
    },
    emailPasswordSignUp() {
      this.$store
        .dispatch("signup", {
          email: this.signup.email,
          password: this.signup.password,
        })
        .then((res) => {
          this.reset();
        })
        .catch((err) => {
          alert(err);
        });
    },
    emailPasswordLogin() {
      this.$store
        .dispatch("login", {
          email: this.login.email,
          password: this.login.password,
        })
        .then((res) => {
          this.reset();
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style scoped>
.c_srch {
  background-color: #f0f0f0;
  text-indent: 1.2em;
  border: none;
}
.c_srch::placeholder {
  text-indent: 1.2em;
}
.nav_bg {
  background-color: #ffffffad;
  box-shadow: 0 0 20px 3px black;
  backdrop-filter: blur(5px);
}
</style>