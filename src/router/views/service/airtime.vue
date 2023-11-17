<script>
import appConfig from "@src/app.config";
import Layout from "@layouts/main";
import axios from "axios";
import moment from "moment";

export default {
  page: {
    title: "Airtime Transaction",
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
      search: "",

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
    const d = new Date();
    this.m = d.getMonth("MM");
    this.am = String(d.getMonth() + 1).padStart(2, 0);
    this.y = d.getFullYear("yyyy");
    this.day = String(d.getDate()).padStart(2, 0);
    this.mq = d.getMonth();
    const currentYear = new Date().getFullYear();
    const range = (start, stop, step) =>
      Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
    this.ys = range(currentYear, currentYear - 50, -1);
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
      const gettransactions = await axios.get(
        `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1&year=${
          this.y
        }&month=0${parseInt(this.am)}`
      );

      this.getTotal = gettransactions.data.data.total;
      this.totalAmount = gettransactions.data.total;
      this.transactions = gettransactions.data.data.data;
    } catch (e) {
      if (e.response.status === 401) {
        this.$router.push("/");
        localStorage.removeItem("admin");
      }
    }

    this.isLoading = false;
  },
  methods: {
    getEachUserTranscaction(userid, ref) {
      this.$router.push(`/users/userdetailtransaction/${userid}/${ref}`);
    },
    async pageNumberget(newPagenumber) {
      if (this.day) {
        this.pageNumber = newPagenumber + 1;
        this.$router.push({
          path: this.$route.path,
          query: {
            pageNumber: newPagenumber + 1,
          },
        });

        try {
          const getUsers = await axios.get(
            `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1&month=${this.am}&year=${this.y}&page=${this.pageNumber}`
          );
          this.transactions = getUsers.data.data.data;
          console.log(this.transactions);
          this.totalpage = getUsers.data.data.total;
          // this.per_page = getUsers.data.data.per_page;
          // this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
          this.totalAmount = getUsers.data.total;
        } catch (e) {
          if (e.response.status === 401) {
            this.$router.push("/");
            localStorage.removeItem("admin");
          }
        }
      } else {
        try {
          const getUsers = await axios.get(
            `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1&month=${this.am}&year=${this.y}page=${this.pageNumber}`,
            {
              headers: {
                Authorization: "Bearer " + this.token,
              },
            }
          );
          this.transactions = getUsers.data.data.data;
          this.totalpage = getUsers.data.data.total;
          // this.per_page = getUsers.data.data.per_page;
          // this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
          this.totalAmount = getUsers.data.total;
        } catch (e) {
          if (e.response.status === 401) {
            this.$router.push("/");
            localStorage.removeItem("admin");
          }
        }
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
          `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1&page=${this.pageNumber}&month=${this.am}&year=${this.y}`,
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );

        this.transactions = getUsers.data.data.data;
        this.totalAmount = getUsers.data.total;
        this.totalAmount = getUsers.data.total;
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/");
          localStorage.removeItem("admin");
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
          `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1&page=${this.pageNumber}&month=${this.am}&year=${this.y}`,
          {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          }
        );
        this.transactions = getUsers.data.data.data;
        this.totalAmount = getUsers.data.total;
        this.totalAmount = getUsers.data.total;
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/");
          localStorage.removeItem("admin");
        }
      }
    },
    getMonthNumber: async function (m) {
      this.nm = this.months[m];

      this.am = String(m + 1).padStart(2, 0);
      try {
        const getUsers = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1&month=${this.am}&year=${this.y}`
        );
        this.transactions = getUsers.data.data.data;
        this.totalpage = getUsers.data.data.total;
        this.per_page = getUsers.data.data.per_page;
        this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
        var i;
        this.totalAmount = 0;
        for (i = 0; i < this.totalpage; i++) {
          this.transStatus = this.transactions[i].status;

          if (this.transStatus === "0") {
            continue;
          }
          this.totalAmount = this.totalAmount + parseInt(this.transactions[i].amount);
        }
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/");
          localStorage.removeItem("admin");
        }
      }
    },
    async getDaysValue(day) {
      this.day = day;
      try {
        const getUsers = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1&day=${this.day}&month=${this.am}&year=${this.y}`
        );

        this.transactions = getUsers.data.data.data;

        this.totalpage = getUsers.data.data.total;
        this.per_page = getUsers.data.data.per_page;
        this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
        this.totalAmount = getUsers.data.total;
      } catch (e) {
        if (e.response.status === 401) {
          this.$router.push("/");
          localStorage.removeItem("admin");
        }
      }
    },
    async searchByCriteria() {
      try {
        const getUsers = await axios.get(
          `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1&search=${this.search}`
        );
        this.transactions = getUsers.data.data.data;
        this.totalpage = getUsers.data.data.total;
        this.per_page = getUsers.data.data.per_page;
        this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
        this.totalAmount = getUsers.data.total;
      } catch (e) {
        console.log(e);
      }
    },
    async getYearTransact(year) {
      this.y = year;
      if (this.day) {
        try {
          const getUsers = await axios.get(
            `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1&day=${this.day}&month=${this.am}&year=${this.y}`
          );
          this.transactions = getUsers.data.data.data;
          this.totalpage = getUsers.data.data.total;
          this.per_page = getUsers.data.data.per_page;
          this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
          this.totalAmount = getUsers.data.total;
        } catch (e) {
          if (e.response.status === 401) {
            this.$router.push("/");
            localStorage.removeItem("admin");
          }
        }
      } else {
        try {
          const getUsers = await axios.get(
            `${process.env.VUE_APP_BASE_URL}api/gettransactions?type=1
            &month=${this.am}&year=${this.y}`
          );
          this.transactions = getUsers.data.data.data;
          this.totalpage = getUsers.data.data.total;
          this.per_page = getUsers.data.data.per_page;
          this.page = Math.ceil(parseInt(this.totalpage / this.per_page) + 1);
          this.totalAmount = getUsers.data.total;
        } catch (e) {
          if (e.response.status === 401) {
            this.$router.push("/");
            localStorage.removeItem("admin");
          }
        }
      }
    },
  },
};
</script>

