<template>
    <div class="w-screen h-screen">
        <div class="w-full h-full flex flex-col mt-16 p-10">
            <p class="flex flex-col items-center">لطفا کد دریافت شده را وارد کنید</p>
            <buttonBack class="ml-64" />
            <div class="flex space-x-5 mx-16 my-10 md:mx-28 xl:mx-72">
                <input
                    class="w-full h-full py-3 items-center justify-center text-center outline-none rounded-md border text-lg bg-amber-50 focus:bg-gray-30 focus:ring-1"
                    type="text" v-for="i in 4" v-model="digits[i - 1]" :key="i" maxlength="1" v-on:keyup="onTextKey" />
            </div>
            <div class="flex flex-col px-72">
                <ButtonEnterace :title="title" @click="submitVerify" />
            </div>
            <div class="flex flex-col items-center mt-6">
                <p class="text-gray-400">کدی دریافت نکردید</p>
                <div class="flex text-gray-400">
                    ثانیه تا ارسال مجدد
                    <div class="text-stone-950"><strong>&nbsp;120</strong></div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import ButtonEnterace from "../../components/buttons/ButtonEnterance.vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";

export default {
    components: { ButtonEnterace },

    data() {
        return {
            title: "تایید",
            userinfo: {
                phone: "",
                code: "",
            },
            digits: [],
        };
    },
    props: ["phone"],
    computed: {
        code() {
            return this.digits.join("");
        },
    },
    methods: {
        onTextKey(event) {
            const key = event.key;

            if (["Tab", "Shift", "Meta", "Control", "Alt", "Enter"].includes(key)) {
                return;
            }

            if (["Delete"].includes(key)) {
                return;
            }
            if (key === "ArrowLeft" || key === "Backspace") {
                if (event.target.previousElementSibling) {
                    event.target.previousElementSibling.focus();
                }
            } else {
                if (event.target.nextElementSibling) {
                    event.target.nextElementSibling.focus();
                }
            }
        },
        submitVerify() {
            axios
                .post("https://soha.iran.liara.run/api/v1/auth/verify", {
                    username: this.phone,
                    code: this.code,
                })
                .then((response) => {
                    console.log(response);

                    const token = response.data.data.access_token;
                    localStorage.setItem("token", token);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    const $toast = useToast();
                    this.$toast.success(response.message);
                    this.$router.push("/dong");
                })
                .catch((error) => {
                    const $toast = useToast();
                    $toast.error(error.response.message);
                });
        },
    },
};
</script>
  