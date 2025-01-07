<template>
    <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
      <div v-if="enrollmentData" class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <form @submit.prevent="updateEnrollment" class="space-y-6">
          <div class="flex items-center justify-center space-x-3 mb-5">
              <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
              <h2 class="text-2xl font-bold tracking-tight text-gray-700">Enrollment Form</h2>
            </div>
            <div>
              <label for="student" class="block text-md/6 font-medium text-gray-900">Student Name</label>
              <div class="mt-2">
                <select v-model="enrollmentData.student_id" id="student" class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6">
                    <option v-for="student in students" :key="student.student_id" :value="student.student_id">
                        {{ student.name }}
                    </option>
                </select>
              </div>
          </div>
          <div>
              <label for="section" class="block text-md/6 font-medium text-gray-900">Section Name</label>
              <div class="mt-2">
                <select v-model="enrollmentData.section_id" id="section" class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6">
                    <option v-for="section in sections" :key="section.id" :value="section.id">
                        {{ section.name }}
                    </option>
                </select>
                <!-- <div v-if="enrollmentData.section_id">Selected Student ID: {{ enrollmentData.section_id }}</div> -->
              </div>
          </div>
          <div>
            <label for="amount" class="block text-md/6 font-medium text-gray-900">Amount</label>
            <div class="mt-2">
              <input
                id="amount"
                v-model="enrollmentData.amount"
                type="text"
                class="block w-full h-12 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
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
    <pre>
        {{ enrollmentData }}
    </pre>
  </template>
  
  <script>
    import api from '@/services/api';
    import { ref, onMounted } from 'vue';
    import router from '@/router';
    import { useNotification } from "@kyvg/vue3-notification"
  
    export default {
    setup() {
      const enrollmentData = ref({
          student_id:'',
          section_id:'',
          amount:'', 
      }); 
      const students = ref([{}]);
      const sections = ref([{}]);
      const notification = useNotification();
      const fetchEnrollmentData = async () => {
        try {
            const id = sessionStorage.getItem('sessionID');
            console.log(id);                  

            const studentData = await api.get(`/student`);
            students.value = studentData.data.data;
            console.log("Student lists", students.value);

            const sectionData = await api.get(`/section`);
            sections.value = sectionData.data.data;
            console.log("Section lists", sections.value);

            
            console.log("I am here");
            const response = await api.get(`/enrollment/${id}`);
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.data);
            // console.log(response.data.status);
            enrollmentData.value = response.data.data[0];
            // console.log(response.data.data[0]);
            // console.log(enrollmentData.data.data[0].amount);
        }
        catch (error) 
        {
            notification.notify(
            {
                text:'Error fetching data:',
                type: 'fail'
            });
            notification.notify.close()
        }
        
      };
 
      async function updateEnrollment() {
        try {
          const id = sessionStorage.getItem('sessionID');
        if (!id) {
            throw new Error('Session ID is missing');
        }
        if (!enrollmentData.value.student_id ) 
        {
            console.error("Missing student_id");
            return;  // Optionally show an error message
        }
        const response = await api.post('/enrollment/update/' + id, {
            student_id: enrollmentData.value.student_id,
            section_id: enrollmentData.value.section_id,
            amount: enrollmentData.value.amount,
        });
          console.log(response);
          console.log(response.data);
          if(response.data.status == '200'){
  
            notification.notify(
              {
                text:'Enrollment is updated',
                type: 'success'
              }
            );
            notification.notify.close()
  
            router.push('/admin/enrollment')
  
          }
        } catch (error) 
        {
          if (error?.status == 400) 
          {
            notification.notify(
              {
                text:error.response.data.message,
                type: 'error'
              }
            );
          notification.notify.close()
          } 
          else if(error?.status == 403) 
          {
            notification.notify(
              {
                text:error.response.data.message,
                type: 'error'
              }
            );
          notification.notify.close()
          } 
          else 
          {
            notification.notify(
              {
                text:'Error during update ',
                type: 'error'
              }
            );
          notification.notify.close()
          }
           
  
        }
      };
       onMounted(() => 
       {
        fetchEnrollmentData();
      });
  
      return {
        enrollmentData,
        updateEnrollment,
        students,
        sections,
      };
    },
  };
  </script>