<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import axios from "axios";
// import moment from "moment";
import TabNav from "../../../components/tabnav.vue";
import Tab from "../../../components/tab.vue";
import Message from "@/src/components/message.vue";

export default {
  page: {
    title: "Admin Settings",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, TabNav, Tab, Message },
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
      airtelapi: "",
      gloapi: "",
      mobileapi: 0,
      airtimeapi: 0,
      cardmbridgecardcfee: 0,
      airtime: 0,
      chinapayrate: 0,
      chinapafee: 0,
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/getmanagement`
      );
      console.log(response);
      this.ndata = response.data.data.ndata;
      this.mdata = response.data.data.mdata;
      this.nairtime = response.data.data.nairtime;
      this.mairtime = response.data.data.mairtime;
      this.nelect = response.data.data.nelect;
      this.melect = response.data.data.melect;
      this.ncable = response.data.data.ncable;
      this.mcable = response.data.data.mcable;
      this.mtnapi = response.data.data.mtnapi;
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
      this.airtelapi = response.data.data.airtelapi;
      this.gloapi = response.data.data.gloapi;
      this.mobileapi = response.data.data.mobileapi;
      this.airtimeapi = response.data.data.airtimeapi;

      this.ktfee = response.data.data.ktfee;
      this.aritimex = response.data.data.airtimex;
      this.airtime = response.data.data.airtime;
      this.tfee = response.data.data.tfee;
      this.mtnx = response.data.data.mtnx;
      this.glox = response.data.data.glox;
      this.airtelx = response.data.data.airtelx;
      this.mobilex = response.data.data["9mobilex"];
      this.tvx = response.data.data.tvx;
      this.electricityx = response.data.data.electricityx;
      this.ltransferx = response.data.data.ltransferx;
      this.cardx = response.data.data.cardx;

      this.cbill = response.data.data.cbill;
      this.bridgecardcfee = response.data.data.bridgecardcfee;
      this.bridgerate = response.data.data.bridgerate;
      this.ftransferx = response.data.data.ftransferx;
      this.cardcreatebridgecardcfee = response.data.data.cardcreatebridgecardcfee;
      this.cardmbridgecardcfee = response.data.data.cardmbridgecardcfee;

      this.cbill = response.data.data.cbill;
      (this.chinapayrate = response.data.data.chinapayrate),
        (this.chinapafee = response.data.data.chinapayrate);
    } catch (e) {
      console.log(e);
    }
    try {
      const response = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getmtnplans`);
      this.plans = response.data.data;
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        this.$router.push("/");
        localStorage.removeItem("admin");
      }
    }
  },

  methods: {
    async handleImage() {
      alert("hello");
      this.btnUpload = "Loading";
      const formdata = new FormData();
      if (this.image1 && this.image2 == null && this.image3 == null) {
        formdata.append("image1", this.image1, this.image1.name);
      } else if (this.image2 && this.image3 == null && this.image1 == null) {
        formdata.append("image2", this.image2, this.image2.name);
      } else if (this.image3 && this.image1 == null && this.image2 == null) {
        formdata.append("image3", this.image3, this.image3.name);
      } else if (this.image1 && this.image2 && this.image3) {
        formdata.append("image1", this.image1, this.image1.name);
        formdata.append("image2", this.image2, this.image2.name);
        formdata.append("image3", this.image3, this.image3.name);
      }

      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/uploadbanner`,
          formdata
        );
        if (response.data.status === "true") {
          this.status = true;
          this.message = "Uploaded Succesful";
          this.$router.go();
        } else if (response.data === "") {
          this.status = false;
          this.message = "Images not uploaded";
          this.btnUpload = "Save";
        }
      } catch (e) {
        if (e.response.status >= 400) {
          this.isDisabled = false;
          this.status = false;
          this.message = e.response.data.message;
          this.btnText = "Update";
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
    },
    setSelected(tab) {
      this.selected = tab;
    },
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
        ktfee: this.ktfee,

        cdata: this.cdata,
        caitime: this.caitime,
        cbill: this.cbill,
        mtn: this.mtn,
        airtel: this.airtel,
        glo: this.glo,
        mobile: this.mobile,
        serverstatus: this.server,
        ncaitime: this.ncaitime,
        ncdata: this.ncdata,
        ncbill: this.ncbill,
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
        gloapi: this.gloapi,
        airtelapi: this.airtelapi,
        mobileapi: this.mobileapi,
        airtime: this.airtime,
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
    onSelectedFile1(event) {
      const files = event.target.files;
      let filename = files[0].name;

      if (filename.lastIndexOf(".") <= 0) {
        alert("no");
      }
      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        this.imageUrl1 = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image1 = files[0];
    },
    onSelectedFile2(event) {
      const files = event.target.files;
      let filename = files[0].name;

      if (filename.lastIndexOf(".") <= 0) {
        alert("no");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl2 = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image2 = files[0];
    },
    onSelectedFile3(event) {
      const files = event.target.files;
      let filename = files[0].name;

      if (filename.lastIndexOf(".") <= 0) {
        alert("no");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl3 = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image3 = files[0];
    },

    async handlePassword() {
      this.btnPass = "Loading";
      this.isDisabled = true;
      const data = {
        id: this.plan,
        price: this.price,
      };
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BASE_URL}api/setmtnprice`,
          data
        );
        if (response.data.status === "success") {
          this.status = true;
          this.message = "Successful";
          this.isDisabled = false;

          this.interval = setTimeout(() => {
            this.status = null;
            this.$router.go();
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
        <TabNav
          :tabs="['Upload', 'Data-Management', 'Manage']"
          :selected="selected"
          @selected="setSelected"
        >
          <Tab :isselected="selected === 'Upload'">
            <b-card style="margin-top: 30px">
              <form @submit.prevent="handleImage">
                <label for="image">Image 1 <small>(svg only)</small></label>

                <Message :status="status" :message="message" />
                <div
                  class="w-100 border-1 border position-relative"
                  style="height: 150px !important"
                >
                  <img
                    v-if="imageUrl1 !== ''"
                    :src="imageUrl1"
                    alt=""
                    style=""
                    width="100%"
                    height="100%"
                  />
                  <div class="container-fluid w-100 h-100 p-0">
                    <div
                      v-if="imageUrl1 === ''"
                      class="bg-gray w-100 h-100"
                      style="
                      background: lightgray
                      align-items: center;
                      display: flex;
                    "
                    >
                      <input
                        ref="fileInput1"
                        accept="image/svg+xml"
                        type="file"
                        style="display: none; width: 315px; height: 103px"
                        @change="onSelectedFile1"
                      />

                      <span
                        class="mdi mdi-plus"
                        style="font-size: 4rem; color: #000; margin: 0px auto"
                        @click="$refs.fileInput1.click(e)"
                      ></span>
                    </div>
                  </div>
                </div>
                <label for="image">Image 2 <small>(svg only)</small></label>

                <div
                  class="w-100 border-1 border position-relative"
                  style="height: 150px !important"
                >
                  <img
                    v-if="imageUrl2 !== ''"
                    :src="imageUrl2"
                    alt=""
                    style=""
                    width="100%"
                    height="100%"
                  />
                  <div class="container-fluid w-100 h-100 p-0">
                    <div
                      v-if="imageUrl2 === ''"
                      class="bg-gray w-100 h-100"
                      style="
                      background: lightgray
                      align-items: center;
                      display: flex;
                    "
                    >
                      <input
                        ref="fileInput2"
                        accept="image/svg+xml"
                        type="file"
                        style="display: none; width: 315px; height: 103px"
                        @change="onSelectedFile2"
                      />

                      <span
                        class="mdi mdi-plus"
                        style="font-size: 4rem; color: #000; margin: 0px auto"
                        @click="$refs.fileInput2.click(e)"
                      ></span>
                    </div>
                  </div>
                </div>
                <label for="image">Image 3 <small>(svg only)</small></label>
                <div
                  class="w-100 border-1 border position-relative"
                  style="height: 150px !important"
                >
                  <img
                    v-if="imageUrl3 !== ''"
                    :src="imageUrl3"
                    alt=""
                    style=""
                    width="100%"
                    height="100%"
                  />

                  <div
                    v-if="imageUrl3 === ''"
                    class="bg-gray w-100 h-100"
                    style="
                      background: lightgray
                      align-items: center;
                      display: flex;
                    "
                  >
                    <input
                      ref="fileInput3"
                      accept="image/svg+xml"
                      type="file"
                      style="display: none"
                      @change="onSelectedFile3"
                    />

                    <span
                      class="mdi mdi-plus"
                      style="font-size: 4rem; color: #000; margin: 0px auto"
                      @click="$refs.fileInput3.click(e)"
                    ></span>
                  </div>
                </div>
                <button class="btn btn-info w-100 mt-4">{{ btnUpload }}</button>
              </form>
            </b-card>
          </Tab>
          <Tab :isselected="selected === 'Data-Management'">
            <b-card style="margin-top: 30px">
              <Message :status="status" :message="message" />

              <form @submit.prevent="handleSubmit">
                <div class="form-group">
                  <label for="exampleInputEmail1">Merchant cable User</label>
                  <input
                    v-model="mcable"
                    type="text"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Merchant cable User"
                  />
                </div>

                <div class="form-group">
                  <label for="exampleInputPassword1">Normal Cable User</label>
                  <input
                    v-model="ncable"
                    type="text"
                    class="form-control"
                    placeholder="Normal Cable user"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">KUDA TRANSFER FEES</label>
                  <input
                    v-model="ktfee"
                    type="text"
                    class="form-control"
                    placeholder="Normal Cable user"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"> TRANSFER FEES</label>
                  <input
                    v-model="tfee"
                    type="text"
                    class="form-control"
                    placeholder="Normal Cable user"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"> CARD FUNDING FEE</label>
                  <input
                    v-model="bridgecardcfee"
                    type="text"
                    class="form-control"
                    placeholder="Normal Cable user"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"> DOLLAR CARD RATE</label>
                  <input
                    v-model="bridgerate"
                    type="text"
                    class="form-control"
                    placeholder="Normal Cable user"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"> CARD FEES</label>
                  <input
                    v-model="bridgecardcfee"
                    type="text"
                    class="form-control"
                    placeholder="Normal Cable user"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"> CARD CREATION FEES</label>
                  <input
                    v-model="cardcreatebridgecardcfee"
                    type="text"
                    class="form-control"
                    placeholder="Normal Cable user"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">FIRST MONTH FUNDING FEE</label>
                  <input
                    v-model="cardmbridgecardcfee"
                    type="text"
                    class="form-control"
                    placeholder="Normal Cable user"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Chinapay Fees</label>
                  <input
                    v-model="chinapafee"
                    type="text"
                    class="form-control"
                    placeholder="China Pay fee"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Chinapay rate</label>
                  <input
                    v-model="chinapayrate"
                    type="text"
                    class="form-control"
                    placeholder="Chinapay rate"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Merchant Elect User</label>
                  <input
                    v-model="melect"
                    type="text"
                    class="form-control"
                    placeholder="Merchant Bill User"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Normal Elect User</label>
                  <input
                    v-model="nelect"
                    type="text"
                    class="form-control"
                    placeholder="Normal Bill User"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Normal Bill commission</label>
                  <input
                    v-model="ncbill"
                    type="text"
                    class="form-control"
                    placeholder="Merchant Bill commission"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Merchant Bill commission</label>
                  <input
                    v-model="cbill"
                    type="text"
                    class="form-control"
                    placeholder="Merchant Bill commission"
                  />
                </div>

                <div class="form-group">
                  <label for="exampleInputPassword1">Normal Data commission</label>
                  <input
                    v-model="ncdata"
                    type="text"
                    class="form-control"
                    placeholder="Merchant Data commission"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Merchant Data commission</label>
                  <input
                    v-model="cdata"
                    type="text"
                    class="form-control"
                    placeholder="Merchant Data commission"
                  />
                </div>

                <div class="form-group">
                  <label for="exampleInputPassword1">Normal Airtime commission</label>
                  <input
                    v-model="ncaitime"
                    type="text"
                    class="form-control"
                    placeholder="Merchant Airtime commission"
                  />
                </div>

                <div class="form-group">
                  <label for="exampleInputPassword1">Merchant Airtime commission</label>
                  <input
                    v-model="caitime"
                    type="text"
                    class="form-control"
                    placeholder="Merchant Airtime commission"
                  />
                </div>
                <label for="email"> AIRTIME API</label> <br />

                <select
                  v-model="airtime"
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option :value="2">VTPASS</option>
                  <option :value="1">CLUB KONNECT</option>
                </select>
                <label for="email"> MTN Data API</label> <br />

                <select
                  v-model="mtnapi"
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option :value="2">SUPERJARA</option>
                  <option :value="1">SME VEND</option>
                  <option :value="3">CLUB KONNECT</option>
                </select>
                <label for="email"> GLO Data API</label> <br />

                <select
                  v-model="gloapi"
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option :value="2">SUPERJARA</option>
                  <option :value="3">CLUB CONNECT</option>
                </select>
                <label for="email"> AIRTEL Data API</label> <br />

                <select
                  v-model="airtelapi"
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option :value="2">SUPERJARA</option>
                  <option :value="3">CLUB CONNECT</option>
                </select>
                <label for="email"> ETISALAT Data API</label> <br />

                <select
                  v-model="mobileapi"
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option :value="1">SUPERJARA</option>
                  <option :value="3">CLUB CONNECT</option>
                </select>

                <button :disabled="isDisabled" type="submit" class="btn btn-primary mt-2">
                  {{ btnPass }}
                </button>
              </form>
            </b-card>
          </Tab>
          <Tab :isselected="selected === 'Manage'">
            <b-card style="margin-top: 30px">
              <Message :status="status" :message="message" />

              <form @submit.prevent="handlePassword">
                <div class="form-group">
                  <label for="number">Plan</label>
                  <select v-model="plan" class="form-control">
                    <option v-for="item in plans" :key="item.id" :value="item.id">
                      {{ item.name }} {{ item.plan }} {{ item.price }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Set Price</label>
                  <input
                    v-model="price"
                    type="text"
                    class="form-control"
                    placeholder="Enter plan price"
                  />
                </div>
                <button :disabled="isDisabled" type="submit" class="btn btn-primary mt-2">
                  {{ btnPass }}
                </button>
              </form>
            </b-card>
          </Tab>
        </TabNav>
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
