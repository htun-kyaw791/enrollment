<template>
    <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
      <div class="m-20 max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <form @submit.prevent="handleTeacher" class="space-y-6">
          <div class="flex items-center justify-center space-x-3 mb-5">
              <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
              <h2 class="text-2xl font-bold tracking-tight text-gray-700">Teacher Form</h2>
          </div>
          <div>
            <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="Thet Htet San"
                required
                class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
          </div>
          <div>
              <label for="email" class="block text-md/6 font-medium text-gray-900">Email</label>
              <div class="mt-2">
                <input
                  id="email"
                  v-model="email"
                  type="text"
                  placeholder="thetsan@gmail.com"
                  required
                  class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
                />
              </div>
          </div>
          <div class="relative">
              <label for="password" class="block text-md/6 font-medium text-gray-900">Password</label>
              <div class="mt-2">
                <input
                  :type="passwordVisible ? 'text' : 'password'" v-model="password" 
                  id="password"
                  placeholder="strong password"
                  required
                  class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
                />
                <button 
                  type="button" 
                  @click="togglePasswordVisibility" 
                  class="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                >
                  <span v-if="passwordVisible">Hide</span>
                  <span v-else>Show</span>
                </button>
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
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password:'',
        passwordVisible: false,
      };
    },
    methods: {
      async handleTeacher() {
        try {
          const response = await api.post('/teacher/create', {
            'name': this.name,
            'email': this.email,
            'password':this.password,
          });
          console.log(response);
          if(response.data.status == 201){
            console.log(response.data.status);
            this.$notify(
              {
                text:'Teacher is created',
                type: 'success',
  
              }
            );
            this.$notify.close();
            this.$router.push('/admin/teacher').then(()=>{window.location.reload()});
  
          }
        } 
        catch (error) 
        {
          if (error?.status== 400) 
          {
            this.$notify(
              {
                text:error.response.data.message,
                type: 'error',
  
              }
            );
            this.$notify.close();
          } else 
          {
            console.log(error);
            this.$notify(
              {
                text:'Error during create',
                type: 'error',
  
              }
            );
            this.$notify.close()
          }
         
        }
      },
      togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
    },
  };
  </script>