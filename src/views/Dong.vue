<template>
  <div class="w-screen h-screen bg-gray-100">
    <CreateProjectModal
      v-if="showCreateModal"
      @close="closeCreateModal"
      @submitProject="submit"
    />
    <MoreModal
      v-if="showMoreModal"
      :title="title"
      @closeMoreModal="closeMoreModal"
      @closeAndShowEditModal="closeAndShowEditModal"
      @deleteProject="deleteProject"
    />
    <EditProjectModal
      v-if="showEditModal"
      @close="closeEditModal"
      @renameProject="renameProject"
    />
    <div class="w-full h-full">
      <div class="flex flex-col mx-6 h-full">
        <h1 class="text-center mt-5 font-medium text-lg">محاسبه دنگ</h1>
        <ButtonBack />
        <div v-for="item in projectList" :key="item">
          <div
            class="flex justify-between px-5 bg-neutral-50 text-right rounded-lg shadow-lg border-r-[6px] border-gray-900 my-2 hover:bg-gray-200"
          >
            <div @click="showDetail(item.uuid)" class="w-full h-14 ml-8 pt-4">
              {{ item.name }}
            </div>
            <img
              src="../assets/images/3dotes.svg"
              @click="showMore(item)"
              class="w-5 ml-3"
            />
          </div>
        </div>
        <div class="mb-5">
          <button
            class="fixed left-7 bottom-6 bg-sky-900 text-teal-50 py-4 text-xl px-5 rounded-lg"
            @click="showCreateModal = true"
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
import CreateProjectModal from "../components/modals/CreateProjectModal.vue";
import MoreModal from "../components/modals/MoreModal.vue";
import axios from "axios";
import ButtonBack from "../components/buttons/ButtonBack.vue";
import { useToast } from "vue-toast-notification";
import EditProjectModal from "@/components/modals/EditProjectModal.vue";

export default {
  data() {
    return {
      project: "",
      showCreateModal: false,
      nameProjectRecive: "",
      nameGroupeCostResive: "",
      projectList: [],
      showMoreModal: false,
      showEditModal: false,
      title: "",
      uuid: null,
      newNameProject: "",
    };
  },
  components: { CreateProjectModal, ButtonBack, MoreModal, EditProjectModal },

  watch: {
    submitProject() {
      this.nameProjectRecive = projectInfo.nameProject;
      this.nameGroupeCostResive = projectInfo.nameGroupeCost;
    },
  },

  methods: {
    closeCreateModal() {
      this.showCreateModal = false;
    },
    closeEditModal() {
      this.showEditModal = false;
    },

    submit(project) {
      this.name = project.name;
      const projectInfo = {
        name: project.nameProject,
        host_group_name: project.nameGroupeCost,
      };
      console.log("added");
      axios
        .post("https://soha.iran.liara.run/api/v1/dong/project", projectInfo)
        .then((response) => {
          console.log(response);
          const $toast = useToast();
          $toast.success(response.data.message);
          this.getList();
        })
        .catch((error) => {
          const $toast = useToast();
          $toast.error(error.data.message);
        });
      this.closeCreateModal();
    },
    getList() {
      axios
        .get("https://soha.iran.liara.run/api/v1/dong/project")
        .then((response) => {
          this.projectList = response.data.data;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    showMore(item) {
      this.title = item.name;
      this.uuid = item.uuid;
      this.showMoreModal = true;
    },
    showDetail(id) {
      localStorage.setItem("uid", id);
      this.$router.push("/project");
    },
    closeMoreModal() {
      this.showMoreModal = false;
    },

    closeAndShowEditModal() {
      console.log(this.title, this.uuid);
      this.showMoreModal = false;
      this.showEditModal = true;
    },
    deleteProject() {
      axios
        .delete(`https://soha.iran.liara.run/api/v1/dong/project/${this.uuid}`)
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
        .put(`https://soha.iran.liara.run/api/v1/dong/project/${this.uuid}`, {
          name: title,
        })
        .then((response) => {
          this.showEditModal = false;
          this.getList();
        })
        .catch((error) => {
          console.log(error.message);
        });
      this.showMoreModal = false;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
