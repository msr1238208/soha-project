<template>
    <div>
        <div class="w-full h-full fixed bg-slate-700 bg-opacity-60 flex flex-col items-center px-2">
            <div class="w-full  md:w-2/5 bg-stone-100 p-5 my-auto bg-secondary-200 rounded-xl">
                <svg @click="closeModal" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="50"
                    viewBox="0 0 48 48">
                    <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z">
                    </path>
                    <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
                    <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                </svg>

                <p class="font-extrabold flex flex-col items-center mb-9 ">بیشتر</p>

                <input type="text" class="rounded-lg w-full p-2 mb-6 border-1 border-gray-200" :value="title" disabled />
                <div class="flex gap-4">
                    <button type="button" @click="showEditModal"
                        class="w-1/2 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                        ویرایش
                    </button>
                    <button type="button" @click="deleteProject"
                        class="w-1/2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                        حذف
                    </button>
                  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
    data() {
        return {
            nameProject: "",
            uuid: String
        };
    },
    methods: {

        closeModal() {
            this.$emit("closeMoreModal");
        },
        showEditModal() {
            this.$emit("closeAndShowEditModal");
        },
        deleteProject() {
            this.$emit("deleteProject")
        }

    },
};
</script>

<style></style>
