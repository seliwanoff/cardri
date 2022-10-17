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
      token: null,
      users: [],
      totalpage: 0,
      pageNumber: 1,
      pages: "",
      page: "",
      totalAmount: 0,
      getTotal: 0,
      nm: "",
      modalShow: false,
      deleteText: "Delete User",
      restoreTet: "Restore User",
      blockText: "Block user",
    };
  },

  async mounted() {
    try {
      const getUsers = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getusers`);
      this.users = getUsers.data.data.data;
      this.totalpage = getUsers.data.data.total;

      this.per_page = getUsers.data.data.per_page;
      this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
    } catch (e) {
      console.log(e);
    }
    const d = new Date();
    this.y = d.getFullYear("yyyy");
    this.m = String(parseInt(d.getMonth() + 1)).padStart(2, 0);
    this.day = d.getDay();
    this.mq = d.getMonth();

    const monthNames = [
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
    ];
    this.nm = monthNames[d.getMonth()];

    try {
      const getUsers = await axios.get(`${process.env.VUE_APP_BASE_URL}api/getusers`);
      this.allUsers = getUsers.data.data.data;
      this.totalpage = getUsers.data.data.total;

      this.per_page = getUsers.data.data.per_page;
      this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/");
      }
    }

    try {
      const gettransactions = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/gettransactions?year=${this.y}&month=${this.m}`
      );
      this.getTotal = gettransactions.data.data.total;
      this.totalAmount = gettransactions.data.total;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/");
      }
    }

    this.isLoading = false;
  },
  methods: {
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
        this.balance = getUsers.data.data.balance;
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
      this.$router.push({
        path: this.$route.path,
        query: {
          pageNumber: newPagenumber + 1,
        },
      });

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
      this.$router.push({
        path: this.$route.path,
        query: {
          pageNumber: this.pageNumber - 1,
        },
      });
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
      this.$router.push({
        path: this.$route.path,
        query: {
          pageNumber: this.pageNumber + 1,
        },
      });
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
              class="btn btn-primary w-100"
              style="background: #4705af"
              @click="getEachUserTransaction(id)"
            >
              Transaction
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

              <h4 class="header-title mt-0 mb-4">Total Revenue</h4>

              <div class="widget-chart-1">
                <div class="widget-chart-box-1 float-left" dir="ltr">
                  <div style="display: inline; width: 80px; height: 80px">
                    <canvas width="80" height="80"></canvas
                    ><input
                      data-plugin="knob"
                      data-width="80"
                      data-height="80"
                      data-fgcolor="#f05050 "
                      data-bgcolor="#F9B9B9"
                      :value="getTotal"
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
                        color: rgb(240, 80, 80);
                        padding: 0px;
                        appearance: none;
                      "
                    />
                  </div>
                </div>

                <div class="widget-detail-1 text-right">
                  <h2 class="font-weight-normal pt-2 mb-1">&#8358;{{ getTotal }}</h2>
                  <p class="text-muted mb-1">{{ nm.slice(0, 3) }} Revenue</p>
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
                <div class="widget-detail-2 text-right">
                  <h2 class="font-weight-normal mb-1">{{ totalpage }}</h2>
                  <p class="text-muted mb-3">Revenue today</p>
                </div>
                <div class="progress progress-bar-alt-success progress-sm">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    aria-valuenow="77"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 77%"
                  >
                    <span class="sr-only">77% Complete</span>
                  </div>
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

              <h4 class="header-title mt-0 mb-4">Statistics</h4>

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
                      value="80"
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
                  <h2 class="font-weight-normal pt-2 mb-1">4569</h2>
                  <p class="text-muted mb-1">Revenue today</p>
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

              <h4 class="header-title mt-0 mb-3">Daily Sales</h4>

              <div class="widget-box-2">
                <div class="widget-detail-2 text-right">
                  <span class="badge badge-pink badge-pill float-left mt-3"
                    >32% <i class="mdi mdi-trending-up"></i>
                  </span>
                  <h2 class="font-weight-normal mb-1">158</h2>
                  <p class="text-muted mb-3">Revenue today</p>
                </div>
                <div class="progress progress-bar-alt-pink progress-sm">
                  <div
                    class="progress-bar bg-pink"
                    role="progressbar"
                    aria-valuenow="77"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 77%"
                  >
                    <span class="sr-only">77% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end col -->
        </div>
        <b-card style="overflow: auto">
          <table v-if="users.length > 0" class="table">
            <thead style="background: black">
              <tr role="row">
                <th scope="col">Username</th>
                <th scope="col">Fullname</th>
                <th scope="col">Phone</th>
                <th scope="col">Balance</th>
                <th scope="col">Source</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in users" :key="item.id" role="row">
                <th scope="row">{{ item.username }}</th>
                <td>{{ item.fname }} {{ item.lname }}</td>
                <td>{{ item.phone }}</td>
                <td>&#8358;{{ item.balance }}</td>
                <td>{{ item.m }}</td>
                <td>
                  <button
                    class="btn"
                    style="background: #4705af"
                    @click="getUsersByUsername(item.username)"
                  >
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a
                      class="page-link"
                      href="javascript:void(0)"
                      :disabled="pageNumber <= 1"
                      @click="prev"
                      >Previous</a
                    >
                  </li>
                  <li
                    v-for="(item, index) in new Array(page)"
                    :key="index"
                    class="page-item"
                  >
                    <a
                      class="page-link"
                      href="javascript:void(0)"
                      :class="['page-link', pageNumber === index + 1 ? 'active' : '']"
                      @click="pageNumberget(index)"
                      >{{ index + 1 }}</a
                    >
                  </li>

                  <li class="page-item">
                    <a
                      class="page-link"
                      href="javascript:void(0)"
                      :disabled="pageNumber >= page"
                      @click="next"
                      >Next</a
                    >
                  </li>
                </ul>
              </nav>
            </tfoot>
          </table>
          <div v-else>No transaction found.</div>
        </b-card>
      </div>
    </div>
  </Layout>
</template>
