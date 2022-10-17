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
      title: "",
      body: "",
      status: null,
      message: "",
      btnText: "Send Broadcast",
      isDisabled: false,
    };
  },

  methods: {
    async handleSubmit() {
      this.btnText = "Loading";
      this.isDisabled = true;
      const data = {
        title: this.title,
        body: this.body,
      };

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/sendfirebase`,
          data
        );
        console.log(response);
        if (response.data.success) {
          this.status = true;
          this.message = "Broadcast Sent sucessfully";
          this.$router.go();
        } else {
          this.status = false;
          this.message = "Broadcast Cant be sent";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        }
      } catch (e) {
        if (e.response.status === 400 || e.response.status === 422) {
          this.isDisabled = false;
          this.status = false;
          this.message = e.response.data.message;
          this.btnText = "Send Broadcast";
          this.isDisabled = false;
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } else {
          this.status = false;
          this.message = "Connection problem, try checking your network";
          this.isDisabled = false;
          this.btnText = "Send Broadcast";
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        }
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

        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="exampleFormControlInput1">Title</label>
            <input v-model="title" type="text" class="form-control" placeholder="Title" />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Message</label>
            <textarea
              v-model="body"
              class="form-control"
              rows="3"
              placeholder="Type your message..."
            ></textarea>
          </div>
          <button class="btn btn-info w-100 mt-2" :disabled="isDisabled">
            {{ btnText }}
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
