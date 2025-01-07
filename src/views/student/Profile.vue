<template>
  <div class="flex justify-center items-center min-h-screen m-6">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
      <div v-if="studentData">
        <form @submit.prevent="updateStudentDetails" class="space-y-4">
          <div class="flex items-center justify-center space-x-3 mb-5">
            <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">User Profile</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
            <label for="name" class="block text-gray-700 font-medium mb-2">Name:</label>
            <input
              type="text"
              id="name"
              v-model="studentData.name"
              class="w-full p-2 border border-gray-300 rounded"
            />
            </div>
            <div>
              <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
              <input
                type="email"
                id="email"
                v-model="studentData.email"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label for="gender" class="block text-gray-700 font-medium mb-2">Gender:</label>
              <select
                id="gender"
                v-model="studentData.gender"
                class="w-full p-2 border border-gray-300 rounded"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label for="date_of_birth" class="block text-gray-700 font-medium mb-2">Date of Birth:</label>
              <input
                type="date"
                id="date_of_birth"
                v-model="studentData.date_of_birth"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
            <label for="phone_number" class="block text-gray-700 font-medium mb-2">Phone Number:</label>
            <input
              type="text"
              id="phone_number"
              v-model="studentData.phone_number"
              class="w-full p-2 border border-gray-300 rounded"
            />
            </div>
            <div>
              <label for="address" class="block text-gray-700 font-medium mb-2">Address:</label>
              <input
                type="text"
                id="address"
                v-model="studentData.address"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
            <label for="guardian_name" class="block text-gray-700 font-medium mb-2">Guardian Name:</label>
            <input
              type="text"
              id="guardian_name"
              v-model="studentData.guardian_name"
              class="w-full p-2 border border-gray-300 rounded"
            />
            </div>
            <div>
              <label for="guardian_contact" class="block text-gray-700 font-medium mb-2">Guardian Contact:</label>
              <input
                type="text"
                id="guardian_contact"
                v-model="studentData.guardian_contact"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div> 
          <button
            type="submit"
            class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded"
          >
            Update Profile
          </button>
          <button
             @click="deleteStudent(studentData.student_id)"
            class="w-full bg-red-600 hover:bg-red-500 text-white font-medium py-2 rounded"
          >
            Delete account
          </button>
        </form>
      </div>
      <!-- Show loading if data is not available -->
      <div v-else class="text-center text-gray-600">
        <p>Loading student data...</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/api'; 
import { ref } from 'vue';
import { useNotification } from "@kyvg/vue3-notification"

export default {
  data() {
    const studentData = ref(null); 
    return {
      studentData,
    };
  },
  mounted() {
    console.log("Component has been mounted!");
    this.getStudentDetails(); 
  },
  methods: {
    async getStudentDetails() {
      try {
        const student = JSON.parse(localStorage.getItem('login_student')); 
        if (!student) {
          alert('No student found in localStorage!');
          return;
        }
        const response = await api.get(`/student/${student.student_id}`); // Make API call to fetch student data
        this.studentData = response.data.data; // Update studentData with the response
      } 
      catch (error) 
      {
        console.error('Failed to get student details:', error);
        alert('Failed to get student details!');
      }
    },

    // Handles the update of student details
    async updateStudentDetails() {
      try {
        const student = JSON.parse(localStorage.getItem('login_student'));
        if (!student) {
          this.$notify(
            {
              text:'No student found in localStorage!',
              type: 'error',

            }
          )
          return;
        }
        const response = await api.put(`/student/update/${student.student_id}`, this.studentData);
        console.log(response);
        if(response.data.status == 200)
        {
          console.log(response.data.status);
          this.$notify(
            {
              text:'User data is updated',
              type: 'success',

            }
          );
          this.$notify.close();
          this.getStudentDetails(); // Refresh the data after update
          this.$router.push('/student');

        }
        } 
        catch (error) 
        {
          if (error?.status == 400) 
          {
            this.$notify(
              {
                text:error.response.data.message,
                type: 'error'
              }
            );
          this.$notify.close()
          } 
          else if(error?.status == 403) 
          {
            this.$notify(
              {
                text:error.response.data.message,
                type: 'error'
              }
            );
          this.$notify.close()
          } 
          else 
          {
            this.$notify(
              {
                text:'Error during update',
                type: 'error',

              }
            );
            this.$notify.close()
          }
           
        }
    },
    async deleteStudent(student_id)
    {
      console.log(student_id);
      try{
          const response = await api.delete(`/student/delete/${student_id}`);
          console.log(response);
        if(response.data.status == 204)
        {
          console.log("I am here");
          console.log(response.data.status);
          this.$notify(
            {
              text:'User data is deleted',
              type: 'success',

            }
          );
          this.$notify.close();
          this.$router.push('/register');
        }
        } 
        catch (error) 
        {
          console.log(error);
            this.$notify(
              {
                text:'Error during update',
                type: 'error',

              }
            );
            this.$notify.close()
        }
    }
  },
};
</script>
