<template>
    <div class="w-full">
        <ButtonBack />
        <div class="w-full h-full flex flex-col items-center">
            <div class="mb-10 mt-5">
                <img src="../../assets/images/soha-logo.jpg" width="150" class="md:w-52" />
            </div>
        </div>
        <div class="w-full">
            <div class="flex flex-col w-2/3 mx-auto">
                <label class="text-right mb-1">شماره موبایل</label>
                <input type="text" class="px-10 py-3 outline-none rounded-lg mb-4" v-model="phoneNumber" @input="change" />
                {{ phoneValidate }} {{ showError }}
                <p v-if="phoneValidate || showError" class="text-right text-red-500 text-xs mb-4">
                    شماره موبایل خالی نمی تواند باشد
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import ButtonBack from "../buttons/ButtonBack.vue";

export default {
    components: { ButtonBack },
    data() {
        return {
            title: "ورود یا ثبت نام",
            phoneNumber: "",
            phoneValidate: false,
        };
    },
    props: ["showError"],
    methods: {
        // submit() {
        //     axios
        //         .post("https://soha.iran.liara.run/api/v1/auth/attempt", {
        //             username: this.phoneNumber,
        //         })
        //         .then((response) => {
        //             console.log(response);
        //             this.$emit("setPhone", this.phoneNumber);
        //             this.$emit("changeComponent");
        //         })
        //         .catch((error) => {
        //         });
        // },

        change() {
            if (this.phoneNumber.length === 11) {
                this.$emit("validPhoneNumber", this.phoneNumber);
            }
        },
    },
};
</script>
