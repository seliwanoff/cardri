<template>
  <div class="w-100">
    <ul class="nav navtext d-flex justify-content-between mb-2">
      <div class="nav">
        <li v-for="tab in tabs" :key="tab" class="nav-item">
          <a
            class="nav-link"
            :class="{ actives: tab === selected }"
            @click="setTab(tab)"
          >
            {{ tab }}
          </a>
        </li>
      </div>
    </ul>

    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },
  methods: {
    setTab(tab) {
      this.$emit('selected', tab)
    },
  },
}
</script>
<style>
main {
  display: flex;
  justify-content: center;
}
.navtext {
  font-size: 12px;
}
.actives {
  color: #238f53;
  border-bottom: 1px solid #238f53;
  box-sizing: border-box;
  padding-left: 0px !important;
  padding-right: 0px !important ;
}
.btn1 {
  border: 2px solid #238f53;
  color: #238f53;
  padding: 4px 7px 4px 7px !important;
  font-weight: 500;
  outline: none !important;
  font-size: 12px;
  margin-right: 5px;
}
.btn2 {
  border: 2px solid #238f53;
  color: #fff;
  font-size: 12px;
  background: #238f53;
  padding: 4px 7px 4px 7px !important;
  font-weight: 500;
  outline: none !important;
  margin-left: 5px;
}
li {
  cursor: pointer;
}
a {
  color: #455c7d;
}
</style>
