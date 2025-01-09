<template>
  <div class="flex justify-center items-center min-h-screen m-16">
    <div class="w-full max-w-3xl bg-white rounded-lg shadow-md p-12">
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div class="flex items-center justify-center space-x-3 mb-5">
            <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">Register Form</h2>
          </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
          <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>
          <div class="mt-2">
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="ThetMon"
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
              name="email"
              placeholder="thetmon@gmail.com"
              required
              class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
            />
          </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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
            <label for="nrc" class="block text-md/6 font-medium text-gray-900">National Registration Card</label>
            <div class="mt-2">
              <input
                id="nrc"
                v-model="nrc_id"
                type="text"
                name="nrc_id"
                placeholder="8/MATHANA(N)000987"
                required
                class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
          <label for="dob" class="block text-md/6 font-medium text-gray-900">Date of Birth</label>
          <div class="mt-2">
            <input
              id="dob"
              v-model="date_of_birth"
              type="date"
              name="date_of_birth"
              required
              class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
            />
          </div>
          </div>
          <div>
            <label class="block text-md/6 font-medium text-gray-900">Gender</label>
            <div class="mt-2">
              <input type="radio" id="male" value="Male" v-model="gender" name="gender"  class="m-2" required/>
              <label for="male">Male</label>
              <input type="radio" id="female" value="Female" v-model="gender" name="gender" class="m-2" required/>
              <label for="female">Female</label>
            
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
          <label for="phno" class="block text-md/6 font-medium text-gray-900">Phone Number</label>
          <div class="mt-2">
            <input
              id="phno"
              v-model="phone_number"
              name="phone_number"
              type="text"
              placeholder="09440226806"
              required
              class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
            />
          </div>
          </div>
          <div>
            <label for="address" class="block text-md/6 font-medium text-gray-900">Address</label>
            <div class="mt-2">
              <textarea id="address"
                v-model="address"
                type="text"
                name="address"
                placeholder="No(121), ThuKha Street, Yangon"
                required
                class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"></textarea>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
          <div>
          <label for="username" class="block text-md/6 font-medium text-gray-900">Guardian_name</label>
          <div class="mt-2">
            <textarea id="username"
              v-model="guardian_name"
              type="text"
              name="guardian_name"
              placeholder="ThetMon186"
              required
              class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"></textarea>
          </div>
        </div>
        <div>
          <label for="contact" class="block text-md/6 font-medium text-gray-900">Guardian_contact</label>
          <div class="mt-2">
            <textarea id="contact"
              v-model="guardian_contact"
              type="text"
              name="guardian_contact"
              placeholder="09675432097"
              required
              class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"></textarea>
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

        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-md/6 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Register
          </button>
        </div>
        <div class="flex justify-center items-center text-center">
          <label class="ml-3 block text-md text-gray-800">
            <RouterLink
              to="/login"
              class="text-emerald-600 font-semibold hover:underline ml-1"
            >
              Already have an account?
            </RouterLink>
          </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/services/api';
import { useNotification } from "@kyvg/vue3-notification"
export default {
  data() {
    return {
      name:'',
      email: '',
      password: "",
      passwordVisible: false,
      nrc_id: '',
      date_of_birth: '',
      gender: '',
      phone_number: '',
      address: '',
      guardian_name: '',
      guardian_contact: '',
      open: false,
    
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await api.post('/auth/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          nrc_id: this.nrc_id,
          date_of_birth: this.date_of_birth,
          gender: this.gender,
          phone_number: this.phone_number,
          address: this.address,
          guardian_name: this.guardian_name,
          guardian_contact:this.guardian_contact
        });
         if(response.data.status == '201')
        {
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('role', response.data.data.user.role);
          localStorage.setItem('register_user', response.data.data.user);
            this.$notify(
              {
                text:'Account is successfully created',
                type: 'success',
  
              })
              this.$notify.close();
              this.$router.push('/student').then(()=>{window.location.reload()});
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
              text:'Fail to create account',
              type: 'error',
    
          })
          this.$notify.close();

        }
       
      }
    },
    toggle() 
    {
    	this.open = !this.open;
    },
      togglePasswordVisibility() 
      {
        this.passwordVisible = !this.passwordVisible; 
        // on or off toggle password
      }

  },
};
</script>

