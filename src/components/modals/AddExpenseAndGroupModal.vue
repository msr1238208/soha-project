<template>
  <!-- <AddGroupModal />
    <AddExpenseModal /> -->
  <div
    class="fixed p-6 btn-align top- z-50 bg-gray-300 w-full h-screen bg-opacity-80 backdrop-blur-sm"
  >
    <button
      @click="closeModal"
      class="bottom-6 bg-gray-400 text-teal-50 py-4 text-xl px-5 rounded-lg"
    >
      <img
        width="30"
        height="30"
        src="https://img.icons8.com/ios-filled/50/FFFFFF/delete-sign--v1.png"
        alt="delete-sign--v1"
      />
    </button>
    <!-- @showAddGroup="onShowAddGroup"  -->
    <button
      @click="showAddGroup"
      class="bottom-6 my-2 bg-orange-400 text-teal-50 py-4 text-xl px-5 rounded-lg"
    >
      <img
        class="mx-auto"
        width="30"
        height="30"
        src="https://img.icons8.com/ios-filled/50/FFFFFF/group-foreground-selected.png"
        alt="group-foreground-selected"
      />
    </button>
    <button
      @click="showAddExpense"
      class="bottom-6 bg-green-600 text-teal-50 py-4 text-xl px-5 rounded-lg"
    >
      <img
        class="mx-auto"
        width="30"
        height="30"
        src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/FFFFFF/external-dolar-miscellaneous-user-interface-v2-creatype-outline-colourcreatype.png"
        alt="external-dolar-miscellaneous-user-interface-v2-creatype-outline-colourcreatype"
      />
    </button>
  </div>
</template>

<script>
import AddGroupModal from "@/components/modals/AddGroupModal.vue";
import AddExpenseModal from "@/components/modals/AddExpenseModal.vue";
export default {
  components: { AddGroupModal, AddExpenseModal },

  methods: {
    closeModal() {
      this.$emit("close");
    },
    showAddGroup() {
      this.$emit("showAddGroup");
    },
    showAddExpense() {
      this.$emit("showAddExpense");
    },
  },
};
</script>

<style>
.btn-align {
  writing-mode: vertical-lr;
}
</style>
