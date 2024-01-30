<template>
    <div>
        <div class="w-fit bg-amber-50 rounded-lg outline-2">
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