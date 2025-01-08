<template>
     <div class="flex justify-center items-center py-10">
      <!-- {{ sections }} -->
        <div class="flex flex-col w-full max-w-6xl ">
           
            <div v-for="section in sections" :key="section.id" >
              <div class="w-full flex flex-row justify-between ">
                <p class="text-xl">
                  {{ section.name }}
                  <span class="text-md text-gray-600"> ( {{ section.cost == '0.00' ? 'FREE' :  'MMK '+ section.cost}} )</span>
                </p>
                <div class="">
                  <router-link to="/checkout" @click="storeSessionId(section.id)" class="p-2 rounded-md text-white bg-green-600">Enroll</router-link>
                </div>
              </div>
              <div class="mb-6 border-b-2 border-gray-300 pb-1 flex flex-row space-x-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <text x="12" y="17" text-anchor="middle" font-size="9" fill="currentColor">15</text>
                </svg>
                <p>{{ section.start_date }}</p>
                <p>-</p>
                <p>{{ section.end_date }}</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-gray-200 rounded-lg shadow-lg mb-12 p-8" v-for="course in section.courses"
                :key="section.id">
                    <div class="relative overflow-hidden">
                        
                        <img class="rounded-lg object-contain w-full h-40 bg-white" :src="'http://localhost:8000/uploads/course/' + course.image"  alt="Product">
                        
                    </div>
                    <div >
                        <h3 class="text-xl font-bold text-gray-900 mt-4">{{ course.name }}</h3>
                        <p class="text-gray-500 text-sm mt-2"> {{ course.description.length > 150 ? course.description.slice(0,150) + '...' : course.description }}</p>
                        <div class="flex items-center justify-between mt-4">
                            
                        </div>
                    </div>
                    <div class="">
                      <router-link to="/coursedetailed" @click="storeCourseId(course.id)" class="text-sm underline">View Detail</router-link>
                    </div>
                    
                </div>
              </div>
              
            </div>
        </div>
    </div>
    
</template>
<script>
 import api from '@/services/api';
export default {
  data() {
    return {
      sections:[],  
    };
  },
  created() {
    this.fetchSection();  
  },
  methods: {
    async fetchSection() {
      try {
        const response = await api.get('/section'); 
        this.sections = response.data.data; 
        // console.log(this.sections);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    },
    storeCourseId(id) {
      sessionStorage.setItem('courseId', id);
    },
    storeSessionId(id){
      sessionStorage.setItem('session_checkout', id);
    }
  },
  computed: {
    
  },
};
</script>