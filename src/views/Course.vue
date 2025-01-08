<template>
  <div class="flex justify-center items-center py-10">
    <div class="flex w-full max-w-6xl ">
      <div class="w-1/4 p-4 border-r">
        <h2 class="text-lg font-bold mb-4">Filter by Courses</h2>

        <form>
          <ul class="space-y-2">
            <li>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="filter"
                  value="frontend"
                  v-model="selectedFilter"
                  class="form-radio text-blue-500"
                />
                <span>Frontend</span>
              </label>
            </li>
            <li>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                type="radio"
                  name="filter"
                  value="backend"
                  v-model="selectedFilter"
                  class="form-radio text-blue-500"
                />
                <span>Backend</span>
              </label>
            </li>
            <li>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="filter"
                  value="design"
                  v-model="selectedFilter"
                  class="form-radio text-blue-500"
                />
                <span>Design</span>
              </label>
            </li>
            <li>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="filter"
                  value="marketing"
                  v-model="selectedFilter"
                  class="form-radio text-blue-500"
                />
                <span>Marketing</span>
              </label>
            </li>
            <li>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="filter"
                  value="paid"
                  v-model="selectedFilter"
                  class="form-radio text-blue-500"
                />
                <span>Paid</span>
              </label>
            </li>
            <li>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="filter"
                  value="free"
                  v-model="selectedFilter"
                  class="form-radio text-blue-500"
                />
                <span>Free</span>
              </label>
            </li>
            <li>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="filter"
                  value="all"
                  v-model="selectedFilter"
                  class="form-radio text-blue-500"
                />
                <span>All</span>
              </label>
            </li>
          </ul>
        </form>
      </div>

      <div class="w-3/4 p-4">
        <h2 class="text-lg font-bold mb-4">Courses</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white rounded-lg shadow-lg p-8" v-for="section in filteredSection"
          :key="section.id">
              <div class="relative overflow-hidden">
                  
                  <img class="object-cover w-full h-full" :src="'http://localhost:8000/uploads/course/' + section.course_image"  alt="Product">
                  <div class="absolute inset-0 bg-black opacity-40"></div>
                  <div class="absolute inset-0 flex items-center justify-center">
                      <router-link to="/coursedetailed" @click="storeSessionId(section.id)" class="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">View Product</router-link>
                    </div>
              </div>
              <div >
                  <h3 class="text-xl font-bold text-gray-900 mt-4">{{ section.name }}</h3>
                  <p class="text-gray-500 text-sm mt-2">Course: {{ section.course_name }}</p>
                  <div class="flex items-center justify-between mt-4">
                      
                      <span class="text-gray-900 font-bold text-lg">Price: {{ section.cost === 0.00 ? "Free" : "$" + section.cost }}</span>
                      <button class="bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Add to Cart</button>
                  </div>
              </div>
              
          </div>
        </div>
        
        <div v-if="filteredSection.length === 0" class="text-center text-gray-500 mt-4">
          No courses available for this filter.
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
      selectedFilter:'all',  // set all courses
    };
  },
  created() {
    this.fetchSection();  
  },
  methods: {
    async fetchSection() {
      try {
        const response = await api.get('/section'); 
        console.log(response);  // Debugging response
        this.sections = response.data.data;  // Update sections with API data
        console.log(this.sections);  // Debugging sections
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    },
    storeSessionId(id) {
      sessionStorage.setItem('sessionID', id);
    }
  },
  computed: {
    // Corrected filtering logic to use sections instead of courses
    filteredSection() {
      switch (this.selectedFilter) {
        case "frontend":
          return this.sections.filter(section => section.name.startsWith('SWD'));
        case "backend":
          return this.sections.filter(section => section.name.startsWith('WAD'));
        case "design":
          return this.sections.filter(section => section.name.startsWith('PUD') || section.name.startsWith('BUD'));
        case "marketing":
          return this.sections.filter(section => section.name.startsWith('DMS'));
        case "free":
          return this.sections.filter(section => section.cost === '0.00');
        case "paid":
          return this.sections.filter(section => section.cost > 0);
        case "all":
        default:
          return this.sections;  // Show all sections if filter is 'all'
      }
    },
  },
};
</script>
