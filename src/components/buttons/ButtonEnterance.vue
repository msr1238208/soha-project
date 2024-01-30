<template>
    <div>
        
    </div>
</template>


<script>
export default {
    props: {
        title: {
            type: String
        }
    },
    methods: {
        onsubmit() {
            this.$emit("onSubmit");
        },
    },
}
</script>


<style></style>