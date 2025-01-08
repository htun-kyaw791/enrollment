<template>
  <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
    <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
      <form @submit.prevent="handleChapter" class="space-y-6">
        <div class="flex items-center justify-center space-x-3 mb-5">
            <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">Chapter Form</h2>
        </div>
        <div>
          <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>
          <div class="mt-2">
            <textarea id="name"
              v-model="name"
              type="text"
              placeholder="html"
              required
              class="block w-full h-32 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6">
            </textarea>
          </div>
        </div>
        <div>
            <label for="link" class="block text-md/6 font-medium text-gray-900">
              Pre Recorded Link
            </label>
            <div class="mt-2">
              <textarea
                id="link"
                v-model="link"
                type="text"
                required
                class="block w-full h-32 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              ></textarea>
            </div>
            <!-- Preview Section -->
            <div v-if="isValidYouTubeLink(link)" class="mt-4">
              <iframe
                :src="getYouTubeEmbedUrl(link)"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-64 rounded-md"
              ></iframe>
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

export default {
  data() {
    return {
      course: null,
      courses: [],
      name: '',
      link: '',
    };
  },
  created() {
  this.fetchChapter(); // Fetch payment types when component is created
},
  methods: {
    isValidYouTubeLink(link) {
      const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
      return regex.test(link);
    },
    getYouTubeEmbedUrl(link) {
      const videoId = link.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)[1];
      return `https://www.youtube.com/embed/${videoId}`;
    },
      async fetchChapter() {
    try {
      const response = await api.get('/course'); 
      this.courses = response.data.data; 
    } catch (error) {
      console.error('Error fetching payment types:', error);
    }
  },
    async handleChapter() {
      try {
        const response = await api.post('/chapter/create', {
          'name': this.name,
          'link': this.link,
          'course_id': this.course,
        });
        console.log(response);
        if(response.data.status == '201'){
          console.log(response.data.status);
          this.$notify(
            {
              text:'Chapter is created',
              type: 'success',

            }
          );
          this.$notify.close();
          this.$router.push('/admin/chapter').then(()=>{window.location.reload()});

        }
      } catch (error) 
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
  },
};
</script>