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
                <p v-if="phonelength || isEmpty" class="text-right text-red-500 text-xs mb-4">
                    شماره موبایل نامعتبر می باشد
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import ButtonBack from "../buttons/ButtonBack.vue";
export default {
    components: { ButtonBack },
    data() {
        return {
            title: "ورود یا ثبت نام",
            phoneNumber: "",
            phonelength: false,
        };
    },
    props: ["isEmpty"],
    methods: {
        change() {
            if (this.phoneNumber.length === 11) {
                this.$emit("validPhoneNumber", this.phoneNumber);
            }
        },
    },
};
</script>
