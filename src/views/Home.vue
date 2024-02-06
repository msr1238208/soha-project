<template>
  <div class="top-0 h-screen w-full flex flex-col justify-center items-center">
    <div class="w-1/2 bg-white rounded-2xl shadow-md text-center py-8">
      <component :is="currentComponent" @setPhone="setPhone" :phone="phone" :showError="showError"
        @codeResive="codeResive" @validPhoneNumber="validPhoneNumber">
      </component>

      <button class="bg-slate-400 text-white rounded-lg py-3 w-2/3" @click="onsubmit">
        {{ title }}
      </button>
    </div>
  </div>
</template>

<script>
import AuthLogin from "../components/auth/authLogin";
import AuthVerify from "../components/auth/authVerify";
import axios from "axios";

export default {
  name: "Home",
  components: { AuthLogin, AuthVerify },
  data() {
    return {
      currentComponent: "AuthLogin",
      phone: "",
      code: "",
      title: "ورود",
      validPhone: false,
      showError: false,
    };
  },

  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push({ path: "/dong" });
    } else {
      this.$router.push({ path: "/" });
    }
  },

  methods: {
    setPhone(phone) {
      this.phone = phone;
    },

    codeResive(otpCode) {
      this.code = otpCode;
    },

    validPhoneNumber(phone) {
      console.log("fs");
      this.showError = false
      this.validPhone = true
      this.phone = phone
    },

    onsubmit() {
      switch (this.currentComponent) {
        case "AuthLogin":
          if (this.validPhone) {
            this.submitPhone()
          } else {
            this.showError = true
          }
          break;
        case "AuthVerify":
          if (this.code.length === 4) {
            this.asignCode();
          }
          break;
      }
    },

    submitPhone() {
      axios
        .post("https://soha.iran.liara.run/api/v1/auth/attempt", {
          username: this.phone,
        })
        .then((response) => {
          this.currentComponent = "AuthVerify";
          this.title = "تایید";
        })
        .catch((error) => {
          // useToast.error(error.response.message);
        });
    },

    asignCode() {
      axios
        .post("https://soha.iran.liara.run/api/v1/auth/verify", {
          username: this.phone,
          code: this.code,
        })
        .then((response) => {
          const token = response.data.data.access_token;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          this.$router.push("/dong");
        })
        .catch((error) => {
          // useToast.error(error.response.message);
        });
    },
  },
};
</script>
