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
    title: "ClubKonnect Settings",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, TabNav, Tab, Message },
  data() {
    return {
      selected: "MTN",
      message: "",
      status: null,
      username: "",
      fname: "",
      lname: "",
      mtnprice: "",
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
      etiid: "",
      gloid: "",
      airtelid: "",
      id: "",
      cardx: 0,
      airtelapi: "",
      gloapi: "",
      mobileapi: 0,
      airtimeapi: 0,
      cardmbridgecardcfee: 0,
      airtime: 0,
      konnect: [],
      mtnid: "",
    };
  },
  async created() {
    await axios
      .get(`${process.env.VUE_APP_BASE_URL}api/getplansclubconnect`)

      .then((res) => {
        this.konnect = res.data.data;
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  computed: {
    filterMTN: function () {
      return this.konnect.filter((item) => {
        return item.network.match("01");
      });
    },
    filterETISALAT: function () {
      return this.konnect.filter((item) => {
        return item.network.match("03");
      });
    },
    filterGLO: function () {
      return this.konnect.filter((item) => {
        return item.network.match("02");
      });
    },
    filterAIRTEL: function () {
      return this.konnect.filter((item) => {
        return item.network.match("04");
      });
    },
  },

  methods: {
    setSelected(tab) {
      this.selected = tab;
    },
    async handleImage() {
      const data = {
        id: this.id,
        price: this.mtnprice,
      };
      await axios
        .post(`${process.env.VUE_APP_BASE_URL}api/setclubkonectprice`, data)
        .then((res) => {
          this.status = true;
          this.message = "Successful";
          this.$router.go();
        })
        .catch((e) => {
          this.status = true;
          this.message = "Failed to set price";
          console.log(e);
        });
    },
  },
};
</script>

<template>
  <Layout>
    <div style="max-width: 700px; width: 100%; margin: 0px auto">
      <b-card>
        <TabNav
          :tabs="['MTN', 'GLO', 'AIRTEL', '9MOBILE']"
          :selected="selected"
          @selected="setSelected"
        >
          <Tab :isselected="selected === 'MTN'">
            <b-card style="margin-top: 30px">
              <form @submit.prevent="handleImage">
                <label for="image">Plans</label>

                <Message :status="status" :message="message" />
                <div class="w-100 border-1 border position-relative">
                  <div class="form-select">
                    <select name="" id="" class="form-control" v-model="id">
                      <option
                        :value="item.id"
                        v-for="(item, index) in filterMTN"
                        :key="index"
                      >
                        {{ item.name }} {{ " " }} ₦{{ item.price }}
                      </option>
                    </select>
                  </div>
                </div>
                <label for="image">Set Price</label>

                <div class="w-100 border-1 border position-relative">
                  <input
                    type="text"
                    v-model="mtnprice"
                    class="form-control"
                    placeholder="Set price"
                  />
                </div>
                <button class="btn btn-info w-100 mt-4">{{ btnUpload }}</button>
              </form>
            </b-card>
          </Tab>
          <Tab :isselected="selected === 'GLO'">
            <b-card style="margin-top: 30px">
              <form @submit.prevent="handleImage">
                <label for="image">Plans</label>

                <Message :status="status" :message="message" />
                <div class="w-100 border-1 border position-relative">
                  <div class="form-select">
                    <select name="" id="" class="form-control" v-model="id">
                      <option
                        :value="item.id"
                        v-for="(item, index) in filterGLO"
                        :key="index"
                      >
                        {{ item.name }} {{ " " }} ₦{{ item.price }}
                      </option>
                    </select>
                  </div>
                </div>
                <label for="image">Set Price</label>

                <div class="w-100 border-1 border position-relative">
                  <input
                    type="text"
                    v-model="mtnprice"
                    class="form-control"
                    placeholder="Set price"
                  />
                </div>
                <button class="btn btn-info w-100 mt-4">{{ btnUpload }}</button>
              </form>
            </b-card>
          </Tab>
          <Tab :isselected="selected === 'AIRTEL'">
            <b-card style="margin-top: 30px">
              <form @submit.prevent="handleImage">
                <label for="image">Plans</label>

                <Message :status="status" :message="message" />
                <div class="w-100 border-1 border position-relative">
                  <div class="form-select">
                    <select name="" id="" class="form-control" v-model="id">
                      <option
                        :value="item.id"
                        v-for="(item, index) in filterAIRTEL"
                        :key="index"
                      >
                        {{ item.name }} {{ " " }} ₦{{ item.price }}
                      </option>
                    </select>
                  </div>
                </div>
                <label for="image">Set Price</label>

                <div class="w-100 border-1 border position-relative">
                  <input
                    type="text"
                    v-model="mtnprice"
                    class="form-control"
                    placeholder="Set price"
                  />
                </div>
                <button class="btn btn-info w-100 mt-4">{{ btnUpload }}</button>
              </form>
            </b-card>
          </Tab>
          <Tab :isselected="selected === '9MOBILE'">
            <b-card style="margin-top: 30px">
              <form @submit.prevent="handleImage">
                <label for="image">Plans</label>

                <Message :status="status" :message="message" />
                <div class="w-100 border-1 border position-relative">
                  <div class="form-select">
                    <select name="" id="" class="form-control" v-model="id">
                      <option
                        :value="item.id"
                        v-for="(item, index) in filterETISALAT"
                        :key="index"
                      >
                        {{ item.name }} {{ " " }} ₦{{ item.price }}
                      </option>
                    </select>
                  </div>
                </div>
                <label for="image">Set Price</label>

                <div class="w-100 border-1 border position-relative">
                  <input
                    type="text"
                    v-model="mtnprice"
                    class="form-control"
                    placeholder="Set price"
                  />
                </div>
                <button class="btn btn-info w-100 mt-4">{{ btnUpload }}</button>
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
