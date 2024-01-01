<template>
    <div class="w-full flex flex-col">
        <button class="bg-slate-400 text-white rounded-lg py-3">{{ title }}</button>
    </div>
</template>
  
<script>
export default {
    props: {
        title: {
            type: String,
        },
    },
};
</script>
  
<style></style>