

<script setup>
</script>
<template>

    <div class="bg-white">
    <div class="relative isolate">
      <div class="mx-auto max-w-2xl py-22 sm:py-48 lg:py-42">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div class="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of education. 
            
          </div>
        </div>
        <div class="text-center">
          <h1 class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Elevate Your Skills with Online Courses</h1>
          <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">Learn at your own pace with expert-led courses. Enhance your knowledge and achieve your goals with ease!</p>
          <div class="mt-10 flex items-center justify-center gap-x-6"  v-if="!userRole">
            <RouterLink to="/Register" class="text-white  bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800">
              Register
            </RouterLink>
            <RouterLink to="/Login" class="text-white  bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800">
              Log in
            </RouterLink>

          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
export default 
{
  data() 
  {
    return {
      open: false
    };
  },
  computed: {
    userRole() {
      return localStorage.getItem("role");
    },
    
  },
  methods: 
  {
  	toggle() 
    {
    	this.open = !this.open;
    },
    getParth(){
      if(this.userRole === 'admin'){
        return '/admin';
      }else if(this.userRole === 'student'){
        return '/student';
      }else if(this.userRole === 'teacher'){
        return '/teacher';
      }else{
        return '/home';
      }
    }
  }
};
</script>