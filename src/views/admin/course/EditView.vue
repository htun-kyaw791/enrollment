<template>
  <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
    <div v-if="courseData" class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
      <form @submit.prevent="updateCourse" class="space-y-6">
        <div class="flex items-center justify-center space-x-3 mb-5">
            <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">Course Edit Form</h2>
          </div>
        <div>
          <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>
          <div class="mt-2">
            <input
              id="name"
              v-model="courseData.name"
              type="text"
              class="block w-full h-12 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6" required
            />
          </div>
        </div>
        <div v-if="!preview">
            <img :src="`http://localhost:8000/uploads/course/${courseData.image}`" 
                alt="Payment Type Image" class="img-fluid block w-20"/>
          </div>
          <div v-else>
            <p>New Image:</p>
              <template v-if="preview">
                <img :src="preview" class="img-fluid block w-20" />
                <p class="mb-0">file name: {{ image.name }}</p>
                <!-- <p class="mb-0">size: {{ image.size/1024 }}KB</p> -->
              </template>
          </div>
          <div>
            <label for="img" class="block text-md/6 font-medium text-gray-900">Change Image</label>
            <div class="mt-2">
              <input
                id="img"
                type="file" accept="image/*" @change="previewImage"
                class="block w-full h-12 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
          </div>
        <div>
          <label for="name" class="block text-md/6 font-medium text-gray-900">Description</label>
          <div class="mt-2">
            <textarea id="name"
              v-model="courseData.description"
              type="text"
              required
              class="block w-full h-32 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"></textarea>
          </div>
        </div>
        <div>
            <label for="teacher" class="block text-md/6 font-medium text-gray-900">Teacher Name</label>
            <div class="mt-2">
                <select v-model="courseData.teacher_id" id="teacher" class="block w-full h-12 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6">
                  <!-- <option selected>{{ courseData.teacher_name }}</option> -->
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
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  <pre>
    {{   }}
  </pre>
</template>

<script>
  import api from '@/services/api';
  import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
  import { useNotification } from "@kyvg/vue3-notification"

  export default {
  setup() {
    const courseData = ref({
        name: '',
        description: '', 
    }); 
    const router = useRouter()
    const preview = ref(null);
    const image = ref(null);
    const teachers = ref([]);
    const teacher = ref(null);
    const notification = useNotification()
    const fetchTeacher = async () => {
      try {
        const response = await api.get('/teacher'); 
        teachers.value = response.data.data;  
      } catch (error) {
        console.error('Error fetching teacher types:', error);
      }
    };
    const fetchcourseData = async () => {
      const id = sessionStorage.getItem('sessionID');
      if (!id) {
      console.error('No session ID found');
      return;
      }
      try 
      {
        const response = await api.get(`/course/${id}`);
        courseData.value = response.data.data; //pre form data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    async function updateCourse() {
      try {
        const id = sessionStorage.getItem('sessionID');

        const response = await api.post('/course/update/'+id, {
          'name': courseData.value.name,
          'image':image.value || null,
          'description': courseData.value.description,
          'teacher_id' : courseData.value.teacher_id,
        },
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Override to use form-data
            },
          });
          console.log(response.data);
        if(response.data.status == '200'){

          notification.notify(
            {
              text:'Course is updated',
              type: 'success'
            }
          );
          notification.notify.close()
          router.push('/admin/course')

        }
      } 
      catch (error) 
      {
        if(error?.status == 400)
        {
          notification.notify(
          {
            text:error.response.data.message,
            type: 'error',
        
          })
          notification.notify.close();
        }
        else if(error?.status == 403)
        {
          notification.notify(
          {
            text:error.response.data.message,
            type: 'error',
          })
          notification.notify.close();
        }
        else if(error?.status == 500)
        {
          notification.notify(
          {
            text:error.response.data.message,
            type: 'error',
          })
          notification.notify.close();
        }
        else
        {
          notification.notify(
          {
            text:'Error during update',
            type: 'error',
        
          })
        }
      }
    };
    const previewImage= (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            preview.value = e.target.result;
          }
          image.value=imageFile;
          reader.readAsDataURL(imageFile);
        }
    };
     onMounted(() => {
      fetchcourseData();
      fetchTeacher();
    });

    return {
      courseData,
      updateCourse,
      fetchTeacher,
      teachers,
      teacher,
      previewImage,
      preview,
      image,
    };
  },
};
</script>