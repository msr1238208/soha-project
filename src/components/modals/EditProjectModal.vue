<template>
  <div
    class="w-full h-full fixed bg-slate-700 bg-opacity-60 flex flex-col items-center px-2"
  >
    <div class="w-full md:w-2/5 bg-stone-100 p-5 my-auto bg-secondary-200 rounded-xl">
      <p class="font-extrabold flex flex-col items-center">تغییر نام پروژه</p>
      <div class="text-right pt-6">
        <p class="font-semibold pb-2">نام جدید پروژه</p>
        <input type="text" dir="rtl" v-model="name" class="rounded-lg w-full p-2" />
      </div>
      <div class="flex flex-col mt-16 my-3 space-y-3 p-">
        <button class="bg-zinc-500 text-white rounded-md p-2" @click="submit">
          تایید
        </button>
        <button
          class="border-2 border-secondary-500 rounded-md text-gray-500 p-2"
          @click="closeModal"
        >
          انصراف
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    submit() {
      this.$emit("renameProject", this.name);
    },
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style></style>
