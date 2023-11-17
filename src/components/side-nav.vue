<script>
import { authComputed } from "@state/helpers";
import { mapGetters, mapActions } from "vuex";
import MetisMenu from "metismenujs/dist/metismenujs";

export default {
  components: {},
  props: {},
  computed: {
    ...authComputed,
    ...mapGetters(["user", "authenticated"]),
  },
  mounted: function () {
    // eslint-disable-next-line no-unused-vars
    var menuRef = new MetisMenu("#side-menu");
  },
  methods: {
    ...mapActions({
      signOutAction: "signOut",
    }),
    signOut() {
      this.signOutAction();
      this.$router.push("/");
    },
  },
};
</script>

<template>
  <div>
    <div class="user-box text-center">
      <img
        src="@assets/images/users/user-1.jpg"
        alt="user-img"
        class="rounded-circle img-thumbnail avatar-lg"
      />
      <div class="">
        <a href="#" class="text-dark dropdown-toggle h5 mt-2 mb-1 d-block">{{
          user ? user.data.username : ""
        }}</a>
      </div>
      <p class="text-muted">Admin Head</p>
    </div>

    <!--- Sidemenu -->
    <div id="sidebar-menu">
      <ul id="side-menu" class="metismenu">
        <li class="menu-title">Menu</li>

        <li>
          <router-link to="/">
            <i class="mdi mdi-view-dashboard"></i>
            <span> Dashboard </span>
          </router-link>
        </li>
        <li>
          <router-link to="/card_request/card">
            <i class="mdi mdi-credit-card"></i>
            <span> Cards </span>
          </router-link>
        </li>
        <li>
          <router-link to="/notification/home">
            <i class="mdi mdi-alarm-light"></i>
            <span> Notification </span>
          </router-link>
        </li>

        <li>
          <a href="javascript: void(0);" class="waves-effect">
            <i class="mdi mdi-share-variant"></i>
            <span> Services </span>
            <span class="menu-arrow"></span>
          </a>
          <ul class="nav-second-level nav" aria-expanded="false">
            <li>
              <router-link
                to="/service/airtime"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-cellphone-android"></i>
                </span>
                Airtime
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/data"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-wifi"></i>
                </span>
                Data
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/tv"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-television"></i>
                </span>
                Tv
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/china"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-television"></i>
                </span>
                Alipay
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/webpay"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-television"></i>
                </span>
                Web Pay
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/bill"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-lightbulb"></i>
                </span>
                Bill
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/transfer"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-sync"></i>
                </span>
                Transfer
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/upgrade"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-sync"></i>
                </span>
                Merchant Upgrade
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript: void(0);" class="waves-effect">
            <i class="mdi mdi-trending-up"></i>
            <span> Investment </span>
            <span class="menu-arrow"></span>
          </a>
          <ul class="nav-second-level nav" aria-expanded="false">
            <li>
              <router-link
                to="/service/airtime"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-cellphone-android"></i>
                </span>
                Dummy 1
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/data"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-wifi"></i>
                </span>
                Dummy 2
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/tv"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-television"></i>
                </span>
                Dummy 3
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <a href="javascript: void(0);" class="waves-effect">
            <i class="mdi mdi-settings"></i>
            <span> Account </span>
            <span class="menu-arrow"></span>
          </a>
          <ul class="nav-second-level nav" aria-expanded="false">
            <li>
              <router-link
                to="/settings/admin-settings"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-settings"></i>
                </span>
                Admin Settings
              </router-link>
            </li>
            <li>
              <router-link
                to="/settings/network"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-settings"></i>
                </span>
                Network Settings
              </router-link>
            </li>
            <li>
              <router-link
                to="/settings/clubkonnect"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-settings"></i>
                </span>
                ClubKonnect
              </router-link>
            </li>
            <li>
              <router-link
                to="/settings/password"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-settings"></i>
                </span>
                Update Password
              </router-link>
            </li>
            <li>
              <router-link
                to="/settings/broadcast"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-bell"></i>
                </span>
                Broadcast
              </router-link>
            </li>
            <li>
              <router-link
                to="/service/referral"
                style="justify-content: flex-start; display: flex"
                ><span
                  style="
                    padding: 4px;
                    width: 20px;
                    height: 20px;
                    border-radius: 100%;
                    background: #4705af;
                    display: flex;
                    align-items: center;
                    place-items: center;
                    margin-right: 10px;
                    color: #fff;
                    justify-content: center;
                  "
                >
                  <i class="mdi mdi-user"></i>
                </span>
                Referral
              </router-link>
            </li>
          </ul>
        </li>
        <li class="active" @click="signOut">
          <router-link to="/">
            <i class="mdi mdi-logout"></i>
            <span> Logout </span>
          </router-link>
        </li>
      </ul>
      <div class="clearfix"></div>
    </div>
    <!-- End Sidebar -->
  </div>
</template>

<style lang="scss">
@import "~metismenujs/scss/metismenujs";
</style>
