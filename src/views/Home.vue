<template>
  <div class="top-0 h-screen w-full flex flex-col justify-center items-center">
    <div class="w-1/2 bg-white rounded-2xl shadow-md text-center py-8">
      <component :is="currentComponent" @setPhone="setPhone" :phone="phone" :isEmpty="isEmpty" @getCode="getCode"
        @validPhoneNumber="validPhoneNumber">
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
      phone: null,
      otpCode: null,
      title: "ورود",
      phonelength: false,
      isEmpty: false,
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

    getCode(otpCode) {
      this.otpCode = otpCode;
    },

    validPhoneNumber(phone) {
      this.isEmpty = false
      this.phonelength = true
      this.phone = phone
    },

    onsubmit() {
      switch (this.currentComponent) {
        case "AuthLogin":
          if (this.phonelength) {
            this.submitPhone()
          } else {
            this.isEmpty = true
          }
          break;
        case "AuthVerify":
          console.log(this.otpCode);
          if (this.otpCode.length === 4) {
            this.onVerify();
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
        });
    },

    onVerify() {
      axios
        .post("https://soha.iran.liara.run/api/v1/auth/verify", {
          username: this.phone,
          code: this.otpCode,
        })
        .then((response) => {
          const token = response.data.data.access_token;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          this.$router.push("/dong");
        })
        .catch((error) => {
        });
    },
  },
};
</script>
