<template>
    <div>
        <ButtonBack />
        <img src="../../assets/images/soha-logo.jpg" alt="Soha Logo" class="md:w-40 mx-auto" />

        <div class="text-right flex flex-col w-2/3 mx-auto my-6">
            <label class="my-4">کد ارسال شده به شماره {{ userinfo.phone }} را وارد کنید</label>
            <div class="flex gap-4">
                <input
                    class="w-full py-2 items-center justify-center text-center outline-none rounded-md border text-lg bg-amber-50 focus:bg-gray-30 focus:ring-1"
                    type="text" v-for="i in 4" v-model="digits[i - 1]" :key="i" maxlength="1" v-on:keyup="onTextKey" @input="otpCode" />
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
        otpCode(){
            if(this.code.length===4){   
             this.$emit("codeResive", this.code);    
            }
        }
    },
};
</script>

<style></style>
