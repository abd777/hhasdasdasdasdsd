<template>
  <div>
    <vs-input 
      name="email"
      icon-no-border
      icon="icon icon-user"
      icon-pack="feather"
      label-placeholder="Email"
      v-model="email"
      class="w-full"
    />
    <span class="text-danger text-sm">email</span>

    <vs-input 
      type="password"
      name="password"
      icon-no-border
      icon="icon icon-lock"
      icon-pack="feather"
      label-placeholder="Password"
      v-model="password"
      class="w-full mt-6"
    />
    <span class="text-danger text-sm">password</span>

    <div class="flex flex-wrap justify-between my-5">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
      <router-link to="/pages/forgot-password">Forgot Password?</router-link>
    </div>
    <!-- <vs-button type="border" @click="registerUser">Register</vs-button> -->
    <vs-button class="float-right" :disabled="!validateForm" @click="login">Login</vs-button>
  </div>
</template>

<script>
import router from '@/router';
export default {
  data() {
    return {
      email: "admin11@vuecms.com",
      password: "aaaaaa",
      checkbox_remember_me: false,
    };
  },
  computed: {
    validateForm() {
      return this.email != "" && this.password != "";
    },
  },
  methods: {
    checkLogin() {
      // If user is already logged in notify
      console.log("sda", this.$store.state.auth.isUserLoggedIn());
      var d = true;
      if (d) {
        // Close animation if passed as payload
        // this.$vs.loading.close()
        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning",
        });
        return false;
      }
      return true;
    },
    login() {
      // Loading
      this.$vs.loading();
      const payload = {
        checkbox_remember_me: this.checkbox_remember_me,
        userDetails: {
          email: this.email,
          password: this.password,
        },
        notify: this.$vs.notify,
        closeAnimation: this.$vs.loading.close,
      };
      var that=this;
      this.$store.dispatch("auth/loginAttempt", payload).then(res=>{
        that.$vs.loading.close();
        router.push('/');
      }).catch(err=>{ 
        that.$vs.loading.close()
        console.log(err);
      })
    },
    registerUser() {
      if (!this.checkLogin()) return;
      this.$router.push("/pages/register").catch(() => {});
    },
  },
};
</script>


<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook {
      background-color: #1551b1;
    }
    .bg-twitter {
      background-color: #00aaff;
    }
    .bg-google {
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>
