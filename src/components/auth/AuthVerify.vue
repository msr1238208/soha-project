<template>
    <!-- <div>
        <div class="w-screen h-screen">
            <div class="w-full h-full flex flex-col mt-16 p-10">
                <p class="flex flex-col items-center">لطفاٌ کد دریافت شده را وارد کنید</p>
                <button-back class="ml64" />
                <div class="flex space-x-5 mx-16 my-10 md:mx-28 xl:mx-72">
                    <input
                        class="w-full h-full py-3 items-center justify-center text-center outline-none rounded-md border text-lg bg-amber-50 focus:bg-gray-30 focus:ring-1"
                        type="text" v-for="i in 4" v-model="digits[i - 1]" :key="i" maxlength="1" v-on:keyup="onTextKey" />
                </div>
                <div>
                    <ButtonEnterance :title="title" @click="submitVerify" @onChange="changeMasir" />
                </div>
            </div>
        </div>
    </div> -->

    <div>
        <ButtonBack />
        <img src="../../assets/images/soha-logo.jpg" alt="Soha Logo" class="md:w-40 mx-auto" />

        <div class="text-right flex flex-col w-2/3 mx-auto my-6">
            <label class=" my-4">کد ارسال شده به شماره {{ userinfo.phone }} را وارد کنید</label>
            <div class="flex gap-4">
                <input
                    class="w-full py-2 items-center justify-center text-center outline-none rounded-md border text-lg bg-amber-50 focus:bg-gray-30 focus:ring-1"
                    type="text" v-for="i in 4" v-model="digits[i - 1]" :key="i" maxlength="1" v-on:keyup="onTextKey" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ButtonBack from '../buttons/ButtonBack.vue'
import ButtonEnterance from '../buttons/ButtonEnterance.vue'
export default {
    components: { ButtonBack, ButtonEnterance },
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
        changeMasir() {
            console.log("verifyam");
            this.$emit("changeComponent");
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
                    this.$router.push("../../views/Dong.vue");
                })
                .catch((error) => {
                    const $toast = useToast();
                    $toast.error(error.response.message);
                });
        },

    },

}
</script>

<style></style>