<template>
    <div class="w-screen h-screen bg-gray-100">
        <Modal v-if="showModal" @close="closeModal" @submitProject="submit" @project="projects" />
        <div class="w-full h-full">
            <div class="flex flex-col mx-6 h-full">
                <h1 class="text-center mt-5 font-medium text-lg">دونگ</h1>
                <ButtonBack />
                <div class="flex flex-col h-full justify-between">
                    <div class="w-full flex flex-col">
                        <div class="py-5 bg-neutral-50 text-right px-3 rounded-lg shadow-lg border-r-[6px] border-gray-900 my-2 hover:bg-gray-200"
                            v-if="project in projects" :key="submitProject">
                            {{ project }}
                        </div>
                        <div
                            class="py-5 bg-neutral-50 text-right px-3 rounded-lg shadow-lg border-r-[6px] border-gray-900 my-2 hover:bg-gray-200">
                            پروژه شمال ایرانسل
                        </div>
                        <div
                            class="py-5 bg-neutral-50 text-right px-3 rounded-lg shadow-lg border-r-[6px] border-gray-900 my-2 hover:bg-gray-200">
                            123
                        </div>
                        <div
                            class="py-5 bg-neutral-50 text-right px-3 rounded-lg shadow-lg border-r-[6px] border-gray-900 my-2 hover:bg-gray-200">
                            <div class="flex items-center justify-between">
                                <img src="../assets/images/3dotes.svg" class="w-5 ml-3" alt="" />
                                <p>تولد سعید</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-5">
                        <button class="bg-sky-900 text-teal-50 py-4 text-xl px-5 rounded-lg" @click="showModal = true">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Modal from "../components/modals/Modal.vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
export default {
    data() {
        return {
            project: "",
            showModal: false,
            nameProjectRecive: "",
            nameGroupeCostResive: "",
        };
    },
    components: { Modal },

    watch: {
        submitProject() {
            this.nameProjectRecive = projectInfo.nameProject;
            this.nameGroupeCostResive = projectInfo.nameGroupeCost;
        },
    },

    methods: {
        closeModal() {
            this.showModal = false;
        },

        submit(project) {
            this.name = project.name;
            const projectInfo = {
                name: this.nameProject,
                host_group_name: this.nameGroupeCost,
            };

            console.log("added");
            const token = localStorage.getItem("token", token);
            
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            axios
                .post("https://soha.iran.liara.run/api/v1/dong/project", {
                    projectInfo,
                })
                .then((response) => {
                    console.log(response);
                    const $toast = useToast();
                    this.$toast.success(response.data.message);
                })
                .catch((error) => {
                    const $toast = useToast();
                    $toast.error(error.response.message);
                });

            this.closeModal();
        },
        projects() {
            axios
                .get("https://soha.iran.liara.run/api/v1/dong/project")
                .then((response) => {
                    console.log(response);
                    const $toast = useToast();
                    this.$toast.success(response.data.message);
                })
                .catch((error) => {
                    const $toast = useToast();
                    $toast.error(error.response.message);
                });
        },
    },
};
</script>
  
<style></style>