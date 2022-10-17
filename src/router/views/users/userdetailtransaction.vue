<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import axios from "axios";
import moment from "moment";

export default {
  page: {
    title: "Dashboard",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      id: this.$route.params.id,
      ref: this.$route.params.user,
      token: null,
      users: [],
      totalpage: 0,
      pageNumber: 1,
      pages: "",
      page: "",
      totalAmount: 0,
      getTotal: 0,
      myear: "",
      m: "",
      ys: [],
      am: "",
      y: "",
      nm: "",
      day: "",
      daysInMonth: "",
      transactions: [],
      moment: moment,
      status: "",
      amount: "",
      before: "",
      after: "",
      commission: "",
      type: "",
      network: "",
      receiver: "",
      plan: "",
      name: "",
      date: "",
      fullname: "",
      username: "",
      email: "",
      phone: "",

      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  async mounted() {
    try {
      const getTransaction = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/findtransactionbyref?ref=${this.ref}`
      );

      this.status = getTransaction.data.data.status;
      this.amount = getTransaction.data.data.amount;
      this.before = getTransaction.data.data.bbefore;
      this.after = getTransaction.data.data.bafter;
      this.commission = getTransaction.data.data.commission;
      this.type = getTransaction.data.data.type;
      this.network = getTransaction.data.data.network;
      this.receiver = getTransaction.data.data.reciever;
      this.plan = getTransaction.data.data.plan;
      this.name = getTransaction.data.data.name;
      this.date = getTransaction.data.data.updated_at;
      const getUserbyID = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getuserbyid?id=${this.id}`
      );
      this.fullname = getUserbyID.data.data.fname + " " + getUserbyID.data.data.lname;
      this.username = getUserbyID.data.data.username;
      this.email = getUserbyID.data.data.email;
      this.phone = getUserbyID.data.data.phone;
      this.isLoading = false;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/");
        localStorage.removeItem("admin");
      }
    }
  },
};
</script>

<template>
  <Layout>
    <div
      class="row p-1 border-1 border bg-white"
      style="max-width: 500px; width: 100%; margin: 0px auto; border-radius: 10px"
    >
      <h4 class="text-center w-100">&#8358;{{ amount }}</h4>
      
      <div class="w-100 border-primary border-1">
        <div class="d-flex justify-content-between">
          <h5>Reference</h5>
          <p>{{ ref }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Receiver</h5>
          <p>{{ receiver }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Commission</h5>
          <p>&#8358;{{ commission }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Plan/Service</h5>
          <p v-if="plan === null && type === '1'">Airtime</p>
          <p v-else>{{plan}}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Amt. before</h5>
          <p>&#8358;{{ before }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Amt.after</h5>
          <p>&#8358;{{ after }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Name</h5>
          <p>{{ fullname }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Email</h5>
          <p>{{ email }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Username</h5>
          <p>{{ username }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Date</h5>
          <p>{{ moment(date).format("DD-MM-YYYY hh/mm") }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <h5>Status</h5>
          <p v-if="status === '1'" style="color:green">Success</p>
          <p v-else-if="status === '0'" style="color:crimson">Fail</p>
        </div>
      </div>
    </div>
  </Layout>
</template>
