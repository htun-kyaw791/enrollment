<template>
    <div class="flex justify-center items-center py-10">
      <div class="flex flex-col w-full max-w-6xl space-y-6">
        <div v-if="teacherData.length === 0" class="text-center">
          <p class="text-red-500 text-lg font-semibold">
            No data available or error fetching data.
          </p>
        </div>
        <div v-else>
          <div v-for="teacher in teacherData" :key="teacher.id" class="bg-white rounded-lg mb-6 shadow-md p-5">
            <!-- Teacher Info -->
            <div class="flex justify-between items-center border-b pb-3 mb-3">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ teacher.name }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ teacher.email }}
              </p>
            </div>
            <!-- Course List -->
            <div>
              <h4 class="text-md font-medium text-gray-700 mb-2">Courses:</h4>
              <div v-if="teacher.courses.length > 0">
                <ul class="space-y-2">
                  <li v-for="course in teacher.courses" :key="course.id" class="bg-gray-100 rounded-md p-3">
                    <h5 class="text-gray-800 font-semibold">
                      {{ course.name }}
                    </h5>
                    <p class="text-sm text-gray-600">
                      {{ course.description }}
                    </p>
                  </li>
                </ul>
              </div>
              <!-- If No Courses -->
              <div v-else>
                <p class="text-sm text-gray-500 italic">No courses assigned.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  import { ref, onMounted } from 'vue';
  import { useNotification } from "@kyvg/vue3-notification";
  
  export default {
    setup() {
      const notification = useNotification();
      const teacherData = ref([]);
  
      const fetchTeacherData = async () => {
        try {
          const response = await api.get(`/teacher-with-courses`);
          if (response && response.data) {
            teacherData.value = response.data.data;
          } else {
            notification.notify({
              text: 'Response does not contain data property',
              type: 'error',
            });
          }
        } catch (error) {
          notification.notify({
            text: 'Error fetching data: ' + error.message,
            type: 'error',
          });
        }
      };
  
      onMounted(() => {
        fetchTeacherData();
      });
  
      return {
        teacherData,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  