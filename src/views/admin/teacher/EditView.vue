<template>
  <div class="flex justify-center items-center min-h-screen m-6">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
      <div v-if="teacher">
        <form @submit.prevent="updateTeacherDetails" class="space-y-4">
            <div class="flex items-center justify-center space-x-3 mb-5">
              <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
              <h2 class="text-2xl font-bold tracking-tight text-gray-700">Teacher Profile</h2>
            </div>
            <div>
            <label for="name" class="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              id="name"
              v-model="teacher.name"
              class="w-full p-2 border border-gray-300 rounded"
            />
            </div>
            <div>
              <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
              <input
                type="email"
                id="email"
                v-model="teacher.email"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded">
             Update
            </button>
        </form>
      </div>
      <!-- Show loading if data is not available -->
      <div v-else class="text-center text-gray-600">
        <p>Loading student data...</p>
      </div>
    </div>
  </div>
  <pre>{{ teacher }}</pre>
</template>

<script>
import api from '@/services/api'; 
import { onMounted, ref } from 'vue';
import { useNotification } from "@kyvg/vue3-notification"

  export default {
  setup() {
      const teacher = ref({
        id: '',
        name: '',
        email:'',
        password:'',

    }); 
    const notification = useNotification();  
      const fetchTeacherData = async () => {
        const id = sessionStorage.getItem('sessionID');
        if (!id) 
        {
          notification.notify({
          text: 'No session ID found',
          type: 'error',
          });
          return;
        }
        try 
        {
          const response = await api.get(`/teacher/${id}`);
          teacher.value= response.data.data;
          console.log(response.data.data);
      } 
      catch (error) 
      {
          notification.notify({
          text: 'Failed to get teacher details',
          type: 'error',
          });
      }
      };

      async function updateTeacherDetails() {
      try {
       
        console.log(teacher.value.name);
        console.log(teacher.value.email);
        console.log("I am here");
        const response = await api.put(`/teacher/update/${teacher.value.id}`, 
        { 
          name: teacher.value.name,
          email: teacher.value.email,
          password:'',
        });
        console.log(response);
        console.log(response.data);
        console.log(response.data.status);
        if(response.data.status == '200'){

          notification.notify(
            {
              text:'teacher is updated',
              type: 'success'
            }
          );
          notification.notify.close()
          this.fetchTeacherData(); // Refresh the data after update

        }
      } 
      catch (error) 
      {
        if(error?.status == 400)
        {
          notification.notify(
          {
            text:error.response.data.message,
            type: 'error',
    
          })
          notification.notify.close();
        }
        else
        {
          notification.notify(
          {
              text:'Error during update ',
              type: 'error',
    
          })
          notification.notify.close();

        }
      }
      };
      onMounted(() => {
      fetchTeacherData(); 
      });

      return {
        teacher,
        fetchTeacherData,
        updateTeacherDetails,
      };
  },
  };
</script>

