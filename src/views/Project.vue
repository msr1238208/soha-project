<template>
    <div class="w-screen h-screen bg-gray-100">
        <div class="w-full h-full">
            <div class="flex flex-col mx-6 h-full">
                <h1 class="text-center mt-5 font-medium text-lg">{{ project }}</h1>
                <ButtonBack />
            </div>
        </div>
    </div>
</template>

<script>
import ButtonBack from "../components/buttons/ButtonBack.vue";

export default {
    components: { ButtonBack },
    data() {
        return {
            project: "mohammad"
        }
    },
}
</script>

<style></style>