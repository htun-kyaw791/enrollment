<template>
  <div v-if="course">
    <h2 class="text-xl font-bold">{{ course.name }}</h2>
    <p class="text-sm text-gray-500">{{ course.description }}</p>
    <div class="mt-4">
      <p class="font-bold">Price: {{ course.price === 0 ? 'Free' : '$' + course.price }}</p>
      <img :src="course.image_url" alt="Course Image" class="mt-4 w-full max-w-md">
    </div>
  </div>
  <div v-else>
    <p>Loading course details...</p>
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
        course.value = response.data; // Store the retrieved data in the course ref
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
