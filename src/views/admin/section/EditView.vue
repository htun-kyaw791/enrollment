<template>
  <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
    <div v-if="sectionData" class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
      <form @submit.prevent="updateSection" class="space-y-6">
        <div class="flex items-center justify-center space-x-3 mb-5">
          <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
          <h2 class="text-2xl font-bold tracking-tight text-gray-700">Section Edit Form</h2>
        </div>
        <div>
          <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>
          <div class="mt-2">
            <input
              id="name"
              v-model="sectionData.name"
              type="text"
              required
              class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
            />
          </div>
        </div>
        <div>
          <label for="start_date" class="block text-md/6 font-medium text-gray-900">Start Date</label>
          <div class="mt-2">
            <input
              id="start_date"
              v-model="sectionData.start_date"
              type="date"
              required
              class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
            />
          </div>
        </div>
        <div>
          <label for="end_date" class="block text-md/6 font-medium text-gray-900">End Date</label>
          <div class="mt-2">
            <input
              id="end_date"
              v-model="sectionData.end_date"
              type="date"
              required
              class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
            />
          </div>
        </div>
        <div>
          <label for="cost" class="block text-md/6 font-medium text-gray-900">Cost</label>
          <div class="mt-2">
            <input
              id="cost"
              v-model="sectionData.cost"
              type="text"
              required
              class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
            />
          </div>
        </div>
        <div>
          <label for="course" class="block text-md/6 font-medium text-gray-900">Course Name</label>
          <div class="mt-2">
            <v-select
              v-model="sectionData.course_ids"
              multiple
              :options="courses"
              :loading="courses.length === 0"
              label="name"
              return-object
              filled
              :closeOnSelect="false"
              :selectable="(option) => !sectionData.course_ids.some((x) => x.id === option.id)"
            >
              <template #option="{ name, description }">
                <div>
                  <div class="font-semibold">{{ name }}</div>
                 
                  <div class="text-gray-500 text-sm">{{ description.slice(0, 50) + '...' || 'No description' }}</div>
                </div>
              </template>
              <template #selected-option="{ name }">
                <div class="flex items-center space-x-2">
                  <span>{{ name }}</span>
                </div>
              </template>
            </v-select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sdm/6 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useNotification } from "@kyvg/vue3-notification";

export default {
  components: { vSelect },
  setup() {
    const sectionData = ref({
      name: '',
      start_date: '',
      end_date: '',
      cost: '',
      course_ids: [],
    });
    const router = useRouter();
    const courses = ref([]);
    const notification = useNotification();

    const fetchCourses = async () => {
      try {
        const response = await api.get('/course');
        courses.value = response.data.data;
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchSectionData = async () => {
      const id = sessionStorage.getItem('sessionID');
      if (!id) {
        console.error('No session ID found');
        return;
      }
      try {
        const response = await api.get(`/section/${id}`);
        sectionData.value = { ...response.data.data, course_ids: response.data.data.courses || [] };
        console.log(sectionData.value);
      } catch (error) {
        console.error('Error fetching section data:', error);
      }
    };

    const updateSection = async () => {
      try {
        if(sectionData.value.course_ids.length == 0){
          notification.notify({
            text: 'Please select at least one course',
            type: 'error',
          });
          notification.notify.close();
          return;
        }

        const id = sessionStorage.getItem('sessionID');
        const response = await api.post(`/section/update/${id}`, {
          name: sectionData.value.name,
          start_date: sectionData.value.start_date,
          end_date: sectionData.value.end_date,
          cost: sectionData.value.cost,
          course_ids: JSON.stringify(sectionData.value.course_ids.map((item) => item.id)),
        });

        if (response.data.status == '200') {
          notification.notify({
            text: 'Section updated successfully',
            type: 'success',
          });
          console.log('push');
          router.push('/admin/section');
        }
      } catch (error) {
        notification.notify({
          text: error.response?.data?.message || 'Error during update',
          type: 'error',
        });
      }
    };

    onMounted(() => {
      fetchSectionData();
      fetchCourses();
    });

    return {
      sectionData,
      updateSection,
      courses,
    };
  },
};
</script>
