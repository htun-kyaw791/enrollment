<template>
    <div class="flex justify-center items-center py-10">
      <div class="flex flex-col w-full max-w-6xl ">
        <div v-if="course">
          
          <div class="mb-4">
            <img :src="'http://localhost:8000/uploads/course/' + course.image" alt="Course Image" class="w-full h-auto">
          </div>
          <h2 class="text-2xl font-bold">{{ course.name }} </h2>
          <p class="text-lg text-gray-900 mt-2">Teacher : {{ course.teacher_name }}</p>
          <p class="text-md text-gray-700 mt-2">{{ course.description }}</p>

        </div>
        <div v-else>
          <p>Loading course details...</p>
        </div>
      </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/services/api'; // Assuming you have a service to handle API requests

export default {
  setup() {
    const course = ref(null); // Holds the course data
    const courseId = sessionStorage.getItem('courseId'); // Retrieve courseId from sessionStorage

    const fetchCourseData = async () => {
      if (!courseId) {
        console.error("No course ID found in session storage.");
        return;
      }

      try {
        // Make GET request to your API using the course ID
        const response = await api.get(`/course/${courseId}`);
        course.value = response.data.data; // Store the retrieved data in the course ref
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    // Fetch course data when the component is mounted
    onMounted(fetchCourseData);

    return {
      course
    };
  }
};
</script>

<style scoped>
/* Add any additional styles you need */
</style>
