<script>
import Layout from "@layouts/auth";
//  import { authMethods } from "@state/helpers";
// import appConfig from "@src/app.config";
// import axios from "axios";

export default {
  components: { Layout },
  data() {
    return {
      id: "",
      password: "",
      status: null,
      message: "",
      btnText: "Sign In",
      isDisabled: false,
    };
  },

  methods: {
    // ...authMethods,
    // Try to log the user in with the username
    // and password they provided.

    async handleSubmit() {
      this.btnText = "Loading";
      this.isDisabled = true;

      this.$store
        .dispatch("LOGIN", {
          id: this.id,
          password: this.password,
        })
        .then((success) => {
          if (success === true) {
            this.status = true;
            this.message = "Login Sucessful";
            this.interval = setTimeout(() => {
              this.$router.push("/dashboard");
            }, 3000);
          } else {
            this.status = false;
            this.message = "Incorrect Email/Username Or Password";
            this.interval = setTimeout(() => {
              this.status = null;
            }, 3000);
          }
        })
        .catch((e) => {
          console.log(e.response.status);
          if (e.response.status === 400) {
            this.status = false;
            this.message = e.response.data.message;
          }
        });
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 p-2" style="max-width: 300px !important ; width: 100%">
        <div class="text-center">
          <a href="/">
            <span>
              <img src="@assets/images/logo.png" alt="" height="33" />
            </span>
          </a>
          <p class="text-muted mt-2 mb-4"></p>
        </div>

        <div class="card" style="border-radius: 10px !important">
          <div class="card-body p-3">
            <div class="text-center mb-4">
              <h4 class="text-uppercase mt-0" style="font-size: 13px">Sign In</h4>
            </div>

            <b-form @submit.prevent="handleSubmit">
              <b-form-group id="input-group-1" label="Username" label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="id"
                  type="text"
                  required
                  placeholder="Enter username, Email or Number"
                  autocomplete="username"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="input-group-2" label="Password" label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="password"
                  type="password"
                  required
                  placeholder="Enter password"
                  aria-autocomplete="none"
                  autocomplete="current-password"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="button-group" class="mt-4">
                <b-button type="submit" variant="primary" class="btn-block"
                  >Log In</b-button
                >
              </b-form-group>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="row mt-3">
          <div class="col-12 text-center">
            <p>
              <router-link tag="a" to="/forget-password" class="text-muted ml-1"
                ><i class="fa fa-lock mr-1"></i>Forgot your password?</router-link
              >
            </p>
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<style>
#input-group-1,
#input-group-2 {
  font-size: 11px !important;
}
.btn-block {
  background: rgb(71, 5, 175) !important;
  border: 1px solid rgb(71, 5, 175) !important;
}
</style>
