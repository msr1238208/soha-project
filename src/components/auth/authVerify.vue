<template>
    <div class="w-full">
        <div class="w-full h-full flex flex-col items-center mt-16 p-10">
            <p class="flex flex-col items-center">لطفا کد دریافت شده را وارد کنید</p>
            <buttonBack class="ml-64" />
            <div dir="ltr" class="flex space-x-5 mx-16 my-10 md:mx-28 xl:mx-72">
                <input
                    class="w-10 py-3 items-center justify-center text-center outline-none rounded-md border text-lg bg-amber-50 focus:bg-gray-30 focus:ring-1"
                    type="text" v-for="i in 4" :key="i" @change="change" v-model="digits[i - 1]" maxlength="1"
                    v-on:keyup="onTextKey" />
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
export default {
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
        change() {
            let code = this.code;
            this.$emit("getCode", code);
        },
    },
};
</script>
