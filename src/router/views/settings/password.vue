<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import axios from "axios";
// import moment from "moment";
import Message from "@/src/components/message.vue";

export default {
  page: {
    title: "Admin Settings",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, Message },
  data() {
    return {
      code: "",
      status: null,
      message: "",
      btnText: "Send Code",
      isDisabled: false,
      id: "",
      btnPass: "Update Password",
      token: "",
    };
  },

  methods: {
    async handlePassword() {
      alert("helo");
      this.isDisabled = true;
      this.btnPass = "Loading";
      if (this.npassword.length >= 6) {
        if (this.npassword === this.cnpassword) {
          const data = {
            password: this.dpassword,
            newpassword: this.npassword,
          };
          try {
            const response = await axios.post(
              `${process.env.VUE_APP_BASE_URL}api/updatepassword`,
              data
            );

            this.status = true;
            this.message = response.data.message;
            this.npassword = "";
            this.dpassword = "";
            this.cnpassword = "";
            this.btnPass = "Update Password";
            this.interval = setTimeout(() => {
              this.status = null;
            }, 3000);
          } catch (e) {
            if (e.response.status === 400 || e.response.status === 422) {
              this.isDisabled = false;
              this.status = false;
              this.message = e.response.data.message;
              this.btnPass = "Sign In";
              this.isDisabled = false;
              this.interval = setTimeout(() => {
                this.status = null;
              }, 3000);
            } else {
              this.status = false;
              this.message = "Connection problem, try checking your network";
              this.isDisabled = false;
              this.interval = setTimeout(() => {
                this.status = null;
              }, 3000);
            }
          }
        } else {
          this.status = false;
          this.message = "Password does not match ";
          this.setTimeout = setTimeout(() => {
            this.status = null;
          }, 3000);
        }
      } else {
        this.status = false;
        this.message = "Password must be atleast six ";
        this.setTimeout = setTimeout(() => {
          this.status = null;
        }, 3000);
      }
    },
  },
};
</script>

<template>
  <Layout>
    <div style="max-width: 700px; width: 100%; margin: 0px auto">
      <b-card>
        <Message :status="status" :message="message" />

        <form @submit.prevent="handlePassword">
          <div class="form-group">
            <label for="exampleFormControlInput1">Password</label>
            <input
              v-model="dpassword"
              type="password"
              class="form-control"
              placeholder="Enter your current passord"
              autocomplete="off"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">New Password</label>
            <input
              v-model="npassword"
              type="password"
              class="form-control"
              placeholder="Enter New password"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Confirm Password</label>
            <input
              v-model="cnpassword"
              type="password"
              class="form-control"
              placeholder="Confirm New password"
            />
          </div>

          <button class="btn btn-info w-100 mt-2" :disabled="isDisabled">
            {{ btnPass }}
          </button>
        </form>
      </b-card>
    </div>
  </Layout>
</template>
<style>
td {
  font-size: 0.7rem !important;
}
.card-body {
  padding: 0.6rem !important;
}
.actives {
  background-color: grey;
  color: #fff;
}
.active {
  color: #4705af !important;
}
</style>
