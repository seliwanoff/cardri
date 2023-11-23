<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import axios from "axios";
import TabNav from "@/src/components/tabnav.vue";
import Tab from "@/src/components/tab.vue";

export default {
  page: {
    title: "Dashboard",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, TabNav, Tab },
  data() {
    return {
      token: null,
      selected: "Active",
      users: [],
      totalpage: 0,
      pageNumber: 1,
      me: "00",
      pages: "",
      page: "",
      totalAmount: 0,
      getTotal: 0,
      nm: "",
      modalShow: false,
      deleteText: "Delete User",
      restoreTet: "Restore User",
      blockText: "Block user",
      fname: "",

      lname: "",
      email: "",
      phone: "",
      totalusercount: 0,
      bank: "",
      bankname: "",
      type: "",
      balance: "",
      username: "",
      status: "",
      id: "",
      pstatus: "",
      allUsers: [],
      search: "",
      totalwalletbalance: 0,
      totalamounttoday: 0,
      totalcounttoday: 0,
      totalweekamount: 0,
      totalweekcount: 0,
      review: "Weekly",
    };
  },
  /*
  computed: {
    allUser: function () {
      return this.allUsers.filter((item) => {
        if (item.fname.match(this.search) !== undefined) {
          return item.fname.match(this.search);
        } else if (item.lname.match(this.search) !== undefined) {
          return item.fname.match(this.search);
        } else {
          return item.username.match(this.search);
        }
      });
    },
  },

  */
  async mounted() {
    try {
      const getUsers = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getusers`);
      console.log(getUsers);
      this.allUsers = getUsers.data.data.data;
      this.totalpage = getUsers.data.data.total;

      this.per_page = getUsers.data.data.per_page;
      this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/");
      }
    }
    await axios
      .get(`${process.env.VUE_APP_BASE_URL}api/homestatics`)
      .then((res) => {
        //  console.log(res);
        this.totalusercount = res.data.numberOfUser;
      })
      .catch((e) => {
        console.log(e);
      });
    await axios
      .get(`${process.env.VUE_APP_BASE_URL}api/getallwallet`)
      .then((res) => {
        //  console.log(res);
        this.totalwalletbalance = res.data.totalWalletBalance;
      })
      .catch((e) => {
        console.log(e);
      });
    await axios
      .get(
        `${
          process.env.VUE_APP_BASE_URL
        }api/gettransactions?day=${new Date().getDate()}&month=${
          new Date().getMonth() + 1
        }&year=${new Date().getFullYear()}`
      )
      .then((res) => {
        //console.log(res);
        (this.totalamounttoday = res.data.total), (this.totalcounttoday = res.data.count);
        // this.totalwalletbalance = res.data.totalWalletBalance;
      })
      .catch((e) => {
        console.log(e);
      });
    var currentDate = new Date();

    // Calculate the first day of the current week (Sunday)
    var firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    // Calculate the last day of the last week
    var lastWeekStartDate = new Date(firstDayOfWeek);
    lastWeekStartDate.setDate(firstDayOfWeek.getDate() - 7);
    var lastWeekEndDate = new Date(firstDayOfWeek);
    lastWeekEndDate.setDate(firstDayOfWeek.getDate() - 1);
    await axios
      .get(
        `${process.env.VUE_APP_BASE_URL}api/gettransactions?dayfrom=${new Date(
          lastWeekStartDate
        ).getDate()}&monthfrom=${
          new Date(lastWeekStartDate).getMonth() + 1
        }&yearfrom=${new Date(lastWeekStartDate).getFullYear()}&dayto=${new Date(
          lastWeekEndDate
        ).getDate()}&monthto=${
          new Date(lastWeekEndDate).getMonth() + 1
        }&yearto=${new Date(lastWeekEndDate).getFullYear()}`
      )
      .then((res) => {
        console.log(res);
        this.totalweekamount = res.data.total;
        this.totalweekcount = res.data.count;
      })
      .catch((e) => {
        console.log(e);
      });

    this.isLoading = false;
  },

  methods: {
    async getWeekly(value) {
      this.review = value;
      var currentDate = new Date();

      // Calculate the first day of the current week (Sunday)
      var firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

      // Calculate the last day of the last week
      var lastWeekStartDate = new Date(firstDayOfWeek);
      lastWeekStartDate.setDate(firstDayOfWeek.getDate() - 7);
      var lastWeekEndDate = new Date(firstDayOfWeek);
      lastWeekEndDate.setDate(firstDayOfWeek.getDate() - 1);
      await axios
        .get(
          `${process.env.VUE_APP_BASE_URL}api/gettransactions?dayfrom=${new Date(
            lastWeekStartDate
          ).getDate()}&monthfrom=${
            new Date(lastWeekStartDate).getMonth() + 1
          }&yearfrom=${new Date(lastWeekStartDate).getFullYear()}&dayto=${new Date(
            lastWeekEndDate
          ).getDate()}&monthto=${
            new Date(lastWeekEndDate).getMonth() + 1
          }&yearto=${new Date(lastWeekEndDate).getFullYear()}`
        )
        .then((res) => {
          console.log(res);
          this.totalweekamount = res.data.total;
          this.totalweekcount = res.data.count;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getMonthly(value) {
      var currentDate = new Date();

      // Calculate the first day of the current month
      var firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );

      // Calculate the last day of the last month
      var lastMonthStartDate = new Date(firstDayOfMonth);
      lastMonthStartDate.setMonth(firstDayOfMonth.getMonth() - 1);
      var lastMonthEndDate = new Date(firstDayOfMonth);
      lastMonthEndDate.setDate(firstDayOfMonth.getDate() - 1);
      this.review = value;
      // console.log(lastMonthStartDate);
      await axios
        .get(
          `${
            process.env.VUE_APP_BASE_URL
          }api/gettransactions?dayfrom=${new Date().getDate()}&monthfrom=${new Date().getMonth(
            lastMonthStartDate
          )}&yearfrom=${new Date(
            lastMonthStartDate
          ).getFullYear()}&dayto=${new Date().getDate()}&monthto=${
            new Date().getMonth() + 1
          }&yearto=${new Date().getFullYear()}`
        )
        .then((res) => {
          console.log(res);
          this.totalweekamount = res.data.total;
          this.totalweekcount = res.data.count;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getYearly(value) {
      this.review = value;
      var currentDate = new Date();

      var firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);

      // Calculate the last day of the last year
      var lastYearStartDate = new Date(firstDayOfYear);
      lastYearStartDate.setFullYear(firstDayOfYear.getFullYear() - 1);
      var lastYearEndDate = new Date(firstDayOfYear);
      lastYearEndDate.setDate(firstDayOfYear.getDate() - 1);

      await axios
        .get(
          `${
            process.env.VUE_APP_BASE_URL
          }api/gettransactions?dayfrom=${new Date().getDate()}&monthfrom=${
            new Date().getMonth() + 1
          }&yearfrom=${new Date(
            lastYearStartDate
          ).getFullYear()}&dayto=${new Date().getDate()}&monthto=${new Date(
            lastYearEndDate
          ).getMonth()}&yearto=${new Date().getFullYear()}`
        )
        .then((res) => {
          console.log(res);
          this.totalweekamount = res.data.total;
          this.totalweekcount = res.data.count;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    navigate(id) {
      this.$router.push(`/users/useraccount/${id}`);
    },
    setSelected(tab) {
      this.selected = tab;
    },
    async restoreUser(status, id) {
      this.restoreTet = "Loading";
      this.blockText = "Loading";
      const data = {
        status: status,
        id: id,
      };
      try {
        await axios.post(`${process.env.VUE_APP_BASE_URL}api/adminupdateuser`, data);
        this.restoreTet = "Restored";
        this.blockText = "Blocked";
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/");
        }
      }
    },
    async deleteUsers(status, id) {
      this.deleteText = "Loading";
      const data = {
        status: status,
        id: id,
      };
      try {
        await axios.post(`${process.env.VUE_APP_BASE_URL}api/adminupdateuser`, data);
        this.deleteText = "Deleted";
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/");
        }
      }
    },
    async searchUser() {
      await axios
        .get(`${process.env.VUE_APP_BASE_URL}api/searchusers?id=${this.search}`)
        .then((res) => {
          this.allUsers = res.data.data.data;
          this.totalpage = res.data.data.total;

          this.per_page = res.data.data.per_page;
          this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
        })
        .catch((e) => {
          console, log(e);
        });
    },
    getEachUserTransaction(id) {
      this.$router.push(`/service/userbyid/${id}`);
    },
    async getUsersByUsername(username) {
      this.isLoading = true;
      this.hidedetails = !this.hidedetails;

      try {
        const getUsers = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/finduserbyusername?username=${username}`
        );

        this.fname = getUsers.data.data.fname;
        this.lname = getUsers.data.data.lname;
        this.email = getUsers.data.data.email;
        this.phone = getUsers.data.data.phone;
        this.bank = getUsers.data.data.bank;
        this.bankname = getUsers.data.data.bankname;
        this.type = getUsers.data.data.type;
        this.balance = getUsers.data.data.ngn_ld;
        this.username = getUsers.data.data.username;
        this.status = getUsers.data.data.status;
        this.id = getUsers.data.data.id;
        this.pstatus = getUsers.data.data.p_status;

        this.isLoading = false;
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/");
        }
      }
      this.modalShow = !this.modalShow;
    },
    async pageNumberget(newPagenumber) {
      this.pageNumber = newPagenumber + 1;

      try {
        const getUsers = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/getusers?page=${this.pageNumber}`
        );

        this.allUsers = getUsers.data.data.data;
      } catch (e) {
        console.log(e);
      }
    },
    async prev() {
      this.pageNumber = this.pageNumber - 1;

      try {
        const getUsers = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/getusers?page=${this.pageNumber}`
        );

        this.allUsers = getUsers.data.data.data;
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/");
        }
      }
    },
    async next() {
      this.pageNumber = this.pageNumber + 1;

      try {
        const getUsers = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/getusers?page=${this.pageNumber}`
        );

        this.allUsers = getUsers.data.data.data;
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/");
          localStorage.removeItem("admin");
        }
      }
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row">
      <div>
        <b-modal v-model="modalShow">
          <div class="d-flex justify-content-between m-1 p-1">
            <span>Username</span>
            <span>{{ username }}</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <span>Full Name</span>
            <span>{{ fname + " " + lname }}</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <span>Email</span>
            <span>{{ email }}</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <span>Number</span>
            <span>{{ phone }}</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <span>Account Number</span>
            <span>{{ bank }}</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <span>Account Name</span>
            <span>{{ bankname }}</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <span>Balance</span>
            <span>&#8358;{{ balance }}</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <span>ID</span>
            <span>{{ id }}</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <span>Type</span>
            <span v-if="type === '1'">Normal User</span>
            <span v-else-if="type === '2'">Merchant</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <span class="user-title">Status</span>
            <span v-if="status === '1' && pstatus === 'true'">verified</span>
            <span v-else-if="status === '0' && pstatus === 'true'">Suspended</span>
            <span v-else>Unverified</span>
          </div>
          <div class="d-flex justify-content-between m-1 p-1">
            <button class="btn btn-danger" @click="deleteUsers(0, id)">
              {{ deleteText }}
            </button>
            <button v-if="status === '1'" class="btn bg-info" @click="restoreUser(2, id)">
              {{ blockText }}
            </button>
            <button
              v-if="status === '2'"
              class="btn btn-success"
              @click="restoreUser(1, id)"
            >
              {{ restoreTet }}
            </button>
          </div>
          <div class="m-1 p-1">
            <button
              class="btn btn-primary w-100 border-0"
              style="background: #4705af; border-radius: 8px"
              @click="getEachUserTransaction(id)"
            >
              Transaction
            </button>
          </div>

          <div class="m-1 p-1">
            <button
              class="btn btn-primary w-100 border-0"
              style="background: green; border-radius: 8px; outline: none"
              @click="navigate(id)"
            >
              View Document
            </button>
          </div>
        </b-modal>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-xl-3 col-md-6">
            <div class="card-box">
              <div class="dropdown float-right">
                <a
                  href="#"
                  class="dropdown-toggle arrow-none card-drop"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="mdi mdi-dots-vertical"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Action</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Another action</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Something else</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Separated link</a>
                </div>
              </div>

              <h4 class="header-title mt-0 mb-3">Total Wallet volume</h4>

              <div class="widget-chart-1">
                <div class="widget-detail-1 text-left">
                  <h2 class="font-weight-normal mb-1" style="font-size: 20px">
                    &#8358;{{ parseFloat(totalwalletbalance).toLocaleString() }}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <!-- end col -->

          <div class="col-xl-3 col-md-6">
            <div class="card-box">
              <div class="dropdown float-right">
                <a
                  href="#"
                  class="dropdown-toggle arrow-none card-drop"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="mdi mdi-dots-vertical"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Action</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Another action</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Something else</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Separated link</a>
                </div>
              </div>

              <h4 class="header-title mt-0 mb-3">Total user</h4>

              <div class="widget-box-2">
                <div class="widget-detail-2 text-left">
                  <h2 class="font-weight-normal mb-1" style="font-size: 20px">
                    {{ totalusercount }}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <!-- end col -->

          <div class="col-xl-3 col-md-6">
            <div class="card-box">
              <div class="dropdown float-right">
                <a
                  href="#"
                  class="dropdown-toggle"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="mdi mdi-dots-vertical"></i>
                </a>
                <div
                  class="dropdown-menu dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a
                    href="javascript:void(0);"
                    class="dropdown-item"
                    @click="getWeekly('Weekly')"
                    >Weekly</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="dropdown-item"
                    @click="getMonthly('Monthly')"
                    >Monthly</a
                  >
                  <a
                    href="javascript:void(0);"
                    class="dropdown-item"
                    @click="getYearly('Yearly')"
                    >Yearly</a
                  >
                </div>
              </div>

              <h4 class="header-title mt-0">Statistics</h4>

              <div class="widget-chart-1">
                <div class="widget-chart-box-1 float-left" dir="ltr">
                  <div style="display: inline; width: 80px; height: 80px">
                    <canvas width="80" height="80"></canvas
                    ><input
                      data-plugin="knob"
                      data-width="80"
                      data-height="80"
                      data-fgcolor="#ffbd4a"
                      data-bgcolor="#FFE6BA"
                      :value="totalweekcount"
                      data-skin="tron"
                      data-angleoffset="180"
                      data-readonly="true"
                      data-thickness=".15"
                      readonly="readonly"
                      style="
                        width: 44px;
                        height: 26px;
                        position: absolute;
                        vertical-align: middle;
                        margin-top: 26px;
                        margin-left: -62px;
                        border: 0px;
                        background: none;
                        font: bold 16px Arial;
                        text-align: center;
                        color: rgb(255, 189, 74);
                        padding: 0px;
                        appearance: none;
                      "
                    />
                  </div>
                </div>
                <div class="widget-detail-1 text-right">
                  <h2 class="font-weight-normal" style="font-size: 15px">
                    &#8358;{{ parseFloat(totalweekamount).toLocaleString() }}
                  </h2>
                  <p class="text-muted mb-1">Revenue {{ review }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- end col -->

          <div class="col-xl-3 col-md-6">
            <div class="card-box">
              <div class="dropdown float-right">
                <a
                  href="#"
                  class="dropdown-toggle arrow-none card-drop"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="mdi mdi-dots-vertical"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Action</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Another action</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Something else</a>
                  <!-- item-->
                  <a href="javascript:void(0);" class="dropdown-item">Separated link</a>
                </div>
              </div>

              <h4 class="header-title mt-0">Daily Sales</h4>
              <div class="widget-chart-1">
                <div class="widget-chart-box-1 float-left" dir="ltr">
                  <div style="display: inline; width: 50px; height: 50px">
                    <canvas width="80" height="80"></canvas
                    ><input
                      data-plugin="knob"
                      data-width="80"
                      data-height="80"
                      data-fgcolor="#ffbd4a"
                      data-bgcolor="#FFE6BA"
                      :value="totalcounttoday"
                      data-skin="tron"
                      data-angleoffset="180"
                      data-readonly="true"
                      data-thickness=".15"
                      readonly="readonly"
                      style="
                        width: 44px;
                        height: 26px;
                        position: absolute;
                        vertical-align: middle;
                        margin-top: 26px;
                        margin-left: -62px;
                        border: 0px;
                        background: none;
                        font: bold 16px Arial;
                        text-align: center;
                        color: rgb(255, 189, 74);
                        padding: 0px;
                        appearance: none;
                      "
                    />
                  </div>
                </div>
                <div class="widget-detail-1 text-right">
                  <h2 class="font-weight-normal mb-1" style="font-size: 20px">
                    &#8358;{{ parseFloat(totalamounttoday).toLocaleString() }}
                  </h2>
                  <p class="text-muted mb-1">Revenue today</p>
                </div>
              </div>
            </div>
          </div>
          <!-- end col -->
        </div>

        <b-card style="overflow: auto">
          <div style="float: left; height: 1100px">
            <TabNav :selected="selected" :tabs="['Active']" @selected="setSelected">
              <Tab :isselected="selected === 'Active'">
                <div
                  style="
                    position: absolute;
                    box-sizing: border-box;

                    overflow: auto;
                    right: 25px;
                    left: 25px;
                    padding: 10px;
                  "
                >
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" style="font-size: 12px">Fullname</th>
                        <th scope="col" style="font-size: 12px">Username</th>
                        <th scope="col" style="font-size: 12px">Phone</th>
                        <th scope="col" style="font-size: 12px">Balance</th>
                        <th scope="col" style="font-size: 12px">Ledger</th>
                        <th scope="col" style="font-size: 12px">Source</th>
                        <th scope="col" style="font-size: 12px">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="item in allUsers"
                        :key="item.id"
                        style="cursor: pointer"
                        @click="getUsersByUsername(item.username)"
                      >
                        <td class="d-flex">
                          <div
                            style="
                              width: 30px;
                              height: 30px;
                              border-radius: 100%;
                              border: 1px solid #aaa;
                              margin-right: 10px;
                              text-align: center;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              text-transform: capitalize;
                            "
                          >
                            {{ item.fname.slice(0, 1) }} {{ item.lname.slice(0, 1) }}
                          </div>
                          <div class="d-grid">
                            <div style="font-size: 11px">
                              {{ item.fname }} {{ item.lname }}
                            </div>
                            <div style="font-size: 10px">{{ item.email }}</div>
                          </div>
                        </td>
                        <td style="font-size: 11px">{{ item.username }}</td>
                        <td style="font-size: 11px">{{ item.phone }}</td>
                        <td style="font-size: 11px">&#8358;{{ item.balance }}</td>
                        <td style="font-size: 11px">&#8358;{{ item.ngn_ld }}</td>
                        <td style="font-size: 11px">{{ item.m }}</td>
                        <td class="d-flex">
                          <button
                            class="sideiconbuttob butn1"
                            @click="getUsersByUsername(item.username)"
                          >
                            <span
                              class="material-icons"
                              style="
                                display: flex;
                                align-items: center;
                                font-size: 10px;
                                margin: 0px auto;
                              "
                              >visibility</span
                            >
                          </button>
                          <button
                            style="
                              display: flex;
                              align-items: center;
                              display: flex;
                              align-items: center;
                            "
                            class="sideiconbuttob butn2"
                            @click="getUsersByUsername(item.username)"
                          >
                            <span
                              class="material-icons"
                              style="
                                display: flex;
                                align-items: center;
                                font-size: 10px;
                                margin: 0px auto;
                              "
                              >delete</span
                            >
                          </button>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <nav aria-label="Page navigation example" style="margin-top: 30px">
                        <ul class="pagination">
                          <li class="page-item">
                            <button
                              class="page-link"
                              href="javascript:void(0)"
                              :disabled="pageNumber === 1 ? true : false"
                              @click="prev"
                            >
                              Previous
                            </button>
                          </li>
                          <li
                            v-for="(item, index) in new Array(page)"
                            :key="index"
                            class="page-item"
                          >
                            <a
                              class="page-link"
                              href="javascript:void(0)"
                              :class="[
                                'page-link',
                                pageNumber === index + 1 ? 'active' : '',
                              ]"
                              @click="pageNumberget(index)"
                              >{{ index + 1 }}</a
                            >
                          </li>

                          <li class="page-item">
                            <button
                              class="page-link"
                              href="javascript:void(0)"
                              :disabled="pageNumber === page ? true : false"
                              @click="next"
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </tfoot>
                  </table>
                </div>
              </Tab>
            </TabNav>
          </div>
          <div class="float-right" style="width: 70% !important">
            <div
              class="btntab d-flex"
              style="border-bottom: 1px solid #f5f6f7; justigy-content: left; width: 100%"
            >
              <span
                class="material-icons"
                style="
                  display: flex;
                  align-self: center;
                  margin-right: 10px;
                  font-size: 12px;
                  color: #7993b1;
                "
                >search</span
              ><input
                v-model="search"
                type="text"
                style="
                  width: 100%;
                  border: none !important;
                  outline: none;
                  color: #7993b1;
                "
                @keyup="searchUser"
                placeholder="Search By  Username"
              />
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </Layout>
</template>
<style>
.sideiconbuttob {
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin: 2px;
  padding: 0px !important;
}
.butn1 {
  border: 1px solid #4cc27e !important;
  color: #4cc27e !important;
}
.butn2 {
  border: 1px solid #f5b0b0 !important;
  color: #f5b0b0 !important;
  background: #f2d5d5 !important;
}
td {
  border: none !important;
  padding-top: 0px;
  padding-bottom: 0px !important;
}
th {
  font-size: 12px !important;
  border: none !important;
  background: #f5f6f7;
  color: #090d14;
}
td {
  border: none !important;
  font-size: 12px !important;
}
tbody tr:nth-child(even) {
  background: #f5f6f7;
  border-radius: 30px !important;
}
tr {
  border-radius: 30px !important;
  color: #5c7597;
  line-height: 10x;
}
.card {
  border-radius: 10px !important;
}
</style>
