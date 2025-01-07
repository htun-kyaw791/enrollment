<template>
    <div class="flex flex-col m-12">
        <div class=" overflow-x-auto">
          <div class="min-w-full inline-block align-middle">
            <div class="relative  text-gray-500 focus-within:text-gray-900 mb-4">
              <div class="">
                  <h1 class="text-3xl font-semibold text-gray-800">Classes</h1>
              </div>
                <div class="flex items-center justify-between bg-gray-100 py-4 px-6 rounded-md shadow-sm ">
                  <div>
                    <h4 class="text-2xl font-semibold text-gray-800">Serivce List</h4>
                    <p class="text-sm text-gray-500">Manage your service content here.</p>
                  </div>
                 
                </div>
            </div>
              <div class="overflow-hidden ">
                  <div v-if="!classData.length === 0">
                    <p class="text-red-500">No data available or error fetching data.</p>
                  </div>
                  <table class=" min-w-full rounded-xl">
                      <thead>
                          <tr class="bg-gray-50">
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> SubjectID </th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Subject Name </th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Course ID </th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Course name</th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Teacher_id</th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Teacher_name</th>
                          </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-300" v-for="data in classData" :key="data.user_id">
                          <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{{ data.id }}</td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{{ data.name }}</td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{{ data.course_id }}</td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {{ data.course_name }} </td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {{ data.teacher_id }}</td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {{ data.teacher_name }}</td>

                              
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
    </div>
    <pre>
        {{ classData }}
    </pre>
  </template>
  <script>
  import api from '@/services/api';
  import { ref, onMounted } from 'vue';
  import { useNotification } from "@kyvg/vue3-notification"
  
  export default {
    
    setup() {
      const notification = useNotification()
      const classData = ref([]); 
      const fetchclassData = async () => {
        try 
        {
            const loginUser = JSON.parse(localStorage.getItem('login_user'));
            if (!loginUser) {
            $notify({
                text: 'No teacher found in localStorage!',
                type: 'fail',
            });
            return;
            }
            console.log(loginUser.id);
          const response = await api.get(`/subject-teacher/${loginUser.id}`);
          if(response && response.data)
        {
            console.log("I am here");
            classData.value = response.data.data; 
            console.log(response.data);
            console.log(response.data.data);
            console.log(classData.value.id);
            console.log(classData.value.name);

        }
        else
        {
            notification.notify(
              {
                text:'Response does not contain data property',
                type: 'error'
              }
            );
            notification.notify.close()
        }
        } 
        catch (error) 
        {
            notification.notify(
              {
                text:'Error fetching data:',
                type: 'error'
              }
            );
            notification.notify.close()
        }
      };
      
        
      onMounted(() => {
        fetchclassData(); // Call fetch function when component mounts
      });
  
      return {
        classData,
      };
    },
  };
  </script>