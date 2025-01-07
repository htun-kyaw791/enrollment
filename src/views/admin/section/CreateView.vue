<template>
  <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
    <div class="m-20 max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
      <form @submit.prevent="handleSection" class="space-y-6">
        <div class="flex items-center justify-center space-x-3 mb-5">
            <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">Section Form</h2>
        </div>
        <div>
          <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>
          <div class="mt-2">
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="S2021Set"
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
                v-model="start_date"
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
                v-model="end_date"
                type="date"
                required
                class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
        </div>
        <div>
            <label for="cost" class="block text-md/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
              <input
                id="cost"
                v-model="cost"
                type="text"
                placeholder="75000"
                required
                class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
        </div>
        <div>
          <label for="course" class="block text-md/6 font-medium text-gray-900">Course Name</label>
          <div class="mt-2">
              <select v-model="course" id="course" class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6">
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
            Create
          </button>
        </div>
      </form>
      
    </div>
    
  </div>
</template>

<script>
import api from '@/services/api';
import router from '@/router';
import { useNotification } from "@kyvg/vue3-notification"

export default {
  data() {
    return {
      course: null,
      courses: [],
      name: '',
      start_date: '',
      end_date: '',
      cost: '',
    };
  },
  created() {
  this.fetchSection(); 
},
  methods: {
      async fetchSection() {
    try {
      const response = await api.get('/course'); 
      this.courses = response.data.data; 
    } catch (error) {
      console.error('Error fetching section:', error);
    }
  },

    async handleSection() {
      try {
        const response = await api.post('/section/create', {
          'name': this.name,
          'start_date': this.start_date,
          'end_date': this.end_date,
          'cost': this.cost,
          'course_ids': this.course,
        });
        console.log(response);
        if(response.data.status == 201){
          console.log(response.data.data.status);
          this.$notify(
            {
              text:'Section is created',
              type: 'success',

            }
          );
          this.$notify.close();
          router.push('/admin/section')

        }
      } 
      catch (error) 
      {
        if(error?.status == 400)
        {
          this.$notify(
          {
            text:error.response.data.message,
            type: 'error',
    
          })
          this.$notify.close();
        }
        else
        {
          this.$notify(
          {
              text:'Error during create',
              type: 'error',
    
          })
          this.$notify.close();

        }
      }
    },
  },
};
</script>