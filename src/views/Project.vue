<template>
  <div class="w-screen h-screen bg-gray-100">
    <div class="w-full h-full">
      <div class="flex flex-col mx-6 h-full">
        <h1 class="text-center mt-5 font-medium text-lg">{{ project }}</h1>
        <ButtonBack />
        <div class="bg-sky-950 rounded-lg p-8 mt-4">
          <div class="flex justify-between">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/back.png"
              alt="back"
            />
            <p class="text-gray-300">مجموع هزینه ها</p>
          </div>
          <p class="text-white text-2xl pt-4">0 toman</p>
        </div>
        <div class="flex gap-4 mt-4">
          <div class="bg-green-600 text-white text-center rounded-lg w-1/2 py-4 md:py-8">
            <img
              class="mx-auto"
              width="50"
              height="50"
              src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/FFFFFF/external-dolar-miscellaneous-user-interface-v2-creatype-outline-colourcreatype.png"
              alt="external-dolar-miscellaneous-user-interface-v2-creatype-outline-colourcreatype"
            />
            <p>سهم هر نفر</p>
            <p>0تومان</p>
          </div>
          <div class="bg-orange-400 text-white text-center rounded-lg w-1/2 py-4 md:py-8">
            <img
              class="mx-auto"
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/group-foreground-selected.png"
              alt="group-foreground-selected"
            />
            <p>گروه ها</p>
            <p>1 گروه</p>
          </div>
        </div>
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
      project: "mohammad",
    };
  },
};
</script>

<style></style>