<template>
  <Layout>
    <div class="row p-1 border-1 border bg-white">
      <div class="d-flex justify-content-between w-100">
        <b-card class="border border-1 w-100">
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Days</label>
              <select v-model="day" class="form-control" @change="getDaysValue(day)">
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Months</label>
              <select v-model="m" class="form-control" @change="getMonthNumber(m)">
                <option v-for="(item, index) in months" :key="index" :value="index">
                  {{ item }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Years</label>
              <select v-model="y" class="form-control" @change="getYearTransact(y)">
                <option v-for="item in ys" :key="item.index" :value="item">
                  {{ item }}
                </option>
              </select>
            </div>
          </form>
        </b-card>
        <b-card class="border border-1 w-100">
          <div class="col w-100">
            <b-card class="bg-#4705AF p-0 m-0" style="background: #4705af; color: #fff">
              <h6 style="color: #fff">{{ nm.slice(0, 3) }} transaction</h6>
              {{ getTotal }}
            </b-card>
            <b-card class="bg-#4705AF p-0 mt-2" style="background: #4705af; color: #fff">
              <h6 style="color: #fff">{{ nm.slice(0, 3) }} Income</h6>
              &#8358;{{ totalAmount }}
            </b-card>
          </div>
        </b-card>
      </div>
      <div class="w-100 mt-2 mb-2">
        <div class="row">
          <div class="col-md-6 col-lg-6">
            <input
              type="search"
              class="w-100"
              v-model="search"
              @keyup="searchByCriteria"
              placeholder="Search by any criteria"
              style="
                padding: 16px 8px;
                font-size: 14px;
                font-weight: 500;
                letter-spacing: 2%;

                outline: none;
                border-radius: 8px;
                border: 1px solid #ccc;
              "
            />
          </div>
        </div>
      </div>
      <div class="col" style="overflow: auto">
        <table v-if="transactions.length > 0" class="table">
          <thead class="thead-light">
            <tr role="row">
              <th scope="col">Reference</th>
              <th scope="col">Receiver</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Network</th>
              <th scope="col">Bal. Before</th>
              <th scope="col">Bal. After</th>
              <th scope="col">Amount</th>
              <th scope="col">Source</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in transactions"
              :key="item.id"
              scope="row"
              @click="getEachUserTranscaction(item.user, item.ref)"
            >
              <td>{{ item.ref }}</td>
              <td>{{ item.reciever }}</td>
              <td>{{ item.fname }} {{ item.lname }}</td>
              <td>{{ item.username }}</td>

              <td v-if="item.network === '1'">MTN</td>
              <td v-else-if="item.network === '2'">AIRTEL</td>
              <td v-else-if="item.network === '3'">9mobile</td>
              <td v-else-if="item.network === '4'">GLO</td>
              <td>&#8358;{{ item.bbefore }}</td>
              <td>&#8358;{{ item.bafter }}</td>
              <td>&#8358;{{ item.amount }}</td>
              <td>{{ item.m }}</td>
              <td>
                {{ new Date(item.created_at).toDateString()
                }}{{ new Date(item.created_at).toLocaleTimeString() }}
              </td>
              <td v-if="item.status === '1'" style="color: green">Success</td>
              <td v-else style="text-alert">Failed</td>
            </tr>
          </tbody>
          <tfoot>
            <nav aria-label="Page navigation example">
              <ul class="" style="list-style: none">
                <li class="page-item" style="float: left">
                  <button
                    class="page-link"
                    href="javascript:void(0)"
                    :disabled="pageNumber <= 1"
                    @click="prev"
                  >
                    &lt;
                  </button>
                </li>
                <li
                  v-for="(item, index) in new Array(page)"
                  :key="index"
                  class="page-item"
                  style="float: left"
                >
                  <button
                    class="page-link"
                    href="javascript:void(0)"
                    :class="['page-link', pageNumber === index + 1 ? 'actives' : '']"
                    @click="pageNumberget(index)"
                  >
                    {{ index + 1 }}
                  </button>
                </li>

                <li class="page-item" style="float: left">
                  <button
                    class="page-link"
                    href="javascript:void(0)"
                    :disabled="pageNumber >= page"
                    @click="next"
                  >
                    >
                  </button>
                </li>
              </ul>
            </nav>
          </tfoot>
        </table>
        <div v-else class="text-center">No transaction yet.</div>
      </div>
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
