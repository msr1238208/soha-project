<template>
    <div>
        <div class="w-full flex justify-end ">
            <img src="../../assets/images/Back-Button.png" alt="Go to Back" width="65" @click="goBack">
        </div>
    </div>
</template>


<script>
export default {
    methods: {
        goBack() {
            this.$router.back();
        }
    },
}
</script>

<style></style>