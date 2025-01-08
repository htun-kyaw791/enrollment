<template>

  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-5xl bg-white rounded-lg shadow-lg flex flex-col md:flex-row h-[500px]">
      <div class="w-full md:w-1/2 p-8 flex items-center justify-center">
        <div class="w-full max-w-sm">
          <div class="flex items-center justify-center space-x-3 mb-5">
            <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">Login Form</h2>
          </div>
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="block text-md/6 font-medium text-gray-900">Email</label>
              <div class="mt-2">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="thetmon@gmail.com"
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
            <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label for="remember-me" class="ml-3 block text-md text-gray-800">
              I accept the
              <a
                href="TermsandConditions.php"
                class="text-emerald-600 font-semibold hover:underline ml-1"
                target="_blank"
                >Terms and Conditions</a
              >
            </label>
            </div>
            <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-md/6 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              Login
            </button>
          </div>
          <div class="flex justify-center items-center text-center">
            <label class="ml-3 block text-md text-gray-800">
              <RouterLink
                to="/register"
                class="text-emerald-600 font-semibold hover:underline ml-1"
              >
                Create an account?
              </RouterLink>
            </label>
          </div>

          </form>
        </div>
      </div>

      <!-- Right side (Image) -->
      <div class="hidden md:block w-1/2 h-full">
        <img 
          src="https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="login image" 
          class="w-full h-full object-cover rounded-r-lg"
        />
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
      return {
        email: '',
        password: '',
        passwordVisible: false,
        open: false,
      };
    },
    methods: {
      async handleLogin() {
          try {
            const response = await api.post('/auth/login', {
              email: this.email,
              password: this.password,
            });
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('role', response.data.data.user.role);
            localStorage.setItem('login_user', JSON.stringify(response.data.data.user));
            console.log(response);
          if(response.data.status == 200)
          {
            console.log(response.data.status);
            this.$notify(
              {
                text:'Login successful',
                type: 'success',

              }
            );
            this.$notify.close();
          }
            if( response.data.data.user.role == 'student')
            {
              localStorage.setItem('login_student', JSON.stringify(response.data.data.student));
            }
            this.$router.push('/' + response.data.data.user.role).then(()=>{window.location.reload()});
            
          }  
          catch (error) 
          {
            if(error?.status == 401)
            {
              this.$notify(
                    {
                      text:error.response.data.message,
                      type: 'error',
        
                    })
                  // this.$notify.close();
            }
            else
            {
              this.$notify(
              {
                  text:'Fail to log in account',
                  type: 'error',
        
              })
              this.$notify.close();

            }
          }
        },
        toggle() 
      {
        this.open = !this.open;
      }
    }
  };
</script>