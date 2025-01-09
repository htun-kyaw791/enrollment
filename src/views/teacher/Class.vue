<template>
  <div class="mx-10 sm:mx-20 my-10 py-8">
    <h1 class="text-2xl font-bold mb-6">Student Report</h1>

    <div v-if="sections.length === 0" class="text-center text-gray-500">
      <p>No data available. It seems no students are enrolled in your sections yet.</p>
    </div>

    <div v-else>
      <div v-for="section in sections" :key="section.id" class="section-card border rounded-lg mb-6">
        <!-- Section Header -->
        <div class="section-header bg-gray-100 px-4 py-2 flex justify-between items-center cursor-pointer" @click="toggleSection(section.id)">
          <h2 class="text-lg font-semibold">{{ section.name }} ({{ section.students.length }} Students)</h2>
          <span :class="{'rotate-180': expandedSections.includes(section.id)}" class="transition-transform">
            ▼
          </span>
        </div>

        <!-- Section Details -->
        <div v-if="expandedSections.includes(section.id)" class="section-details px-4 py-2">
          <div v-for="student in section.students" :key="student.id" class="student-card my-4 p-4 bg-gray-50 border rounded-lg">
            <h3 class="text-md font-bold">{{ student.name }} (ID: {{ student.id }})</h3>
            <p class="text-sm text-gray-600">Email: {{ student.email }}</p>

            <!-- Student Courses -->
            <div v-for="course in student.courses" :key="course.id" class="course-card my-3 pl-4">
              <h4 class="text-md font-semibold">Course: {{ course.name }}</h4>

              <!-- Course Chapters -->
              <ul>
                <li v-for="chapter in course.chapters" :key="chapter.id" class="chapter-item text-gray-700">
                  {{ chapter.name }} ({{ chapter.content }})
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

export default {
  setup() {
    const sections = ref([]); // Holds the teacher's sections with students' data
    const expandedSections = ref([]); // Tracks which sections are expanded

    const fetchTeacherReport = async () => {
      try {
        const teacher = JSON.parse(localStorage.getItem('login_user')); 
        const response = await api.get('/teacher-student-report/'+teacher.id); // API endpoint
        sections.value = response.data.data;
      } catch (error) {
        console.error('Error fetching report data:', error);
      }
    };

    const toggleSection = (sectionId) => {
      const index = expandedSections.value.indexOf(sectionId);
      if (index > -1) {
        expandedSections.value.splice(index, 1); // Collapse section
      } else {
        expandedSections.value.push(sectionId); // Expand section
      }
    };

    onMounted(fetchTeacherReport);

    return {
      sections,
      expandedSections,
      toggleSection,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
.section-card {
  border: 1px solid #e2e8f0;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.student-card {
  background-color: #f7fafc;
}
.chapter-item {
  margin-left: 1rem;
}
</style>
