<template>
    <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
      <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <form @submit.prevent="handleCourse" class="space-y-6">
          <div class="flex items-center justify-center space-x-3 mb-5">
            <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">Course Create Form</h2>
          </div>
          <div>
            <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
              <input
                id="name"
                v-model="name"
                type="text"
                placeholder="PUD Jan 2025"
                required
                class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
          </div>
          <div>
            <label for="img" class="block text-md/6 font-medium text-gray-900">Image</label>
            <div class="mt-2">
              <input
                id="img"
                type="file" accept="image/*" @change="previewImage"
                class="block w-full h-12 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
          </div>
          <div>
            <p>Preview Here:</p>
              <template v-if="preview">
                <img :src="preview" class="img-fluid block w-20" />
                <p class="mb-0">file name: {{ image.name }}</p>
                <p class="mb-0">size: {{ image.size/1024 }}KB</p>
              </template>
          </div>
          <div>
            <label for="name" class="block text-md/6 font-medium text-gray-900">Description</label>
            <div class="mt-2">
                <textarea id="name"
                v-model="description"
                type="text"
                placeholder="to be..."
                required
                class="block w-full h-20 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6">

                </textarea>
            </div>           
          </div>
          <div>
            <label for="teacher" class="block text-md/6 font-medium text-gray-900">Teacher Name</label>
            <div class="mt-2">
                <select v-model="teacher" id="teacher" class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6">
                    <option v-for="type in teachers" :key="type.id" :value="type.id">
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
  
  export default {
    data() {
      return {
        teacher: null,
        teachers: [],
        name: '',
        description: '',
        preview: null,
        image: null,
        preview_list: [],
        image_list: []
      };
    },
    created() {
    this.fetchTeacher(); // Fetch payment types when component is created
  },
    methods: {
        async fetchTeacher() {
      try {
        const response = await api.get('/teacher'); 
        this.teachers = response.data.data; 
      } catch (error) {
        console.error('Error fetching payment types:', error);
      }
    },
      async handleCourse() {
        try {
          const response = await api.post('/course/create', {
            'name': this.name,
            'image': this.image,
            'description': this.description,
            'teacher_id': this.teacher,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Override to use form-data
            },
          });
          console.log(response);
          if(response.data.status == '201'){
            this.$notify(
              {
                text:'Course is created',
                type: 'success',
  
              }
            );
            this.$notify.close();
            this.$router.push('/admin/course')
  
          }
          
  
        } catch (error) 
        {
          if(error?.status == 400)
            {
              console.log(error);
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
      previewImage: function(event) {
        var input = event.target;
        if (input.files) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview = e.target.result;
          }
          this.image=input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
      },
    },
  };
  </script>