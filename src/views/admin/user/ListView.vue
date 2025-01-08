<template>
    <div class="flex flex-col m-12">
        <div class=" overflow-x-auto">
          <div class="min-w-full inline-block align-middle">
            <div class="relative  text-gray-500 focus-within:text-gray-900 mb-4">
              <div class="">
                  <h1 class="text-3xl font-semibold text-gray-800">Students</h1>
              </div>
                <div class="flex items-center justify-between bg-gray-100 py-4 px-6 rounded-md shadow-sm ">
                  <div>
                    <h4 class="text-2xl font-semibold text-gray-800">Student List</h4>
                    <p class="text-sm text-gray-500">Manage your student content here.</p>
                  </div>
                 
                </div>
            </div>
              <div class="overflow-hidden ">
                  <div v-if="!userData.length === 0">
                    <p class="text-red-500">No data available or error fetching data.</p>
                  </div>
                  <table class=" min-w-full rounded-xl">
                      <thead>
                          <tr class="bg-gray-50">
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> ID </th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Name </th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize rounded-t-xl"> Email </th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">NRC</th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Phone Number</th>
                              <th scope="col" class="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize">Address</th>
                          </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-300" v-for="data in userData" :key="data.id">
                          <tr class="bg-white transition-all duration-500 hover:bg-gray-50">
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{{ data.student_id }}</td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{{ data.name }}</td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 ">{{ data.email }}</td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {{ data.nrc_id }} </td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {{ data.phone_number }}</td>
                              <td class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"> {{ data.address }}</td>

                              
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
        </div>
    </div>
  </template>
  <script>
  import api from '@/services/api';
  import { ref, onMounted } from 'vue';
  import { useNotification } from "@kyvg/vue3-notification"
  
  export default {
    
    setup() {
      const notification = useNotification()
      const userData = ref([]); 
      const fetchUserData = async () => {
        try {
          const response = await api.get(`/student`);
          if(response && response.data)
        {
            userData.value = response.data.data; 
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
        fetchUserData(); // Call fetch function when component mounts
      });
  
      return {
        userData,
      };
    },
  };
  </script>