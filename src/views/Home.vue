<template>
  <div class="top-0 h-screen w-full flex flex-col justify-center items-center">
    <div class="w-1/2 bg-white rounded-2xl shadow-md text-center py-8">
      <component :is="currentComponent" @setPhone="setPhone" @changeComponent="changeComponent" :phone="phone">
      </component>

      <button class="bg-slate-400 text-white rounded-lg py-3 w-2/3" @click="onsubmit">{{ title
      }}</button>
    </div>

  </div>
</template>

<script>
import AuthLogin from "../components/auth/AuthLogin"
import AuthVerify from "../components/auth/AuthVerify.vue"

export default {
  name: "Home",
  components: { AuthLogin, AuthVerify },
  data() {
    return {
      currentComponent: "AuthLogin",
      phone: "",
      title: 'ورود'
    };
  },
  methods: {
    setPhone(phone) {
      this.phone = phone;
    },
    changeComponent() {
      console.log("gereftam");
    },

    onsubmit() {
      switch (this.currentComponent) {
        case 'AuthLogin':
          this.currentComponent = 'AuthVerify'
          this.title = 'تایید'
          break
        case 'AuthVerify':
          this.$router.push('/dong')
          break
      }
    }
  },
};
</script>
