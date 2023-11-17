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
      selected: "Upload",
      message: "",
      status: null,
      username: "",
      fname: "",
      lname: "",
      phone: "",
      email: "",
      btnText: "Save",
      btnPass: "Save",
      dpassword: "",
      npassword: "",
      cnpassword: "",
      token: "",
      isDisabled: false,
      isLoading: false,
      fullPage: true,
      color: "#0A1AA8",
      ndata: "",
      mdata: "",
      nairtime: "",
      mairtime: "",
      nelect: "",
      melect: "",
      ncable: "",
      mcable: "",
      mtnapi: "",
      cdata: "",
      cbill: "",
      airtel: "",
      glo: "",
      mobile: "",
      mtn: "",
      caitime: "",
      plans: [],
      plan: "",
      price: "",
      imageUrl3: "",
      imageUrl2: "",
      imageUrl1: "",
      image1: null,
      image2: null,
      image3: null,
      btnUpload: "Save",
      server: "",
      ncaitime: "",
      ncdata: "",
      ncbill: "",
      bridgecardcfee: 0,
      bridgerate: 0,
      ftransferx: 0,
      cardcreatebridgecardcfee: 0,
      ktfee: 0,

      tfee: 0,
      mtnx: 0,
      glox: 0,
      airtelx: 0,
      mobilex: 0,
      tvx: 0,
      electricityx: 0,
      ltransferx: 0,
      aritimex: 0,
      cardx: 0,
      gloapi: "",
      airtelapi: "",
      chinapayrate: 0,
      chinapafee: 0,
    };
  },
  async mounted() {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getmanagement`
      );
      this.ndata = response.data.data.ndata;
      this.mdata = response.data.data.mdata;
      this.nairtime = response.data.data.nairtime;
      this.mairtime = response.data.data.mairtime;
      this.nelect = response.data.data.nelect;
      this.melect = response.data.data.melect;
      this.ncable = response.data.data.ncable;
      this.mcable = response.data.data.mcable;
      this.mtnapi = response.data.data.mtnapi;
      this.gloapi = response.data.data.gloapi;

      this.cdata = response.data.data.cdata;
      this.caitime = response.data.data.caitime;
      this.mtn = response.data.data.mtn;
      this.airtel = response.data.data.airtel;
      this.mobile = response.data.data.mobile;
      this.glo = response.data.data.glo;
      this.server = response.data.data.serverstatus;
      this.ncaitime = response.data.data.ncaitime;
      this.ncdata = response.data.data.ncdata;
      this.ncbill = response.data.data.ncbill;
      this.ktfee = response.data.data.ktfee;

      this.tfee = response.data.data.tfee;
      this.mtnx = response.data.data.mtnx;
      this.glox = response.data.data.glox;
      this.airtelx = response.data.data.airtelx;
      this.mobilex = response.data.data["9mobilex"];
      this.tvx = response.data.data.tvx;
      this.electricityx = response.data.data.electricityx;
      this.ltransferx = response.data.data.ltransferx;
      this.aritimex = response.data.data.airtimex;
      this.cardx = response.data.data.cardx;

      this.cbill = response.data.data.cbill;
      this.bridgecardcfee = response.data.data.bridgecardcfee;
      this.bridgerate = response.data.data.bridgerate;
      this.ftransferx = response.data.data.ftransferx;
      this.cardcreatebridgecardcfee = response.data.data.cardcreatebridgecardcfee;
      this.cardmbridgecardcfee = response.data.data.cardmbridgecardcfee;
      this.airtelapi = response.data.data.airtelapi;
      (this.chinapafee = response.data.data.chinapafee),
        (this.chinapayrate = response.data.data.chinapayrate);
    } catch (e) {
      console.log(e);
    }
    try {
      const response = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getmtnplans`);
      this.plans = response.data.data;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/");
        localStorage.removeItem("admin");
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.btnText = "Loading";
      this.isDisabled = true;
      const data = {
        ndata: this.ndata,
        mdata: this.mdata,
        nairtime: this.nairtime,
        mairtime: this.mairtime,

        ncable: this.ncable,
        mcable: this.mcable,
        nelect: this.nelect,
        melect: this.melect,
        mtnapi: this.mtnapi,
        cdata: this.cdata,
        caitime: this.caitime,
        cbill: this.cbill,
        mtn: this.mtn,
        airtel: this.airtel,
        glo: this.glo,
        mobile: this.mobile,
        serverstatus: this.server,
        ncdata: this.ncdata,
        ncaitime: this.ncaitime,
        ncbill: this.ncbill,
        ktfee: this.ktfee,
        tfee: this.tfee,
        mtnx: this.mtnx,
        glox: this.glox,
        airtelx: this.airtelx,
        mobilex: this.mobilex,
        tvx: this.tvx,
        electricityx: this.electricityx,
        ltransferx: this.ltransferx,
        aritimex: this.aritimex,
        cardx: this.cardx,
        bridgecardcfee: this.bridgecardcfee,
        bridgerate: this.bridgerate,
        ftransferx: this.ftransferx,
        cardmbridgecardcfee: this.cardmbridgecardcfee,
        cardcreatebridgecardcfee: this.cardcreatebridgecardcfee,
        airtelapi: this.airtelapi,
        gloapi: this.gloapi,
        chinapayrate: this.chinapayrate,
        chinapafee: this.chinapafee,
      };
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/setapp`,
          data
        );
        if (response.data.status === "success") {
          this.status = true;
          this.message = "Successful";
          this.isDisabled = false;

          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        } else {
          this.status = false;
          this.message = response.data.message;
          this.isDisabled = false;
          this.interval = setTimeout(() => {
            this.status = null;
          }, 3000);
        }
      } catch (e) {
        if (e.response.status === 400 || e.response.status === 422) {
          this.isDisabled = false;
          this.status = false;
          this.message = e.response.data.message;
          this.btnText = "Save";
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
            this.btnText = "Save";
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
          <label for="mtn">MTN PLUG</label>
          <select v-model="mtn" class="form-control">
            <option value="vtu">HOSTED SIM</option>
            <option value="airtime">SME PLUG</option>
          </select>
          <label for="mtn">AIRTEL PLUG</label>
          <select v-model="airtel" class="form-control">
            <option value="vtu">HOSTED SIM</option>
            <option value="airtime">SME PLUG</option>
          </select>
          <label for="mtn">9MOBILE PLUG</label>
          <select v-model="mobile" class="form-control">
            <option value="vtu">HOSTED SIM</option>
            <option value="airtime">SME PLUG</option>
          </select>
          <label for="mtn">GLO</label>
          <select v-model="glo" class="form-control">
            <option value="vtu">HOSTED SIM</option>
            <option value="airtime">SME PLUG</option>
          </select>
          <label for="mtn">SWITCH TRANSACTION</label>
          <select v-model="server" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>
          <label for="mtn">SWITCH MTN DATA</label>
          <select v-model="mtnx" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>
          <label for="mtn">SWITCH GLO</label>
          <select v-model="glox" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>
          <label for="mtn">SWITCH AIRTEL</label>
          <select v-model="airtelx" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>
          <label for="mtn">SWITCH 9MOBILE</label>
          <select v-model="mobilex" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>
          <label for="mtn">SWITCH TV</label>
          <select v-model="tvx" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>
          <label for="mtn">SWITCH ELECTRICITY</label>
          <select v-model="electricityx" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>
          <label for="mtn">SWITCH LOCAL TRANSFER</label>
          <select v-model="ltransferx" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>
          <label for="mtn">SWITCH AIRTIME</label>
          <select v-model="aritimex" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>
          <label for="mtn">SWITCH FOREIGN AIRTIME</label>
          <select v-model="ftransferx" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>

          <label for="mtn">SWITCH CARD</label>
          <select v-model="cardx" class="form-control">
            <option value="1">ENABLED</option>
            <option value="0">DISABLED</option>
          </select>

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
  color: #4705af;
}
.active {
  color: #4705af !important;
}
</style>
