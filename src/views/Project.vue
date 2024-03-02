<template>
  <div class="w-screen h-screen bg-gray-100">
    <div class="w-full h-full">
      <div class="flex flex-col mx-6 h-full">
        <h1 class="text-center mt-5 font-medium text-lg">{{ name }}</h1>
        <ButtonBack />
        <div class="bg-sky-950 rounded-lg p-8 mt-4">
          <div class="flex justify-between">
            <p class="text-gray-300">مجموع هزینه ها</p>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/back.png"
              alt="back"
            />
          </div>
          <p class="text-white text-2xl pt-4">
            {{ expenses_sum_amount ? expenses_sum_amount : 0 }} تومان
          </p>
        </div>
        <div class="flex gap-4 mt-4">
          <div class="bg-orange-400 text-white text-center rounded-lg w-1/2 py-4 md:py-8">
            <img
              class="mx-auto"
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/group-foreground-selected.png"
              alt="group-foreground-selected"
            />
            <p>گروه ها</p>
            <p>{{ groups_count }} گروه</p>
          </div>
          <div class="bg-green-600 text-white text-center rounded-lg w-1/2 py-4 md:py-8">
            <img
              class="mx-auto"
              width="50"
              height="50"
              src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/FFFFFF/external-dolar-miscellaneous-user-interface-v2-creatype-outline-colourcreatype.png"
              alt="external-dolar-miscellaneous-user-interface-v2-creatype-outline-colourcreatype"
            />
            <p>سهم هر نفر</p>
            <p>{{ individual_share }} تومان</p>
          </div>
        </div>
        <div class="flex justify-between pt-5">
          <p>۵هزینه آخر</p>
          <div class="flex">
            <p>همه</p>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios/50/back--v1.png"
              alt="back--v1"
            />
          </div>
        </div>
        <div v-if="expensesList.length">
          <div v-for="item in expensesList" :key="item">
            <div
              class="bg-neutral-50 flex rounded-lg shadow-lg border-r-[6px] mb-5 border-gray-900"
            >
              <div @click="goProject" class="w-full flex bg-slate-700 text-white">
                <img
                  class="mt-3 h-10 w-10"
                  src="https://img.icons8.com/external-creatype-glyph-colourcreatype/64/EBEBEB/external-dolar-miscellaneous-user-interface-v2-creatype-glyph-colourcreatype.png"
                  alt="external-dolar-miscellaneous-user-interface-v2-creatype-glyph-colourcreatype"
                />

                <div class="bg-red-500 w-full px-5 py-2">
                  <div>{{ item.amount }}{{ item.description }}</div>
                  <div class="flex justify-between">
                    <div>
                      {{ item.group.title }}
                      توسط گروه:
                    </div>
                    <div>
                      <p class="dir_rtl">{{ convertDate(created_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <img
                src="../assets/images/3dotes.svg"
                @click="showMore(item)"
                class="w-5 m-4"
              />
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-center text-3xl pt-44">هیچ هزینه ای ثبت نشده است</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from "../components/buttons/ButtonBack.vue";
import axios from "axios";

export default {
  components: { ButtonBack },
  data() {
    return {
      name: "",
      created_at: null,
      expensesList: [],
      expenses_sum_amount: 0,
      groups_count: 0,
      individual_share: 0,
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    getList() {
      let uuid = localStorage.getItem("uid");
      axios
        .get(`https://soha.iran.liara.run/api/v1/dong/project/${uuid}`)
        .then((response) => {
          this.expensesList = response.data.data.project.expenses.slice(-5);
          this.name = response.data.data.project.name;
          this.created_at = response.data.data.project.created_at;
          this.expenses_sum_amount = response.data.data.project.expenses_sum_amount;
          this.groups_count = response.data.data.project.groups_count;
          this.individual_share = response.data.data.project.individual_share;
          console.log(this.expensesList);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    convertDate(dateTime) {
      const newDate = new Date(dateTime).toLocaleString("fa-IR", {
        calendar: "persian",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      let nDate = newDate.replace(/,/g, " -");
      return nDate;
    },

    showMore(item) {
      console.log(item);
    },
  },
};
</script>
