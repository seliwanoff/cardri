<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import axios from "axios";
export default {
  page: {
    title: "Dashboard",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout },
  data() {
    return {
      user: "[]",
      id: this.$route.params.id,
      isStrue: false,
      message: "",
      isError: false,
      isLoading: false,
      tab: "bvn",
      document: [],
    };
  },
  methods: {
    changeTab(tab) {
      this.tab = tab;
    },
    async verifyManualBVN(state) {
      this.isLoading = true;
      await axios
        .post(`${process.env.VUE_APP_BASE_URL}api/manualverifybvn`, {
          id: this.id,
          accept: state,
        })
        .then(() => {
          this.isStrue = true;
          this.message =
            state === 1 ? "BVN Verified successfully" : "BVN rejected succesfully";
          this.isLoading = false;
          this.isError = false;
          axios
            .get(
              `${process.env.VUE_APP_BASE_URL}api/getuserbyid?id=${this.$route.params.id}`
            )
            .then((res) => {
              //  console.log(res);
              this.user = res.data.data;
            })
            .catch((e) => {
              console.log(e);
            });
          setTimeout(() => {
            this.isStrue = false;
          }, 3000);
        })
        .catch(() => {
          this.isLoading = false;

          this.isError = true;
          this.message = "An error occur";
          this.isStrue = false;
          setTimeout(() => {
            this.isError = false;
          }, 3000);
        });
    },
    async UpgradeUser() {
      this.isLoading = true;
      await axios
        .post(`${process.env.VUE_APP_BASE_URL}api/upgradeuser`, { id: this.id })
        .then(() => {
          this.isStrue = true;
          this.message = "User Upgraded successfully";
          this.isLoading = false;
          this.isError = false;

          setTimeout(() => {
            this.isStrue = false;
          }, 3000);
        })
        .catch(() => {
          this.isLoading = false;

          this.isError = true;
          this.message = "An error occur";
          this.isStrue = false;
          setTimeout(() => {
            this.isError = false;
          }, 3000);
        });
    },
  },

  async mounted() {
    await axios
      .get(`${process.env.VUE_APP_BASE_URL}api/getuserbyid?id=${this.$route.params.id}`)
      .then((res) => {
        //  console.log(res);
        this.user = res.data.data;
      })
      .catch((e) => {
        console.log(e);
      });
    await axios
      .get(
        `${process.env.VUE_APP_BASE_URL}api/getverificationdetails?id=${this.$route.params.id}`
      )
      .then((res) => {
        console.log(res);
        this.document = res.data.data[0];
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
<template>
  <Layout>
    <div>
      <h3>Account Details</h3>
    </div>
    <div class="row">
      <div class="col-md-5 col-lg-5">
        <div class="card">
          <div class="card-body" style="display: flex; flex-direction: column; gap: 32px">
            <div class="d-flex align-center" style="gap: 16px">
              <div
                class="bg-light"
                style="
                  text-align: center;
                  justify-content: center;
                  font-size: 1rem;
                  border-radius: 50%;
                  align-items: center;
                  padding: 10px;
                  display: flex;
                  height: 50px;
                  width: 50px;
                "
              >
                {{ user.fname.slice(0, 1) }}{{ user.lname.slice(0, 1) }}
              </div>
              <div class="w-100">
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div
                    style="padding: 0px; margin: 0px; font-size: 0.9rem; font-weight: 600"
                  >
                    {{ user.fname }} {{ user.lname }}
                  </div>
                  <span>{{ user.email }}</span>
                </div>
              </div>
            </div>
            <div
              style="
                border-top: 1px solid #cccc;
                border-bottom: 1px solid #ccc;
                padding-top: 10px;
                padding-bottom: 10px;
              "
            >
              <span
                style="
                  color: crimson;
                  font-weight: 600;
                  font-size: 14px;
                  cursor: pointer;
                  display: flex;
                  gap: 8px;
                  align-items: center;
                "
              >
                <span class="mdi mdi-account" style="font-size: 20px"></span>Deactivate
                Account</span
              >
            </div>
            <div
              class="d-flex"
              style="justify-content: space-between; align-items: center"
            >
              <div style="font-size: 16px; font-weight: 500">Wallet Balance</div>
              <span>Naira Banalce</span>
            </div>
            <div style="font-weight: 600; font-size: 2rem; margin-top: -10px">
              ₦{{ user.ngn_ld }}
            </div>
            <div
              class="d-flex"
              style="justify-content: space-between; align-items: center"
            >
              <span>Details</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 16px">
              <div
                class="d-flex"
                style="justify-content: space-between; align-items: center"
              >
                <div style="font-size: 14px; font-weight: 400">Account Name</div>
                <span>{{ user.accountName ? user.accountName : "null" }}</span>
              </div>
              <div
                class="d-flex"
                style="justify-content: space-between; align-items: center"
              >
                <div style="font-size: 14px; font-weight: 400">Account Number</div>
                <span>{{ user.bank ? user.bank : "null" }}</span>
              </div>
              <div
                class="d-flex"
                style="justify-content: space-between; align-items: center"
              >
                <div style="font-size: 14px; font-weight: 400">Bank</div>
                <span>{{ user.bankname ? user.bankname : "null" }}</span>
              </div>
              <div
                class="d-flex"
                style="justify-content: space-between; align-items: center"
              >
                <div style="font-size: 14px; font-weight: 400">Phone Number</div>
                <span>{{ user.phone }}</span>
              </div>
              <div
                class="d-flex"
                style="justify-content: space-between; align-items: center"
              >
                <div style="font-size: 14px; font-weight: 400">Username</div>
                <span>{{ user.username }}</span>
              </div>
              <div
                class="d-flex"
                style="justify-content: space-between; align-items: center"
              >
                <div style="font-size: 14px; font-weight: 400">Date</div>
                <span
                  >{{ new Date(user.created_at).toDateString() }}
                  {{ new Date(user.created_at).toLocaleTimeString() }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7 col-lg-7">
        <ul
          style="
            display: flex;
            gap: 16px;
            list-style: none;
            margin-left: 0px;
            padding-left: 15px;
            margin-bottom: 0px;
          "
        >
          <li
            @click="changeTab('bvn')"
            :style="tab === 'bvn' ? 'border-bottom:2px solid rgb(71, 5, 175)' : ''"
          >
            BVN
          </li>
          <li
            @click="changeTab('Document')"
            :style="tab === 'Document' ? 'border-bottom:2px solid rgb(71, 5, 175)' : ''"
          >
            Document
          </li>
        </ul>
        <div class="card">
          <div class="card-body" style="position: relative">
            <div
              style="
                background: lightblue;
                color: green;
                padding: 10px;
                border-radius: 8px;
                position: absolute;
                font-size: 0.8rem;
                font-weight: 500;
                box-sizing: border-box;
              "
              v-show="isStrue"
            >
              {{ message }}
            </div>
            <div
              style="
                background: #ffcccb;
                color: crimson;
                padding: 10px;
                border-radius: 8px;
                position: absolute;
                font-size: 0.8rem;
                font-weight: 500;
                box-sizing: border-box;
                display: flex;
              "
              v-show="isError"
            >
              {{ message }}
            </div>
            <div
              style="
                background: #cccc;
                color: black;
                padding: 10px;
                border-radius: 8px;
                position: absolute;
                font-size: 0.8rem;
                font-weight: 500;
                box-sizing: border-box;
                display: flex;
              "
              v-show="isLoading"
            >
              Loading
            </div>

            <div
              style="display: flex; flex-direction: column; gap: 16px"
              v-if="tab === 'bvn'"
            >
              <div style="display: flex; flex-direction: column; gap: 4px">
                <div style="font-weight: 500; letter-spacing: 2%">BVN Number</div>
                <span>{{ user.bvn }}</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px">
                <div style="font-weight: 500; letter-spacing: 2%">
                  Means of BVN Verification
                </div>
                <span>{{ user.mbvn === null ? "Automatic" : "Manual" }}</span>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  width: 100%;
                  justify-content: space-between;
                "
              >
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">ID Type</div>
                  <span>{{ user.mbvn !== null ? user.idtype : "null" }}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">BVN Status</div>
                  <span>{{ user.bvnstatus ? "Verified" : "Not verified" }}</span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 16px">
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-top: 30px;
                  "
                >
                  <div style="font-weight: 500; font-size: 16px">ID Type Image</div>
                  <div
                    style="
                      display: flex;
                      align-item: center;
                      height: 300px;
                      width: 100%;
                      max-width: 500px;
                    "
                    v-if="user.idtype !== null"
                  >
                    <img
                      :src="`https://api.cardri.ng/public/storage/images/idimage/${id}.jpg`"
                      alt=""
                      style="height: 100%; width: 100%"
                    />
                  </div>
                  <span v-else> Not uploaded yet </span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px">
                  <div style="font-weight: 500; font-size: 16px">Personal Selfie</div>
                  <div
                    style="
                      display: flex;
                      align-item: center;
                      height: 300px;
                      width: 100%;
                      max-width: 500px;
                    "
                    v-if="user.idtype !== null"
                  >
                    <img
                      :src="`https://api.cardri.ng/public/storage/images/selfie/${id}.jpg`"
                      alt=""
                      style="height: 100%; width: 100%"
                    />
                  </div>
                  <span v-else> Not uploaded yet </span>
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 8px;
                  "
                >
                  <button
                    type="submit"
                    class="btn btn-primary mt-3 border-0 outline-0"
                    style="border-radius: 8px; outline: none; width: 100%"
                    v-show="user.mbvn !== null"
                    @click="verifyManualBVN(1)"
                  >
                    Verify
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary mt-3 border-0 outline-0"
                    style="
                      border-radius: 8px;
                      outline: none;
                      background: crimson;
                      width: 100%;
                    "
                    v-show="user.mbvn !== null"
                    @click="verifyManualBVN(2)"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
            <div
              style="display: flex; flex-direction: column; gap: 16px"
              v-if="tab === 'Document'"
            >
              <div style="display: flex; flex-direction: column; gap: 4px">
                <div style="font-weight: 500; letter-spacing: 2%">ID Number</div>
                <span>{{ document.id_no }}</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px">
                <div style="font-weight: 500; letter-spacing: 2%">Postal Code</div>
                <span>{{ document.postal_code }}</span>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  width: 100%;
                  justify-content: space-between;
                "
              >
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">Country</div>
                  <span>{{ document.country }}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">City</div>
                  <span>{{ document.city }}</span>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  width: 100%;
                  justify-content: space-between;
                "
              >
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">Address</div>
                  <span>{{ document.address }}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">City</div>
                  <span>{{ document.city }}</span>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  width: 100%;
                  justify-content: space-between;
                "
              >
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">State</div>
                  <span>{{ document.state }}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">House No.</div>
                  <span>{{ document.house_no }}</span>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  width: 100%;
                  justify-content: space-between;
                "
              >
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">ID Type</div>
                  <span>{{ document.id_type !== null ? document.id_type : "null" }}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px">
                  <div style="font-weight: 500; letter-spacing: 2%">Date Submitted</div>
                  <span>{{ new Date(document.created_at).toDateString() }}</span>
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 16px">
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-top: 30px;
                  "
                >
                  <div style="font-weight: 500; font-size: 16px">ID Image</div>
                  <div
                    style="
                      display: flex;
                      align-item: center;
                      height: 300px;
                      width: 100%;
                      max-width: 500px;
                    "
                    v-if="document.id_type !== null"
                  >
                    <img
                      :src="`https://api.cardri.ng/public/storage/images/ids/${document.id_image}`"
                      alt=""
                      style="height: 100%; width: 100%"
                    />
                  </div>
                  <span v-else> Not uploaded yet </span>
                </div>
                {{ message }}

                <button
                  type="submit"
                  class="btn btn-primary mt-3 border-0 outline-0"
                  style="border-radius: 8px; outline: none"
                  @click="UpgradeUser"
                >
                  Upgrade User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
