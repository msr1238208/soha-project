<template>
  <div>
    <component :is="activeComponent" @setPhone="setPhone" @changeComponent="changeComponent" :phone="phone"></component>
  </div>
  <router-view />
</template>

<script>
import authLogin from "../src/components/auth/authLogin.vue";
import authVerify from "../src/components/auth/authVerify.vue";
export default {
  components: {
    authLogin,
    authVerify,
  },
  data() {
    return {
      currentComponent: "authLogin",
      phone: "",
    };
  },

  methods: {
    setPhone(phone) {
      this.phone = phone;
    },
    changeComponent() {
      if (this.currentComponent == "authLogin") {
        this.currentComponent = "authVerify";
      } else {
        this.currentComponent = "authLogin";
      }
    },
  },
  computed: {
    activeComponent() {
      return this.currentComponent;
    },
  },
};


</script>
<style></style>
