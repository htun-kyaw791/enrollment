<template>
    <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
      <div v-if="subjectData" class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <form @submit.prevent="updateSubject" class="space-y-6">
          <div class="flex items-center justify-center space-x-3 mb-5">
            <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">Subject Update Form</h2>
          </div>
          <div>
            <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
              <textarea id="name"
                v-model="subjectData.name"
                type="text"
                required
                class="block w-full h-32 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"></textarea>
            </div>
          </div>
          <div>
              <label for="course" class="block text-md/6 font-medium text-gray-900">Course Name</label>
              <div class="mt-2">
                  <select v-model="subjectData.course_id" id="course" class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6">
                    <option v-for="type in courses" :key="type.id" :value="type.id">
                          {{ type.name }}
                      </option>
                  </select>
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
    import { ref, onMounted } from 'vue';
    import router from '@/router';
    import { useNotification } from "@kyvg/vue3-notification"
  
    export default {
    setup() {
      const subjectData = ref({
          name: '', 
      }); 
      const courses = ref([]);
      const course = ref(null);
      const notification = useNotification()
      const fetchCourse = async () => {
        try {
          const response = await api.get('/course'); 
          courses.value = response.data.data;  
        } catch (error) {
          console.error('Error fetching course types:', error);
        }
      };
        const fetchsubjectData = async () => {
        const id = sessionStorage.getItem('sessionID');
        if (!id) {
        console.error('No session ID found');
        return;
        }
        try 
        {
          const response = await api.get(`/subject/${id}`);
          subjectData.value = response.data.data; //prefill form data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
  
      async function updateSubject() {
        try {
          const id = sessionStorage.getItem('sessionID');
          const response = await api.post('/subject/update/'+id, {
            'name': subjectData.value.name,
            'course_id' : subjectData.value.course_id,
          });
  
          if(response.data.status == '200'){
  
            notification.notify(
              {
                text:'Course is updated',
                type: 'success'
              }
            );
            notification.notify.close()
  
            router.push('/admin/subject')
  
          }
        } 
        catch (error) {
          if(error?.status == 400)
        {
          notification.notify
          ({
              text:error.response.data.message,
              type: 'error',
    
          })
              notification.notify.close();
        }
        else
        {
          notification.notify(
          {
              text:'Fail to update subject',
              type: 'error',
    
          })
          notification.notify.close();

        }
  
        }
      };
       onMounted(() => {
        fetchsubjectData();
        fetchCourse();
      });
  
      return {
        subjectData,
        updateSubject,
        fetchCourse,
        courses,
        course
      };
    },
  };
  </script>