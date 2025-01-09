<template>
  <div class="mx-10 sm:mx-20 my-10 py-8">
    <h1 class="text-2xl font-bold mb-4">My Enrolled Sections</h1>

    <div v-if="!sections.length" class="text-gray-500">
      No sections available.
    </div>

    <div v-else>
      <div
        v-for="section in sections"
        :key="section.section_id"
        class="mb-6 border rounded-lg shadow"
      >
        <!-- Section Header -->
        <button
          @click="toggleSection(section.section_id)"
          class="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
        >
          <span class="font-semibold">{{ section.section_name }}</span>
          <span>{{ section.section_cost | currency }}</span>
        </button>

        <!-- Section Content -->
        <div
          v-if="expandedSections.includes(section.section_id)"
          class="bg-white px-4 py-2"
        >
          <div
            v-for="course in section.courses"
            :key="course.id"
            class="border-b py-8"
          >
            <!-- Course Header -->
            <h3 class="font-medium text-lg">{{ course.name }}</h3>
            <p class="text-sm text-gray-600 mb-2">{{ course.description }}</p>

            <!-- Chapters -->
            <h4 class="font-medium text-lg mt-6 mb-4">Complete the chapters: </h4>

            <div
              v-for="chapter in course.chapters"
              :key="chapter.id"
              class="mb-4 px-8"
            >
              <div class="flex items-center">
                <span class=" mb-2">{{ chapter.name }}</span>
              </div>
              <div v-if="isValidYouTubeLink(chapter.content)">
                <iframe
                :src="getYouTubeEmbedUrl(chapter.content)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-64 rounded-md"
                ></iframe>
              </div>
              <div v-else>
                <p>Only Support Youtube Links</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "@/services/api";

export default {
  setup() {
    const sections = ref([]);
    const expandedSections = ref([]);

    const fetchSections = async () => {
      try {
        const student = JSON.parse(localStorage.getItem('login_student')); 
        const response = await api.get(`/student/${student.student_id}/confirmed-sections`);
        if (response && response.data.data) {
          sections.value = response.data.data;
        } else {
          console.error("No sections data found.");
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    const toggleSection = (sectionId) => {
      if (expandedSections.value.includes(sectionId)) {
        expandedSections.value = expandedSections.value.filter(
          (id) => id !== sectionId
        );
      } else {
        expandedSections.value.push(sectionId);
      }
    };

    onMounted(() => {
      fetchSections();
    });

    function isValidYouTubeLink(link) {
      const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
      return regex.test(link);
    }
    function getYouTubeEmbedUrl(link) {
      const videoId = link.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    return {
      isValidYouTubeLink,
      getYouTubeEmbedUrl,
      sections,
      expandedSections,
      toggleSection,
    };
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
