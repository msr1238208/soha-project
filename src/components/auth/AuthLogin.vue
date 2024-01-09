<template>
    <div>
        <ButtonBack />
        <img src="../../assets/images/soha-logo.jpg" alt="Soha Logo" class="md:w-40 mx-auto" />

        <div class="text-right flex flex-col w-2/3 mx-auto mt-6">
            <label class=" my-1">شماره موبایل</label>
            <input type="tel" class="px-4 py-3 outline-none rounded-lg" v-model="phoneNumber" />
            <p class="text-right mt-1 text-red-500 text-xs mb-7">
                شماره موبایل خالی نمی تواند باشد
            </p>
        </div>
    </div>
</template>

<script>
import ButtonBack from "../buttons/ButtonBack.vue"
import ButtonEnterance from "../buttons/ButtonEnterance.vue";
import axios from "axios";
// import { useToast } from "vue-toast-notification";

export default {
    components: { ButtonBack, ButtonEnterance },
    data() {
        return {
            title: "ورود یا ثبت نام",
            phoneNumber: ""
        }
    },
    methods: {
        submit() {
            console.log("Okshod");
            this.$emit("onChange");
            // axios
            //     .post("https://soha.iran.liara.run/api/v1/auth/attempt", {
            //         username: this.phoneNumber,
            //     })
            //     .then((response) => {
            //         console.log(response);
            //         const $toast = useToast();
            //         this.$toast.success(response.data.data.message);
            //         this.$emit("setPhone", this.phoneNumber);
            //         this.$emit("changeComponent");
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //         const $toast = useToast()
            //         $toast.error()
            //     });


        },
    },
}
</script>

<style></style>