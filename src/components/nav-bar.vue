<script>
import { authComputed } from "@state/helpers";
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters, mapActions } from "vuex";

export default {
  // components: { VuePerfectScrollbar },

  data() {
    return {
      url: "https://Bee.onidomain.com/public/storage/images/",
      title: this.$route.name,
    };
  },
  computed: {
    ...authComputed,
    ...mapGetters(["user", "authenticated"]),
  },
  methods: {
    toggleMenu() {
      this.$parent.toggleMenu();
    },
    toggleRightSidebar() {
      this.$parent.toggleRightSidebar();
    },
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
  <!-- Topbar Start -->
  <div class="navbar-custom">
    <ul class="list-unstyled topnav-menu float-right mb-0">
      <!---
        <b-nav-item-dropdown right class="notification-list">
          <template
            slot="button-content"
            class="nav-link dropdown-toggle waves-effect waves-light"
          >
            <i class="fe-bell noti-icon"></i>
           <span class="badge badge-danger rounded-circle noti-icon-badge">9</span>
            
          </template>
       
          <b-dropdown-text href="#" class="dropdown-item noti-title">
            <h5 class="m-0">
              <span class="float-right">
                <a href="" class="text-dark">
                  <small>Clear All</small>
                </a> </span
              >Notification
            </h5>
          </b-dropdown-text>
  
          <b-dropdown-text href="#" class="p-0">
            <VuePerfectScrollbar v-once class="noti-scroll">
              <a href="javascript:void(0);" class="dropdown-item notify-item active">
                <div class="notify-icon">
                  <img
                    src="@assets/images/users/user-1.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                </div>
                <p class="notify-details">Cristina Pride</p>
                <p class="text-muted mb-0 user-msg">
                  <small>Hi, How are you? What about our next meeting</small>
                </p>
              </a>
  
            
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <div class="notify-icon bg-primary">
                  <i class="mdi mdi-comment-account-outline"></i>
                </div>
                <p class="notify-details">
                  Caleb Flakelar commented on Admin
                  <small class="text-muted">1 min ago</small>
                </p>
              </a>
  
             
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <div class="notify-icon">
                  <img
                    src="@assets/images/users/user-4.jpg"
                    class="img-fluid rounded-circle"
                    alt=""
                  />
                </div>
                <p class="notify-details">Karen Robinson</p>
                <p class="text-muted mb-0 user-msg">
                  <small>Wow ! this admin looks good and awesome design</small>
                </p>
              </a>
  
          
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <div class="notify-icon bg-warning">
                  <i class="mdi mdi-account-plus"></i>
                </div>
                <p class="notify-details">
                  New user registered.
                  <small class="text-muted">5 hours ago</small>
                </p>
              </a>
  
            
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <div class="notify-icon bg-info">
                  <i class="mdi mdi-comment-account-outline"></i>
                </div>
                <p class="notify-details">
                  Caleb Flakelar commented on Admin
                  <small class="text-muted">4 days ago</small>
                </p>
              </a>
  
           
              <a href="javascript:void(0);" class="dropdown-item notify-item">
                <div class="notify-icon bg-secondary">
                  <i class="mdi mdi-heart"></i>
                </div>
                <p class="notify-details">
                  Carlos Crouch liked
                  <b>Admin</b>
                  <small class="text-muted">13 days ago</small>
                </p>
              </a>
            </VuePerfectScrollbar>
  
            <a
              href="javascript:void(0);"
              class="dropdown-item text-center text-primary notify-item notify-all"
            >
              View all
              <i class="fi-arrow-right"></i>
            </a>
          </b-dropdown-text>
        </b-nav-item-dropdown>
        -->
      <b-nav-item-dropdown right class="notification-list" menu-class="profile-dropdown">
        <template slot="button-content">
          <div class="nav-user mr-0 waves-effect waves-light">
            <img
              src="@assets/images/users/user-1.jpg"
              alt="user-image"
              class="rounded-circle"
            />

            <span class="pro-user-name ml-1">
              {{ user.data.username }}<i class="mdi mdi-chevron-down"></i>
            </span>
          </div>
        </template>

        <b-dropdown-item href="../account/account">
          <i class="fe-user mr-1"></i>
          <span>My Account</span>
        </b-dropdown-item>

        <b-dropdown-item href="../account/password">
          <i class="fe-settings mr-1"></i>
          <span>Password</span>
        </b-dropdown-item>

        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item href="javascript:void(0)" @click="signOut">
          <i class="fe-log-out mr-1"></i>
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </ul>

    <!-- LOGO -->
    <div class="logo-box">
      <a href="/" class="logo text-center">
        <span class="logo-lg">
          <img src="@assets/images/logo.png" alt="" height="33" />
          <!--
            <h3
              class="m-10"
              style="
                margin-top: 20px;
                color: #4705af;
                font-family: 'Sora';
                font-style: normal;
                font-weight: 800;
                font-size: 2rem;
                line-height: 50px;
              "
            >
              CARDRI
            </h3> -->
        </span>
        <!--
          <span class="logo-sm">
            <img src="@assets/images/logo-sm.png" alt="" height="24" />
          </span>
          -->
      </a>
    </div>

    <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
      <li>
        <button class="button-menu-mobile disable-btn waves-effect" @click="toggleMenu">
          <i class="fe-menu"></i>
        </button>
      </li>

      <li>
        <h4 class="page-title-main">{{ title || "" }}</h4>
      </li>
    </ul>
  </div>
  <!-- end Topbar -->
</template>

<style lang="scss">
.noti-scroll {
  height: 220px;
}
.ps > .ps__scrollbar-y-rail {
  width: 8px !important;
  background-color: transparent !important;
}
.ps > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps.ps--in-scrolling.ps--y > .ps__scrollbar-y-rail > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:active > .ps__scrollbar-y,
.ps > .ps__scrollbar-y-rail:hover > .ps__scrollbar-y {
  width: 6px !important;
}
.button-menu-mobile {
  outline: none !important;
}
</style>
