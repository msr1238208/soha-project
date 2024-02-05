<template>
    <div class="w-screen h-screen bg-gray-100">
        <div class="ml-28 pt-28">
            <ButtonBack />
            <div class="w-full h-full flex flex-col items-center">
                <div class="mb-10 mt-5">
                    <img src="../../assets/images/soha-logo.jpg" width="150" class="md:w-52" />
                </div>
            </div>
            <div class="w-full">
                <div class="flex flex-col mx-5 md:mx-28 lg:mx-52 xl:mx-64">
                    <label class="text-right mb-1">شماره موبایل</label>
                    <input type="tel" class="px-10 py-3 outline-none rounded-lg" v-model="phoneNumber" />
                    <p class="text-right mt-1 text-red-500 text-xs mb-7">
                        شماره موبایل خالی نمی تواند باشد
                    </p>
                    <div class="w-full flex flex-col">
                        <ButtonEnterace :title="title" @click="submit" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { useToast } from "vue-toast-notification";
import ButtonEnterace from "../../components/buttons/ButtonEnterance.vue";

export default {
    components: { ButtonEnterace },
    data() {
        return {
            title: "ورود یا ثبت نام",
            phoneNumber: "",
        };
    },
    methods: {
        submit() {
            axios
                .post("https://soha.iran.liara.run/api/v1/auth/attempt", {
                    username: this.phoneNumber,
                })
                .then((response) => {
                    console.log(response);
                    const $toast = useToast();
                    this.$toast.success(response.data.message);
                    this.$emit("setPhone", this.phoneNumber);
                    this.$emit("changeComponent");
                })
                .catch((error) => {
                    const $toast = useToast();
                    $toast.error(error.response.message);
                });
        },
    },
};
</script>