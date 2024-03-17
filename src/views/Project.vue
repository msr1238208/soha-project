<template>
  <div class="w-screen h-screen bg-gray-100">
    <AddGroupModal v-if="showAddGroupModal" @close="closeAddGroupModal" />
    <AddExpenseModal v-if="AddExpenseModal" @close="closeAddExpenseModal" />
    <AddExpenseAndGroupModal
      v-if="showCreateExpenseAndGroup"
      @close="onClose"
      @showAddGroup="showAddGroups"
      @showAddExpense="onShowAddExpense"
    />
    <MoreModal
      v-if="showMoreModal"
      :title="amountAndDescription"
      @closeMoreModal="closeMoreModal"
      @closeAndShowEditModal="closeAndShowEditModal"
      @deleteProject="deleteExpense"
    />
    <EditExpenseModal
      v-if="showEditModal"
      @close="showEditModal = false"
      @renameProject="renameProject"
      :descriptions="description"
      @editExpense="editExpense"
      :amounts="amount"
    />
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
              <div @click="goProject" class="w-full flex bg-slate-100 text-black">
                <img
                  class="mt-3 h-10 w-10"
                  src="https://img.icons8.com/external-creatype-glyph-colourcreatype/64/EBEBEB/external-dolar-miscellaneous-user-interface-v2-creatype-glyph-colourcreatype.png"
                  alt="external-dolar-miscellaneous-user-interface-v2-creatype-glyph-colourcreatype"
                />

                <div class="w-full px-5 py-2">
                  <div>
                    {{ item.amount }} تومان &nbsp;&nbsp;&nbsp; {{ item.description }}
                  </div>
                  <div class="flex justify-between text-slate-400">
                    <div>
                      توسط گروه:
                      {{ item.group.title }}
                    </div>
                    <div>
                      <p class="dir_ltr">{{ convertDate(created_at) }}</p>
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
        <div class="mb-5">
          <button
            class="fixed left-7 bottom-6 bg-sky-900 text-teal-50 py-4 text-xl px-5 rounded-lg"
            @click="showCreateExpenseAndGroup = true"
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/sf-regular/48/FFFFFF/plus-math.png"
              alt="plus-math"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from "../components/buttons/ButtonBack.vue";
import axios from "axios";
import MoreModal from "../components/modals/MoreModal.vue";
import EditExpenseModal from "@/components/modals/EditExpenseModal.vue";
import AddExpenseAndGroupModal from "@/components/modals/AddExpenseAndGroupModal.vue";
import AddGroupModal from "@/components/modals/AddGroupModal.vue";
import AddExpenseModal from "@/components/modals/AddExpenseModal.vue";

export default {
  components: {
    ButtonBack,
    MoreModal,
    EditExpenseModal,
    AddExpenseAndGroupModal,
    AddGroupModal,
    AddExpenseModal,
  },
  data() {
    return {
      show: false,
      showAddGroupModal: false,
      showCreateExpenseAndGroup: false,
      showEditModal: false,
      name: "",
      created_at: null,
      expensesList: [],
      expenses_sum_amount: 0,
      groups_count: 0,
      individual_share: 0,
      showMoreModal: false,
      title: "",
      amountAndDescription: "",
      uuid: "",
      groupId: "",
      AddExpenseModal: false,
      expensesId: "",
      description: "",
      amount: "",
    };
  },
  mounted() {
    this.getList();
  },

  methods: {
    showAddExpenses() {
      this.AddExpenseModal = true;
      this.showCreateExpenseAndGroup = false;
    },
    showAddGroups() {
      this.showAddGroupModal = true;
      this.showCreateExpenseAndGroup = false;
    },
    closeAddExpenseModal() {
      this.showAddExpenseModal = false;
    },
    closeAddGroupModal() {
      this.showAddGroupModal = false;
    },
    getList() {
      this.uuid = localStorage.getItem("uid");
      axios
        .get(`https://soha.iran.liara.run/api/v1/dong/project/${this.uuid}`)
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
    editExpense(amount, description) {
      axios
        .put(
          `https://soha.iran.liara.run/api/v1/dong/project/${this.uuid}/groups/${this.groupId}/expenses/${this.expensesId}`,
          {
            amount: amount,
            description: description,
          }
        )
        .then((response) => {
          console.log(response.data.message);
          this.getList();
        })
        .catch((error) => {
          console.log(error.message);
        });
      this.showEditModal = false;
    },
    showMore(item) {
      this.amountAndDescription = item.description + item.amount;
      this.groupId = item.group.id;
      this.expensesId = item.id;
      this.amount = item.amount;
      this.description = item.description;
      this.showMoreModal = true;
    },

    onShowAddExpense() {
      this.AddExpenseModal = true;
      this.showCreateExpenseAndGroup = false;
    },

    closeMoreModal() {
      this.showMoreModal = false;
    },
    closeAndShowEditModal() {
      this.showMoreModal = false;
      this.showEditModal = true;
    },
    onClose(s) {
      console.log(s);
      this.showCreateExpenseAndGroup = false;
    },
    deleteExpense() {
      axios
        .delete(
          `https://soha.iran.liara.run/api/v1/dong/project/${this.uuid}/groups/${this.groupId}/expenses/${this.expensesId}`
        )
        .then((response) => {
          console.log(response.data.message);
          this.getList();
        })
        .catch((error) => {
          console.log(error.message);
        });
      this.showMoreModal = false;
    },
    renameProject(title) {
      axios
        .put(
          `https://soha.iran.liara.run/api/v1/dong/project/${this.uuid}/groups/${this.groupId}/expenses/${this.expensesId}`,
          {
            title,
          }
        )

        .then((response) => {
          this.showEditModal = false;
          this.getList();
        })
        .catch((error) => {
          console.log(error.message);
        });
      this.showMoreModal = false;
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
  },
};
</script>
