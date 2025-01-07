<template>
    <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
      <div v-if="paymentTypeData" class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <form @submit.prevent="updatePaymentType" class="space-y-6">
          <div class="flex items-center justify-center space-x-3 mb-5">
            <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
            <h2 class="text-2xl font-bold tracking-tight text-gray-700">Payment Type Form</h2>
          </div>
          <div>
            <label for="name" class="block text-md/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
              <input
                id="name"
                v-model="paymentTypeData.paymenttypename"
                type="text"
                required
                class="block w-full h-12 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
              <input
                v-model="paymentTypeData.paymenttypeid"
                type="hidden"
              />
              <input v-model="paymentTypeData.paymenttypeimage" type="hidden">
            </div>
          </div>
          <div v-if="!preview">
            <img :src="`http://localhost:8000/uploads/paymentType/${paymentTypeData.paymenttypeimage}`" 
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
  </template>
  
  <script>
    import api from '@/services/api';
    import { ref, onMounted } from 'vue';
    import router from '@/router';
    import { useNotification } from "@kyvg/vue3-notification"
  
    export default {
    setup() {
      const paymentTypeData = ref({
        paymenttypename: '',
        
      }); 
      const preview = ref(null);
      const image = ref(null);
      const notification = useNotification()
  
      const fetchPaymentTypeData = async () => {
        const id = sessionStorage.getItem('sessionID');
        console.log(sessionStorage.getItem('sessionID'));
        if (!id) {
        console.error('No session ID found');
        return;
        }
        try 
        {
          const response = await api.get(`/payment-type/${id}`);
          paymentTypeData.value = response.data.data; // Prefill form data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
  
      async function updatePaymentType() {
        try {
          const id = sessionStorage.getItem('sessionID');
  
          const response = await api.post('/payment-type/update/'+id, {
            'paymenttypename': paymentTypeData.value.paymenttypename,
            'paymenttypeimage': image.value || null,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Override to use form-data
            },
          });
  
          if(response.data.status == '200')
          {
  
            notification.notify(
              {
                text:'Payment Type is updated',
                type: 'success'
              }
            );
            notification.notify.close()
            router.push('/admin/payment_type')
  
          }
        } 
        catch (error) 
        {
              if(error?.status == 500)
            {
              notification.notify(
              {
                text:error.response.data.message,
                type: 'error',
        
                })
                notification.notify.close();
            }
            else if(error?.status == 400)
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
              notification.notify.close();

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
        fetchPaymentTypeData(); // Call fetch function when component mounts
      });
  
      return {
        paymentTypeData,
        previewImage,
        preview,
        image,
        updatePaymentType
      };
    },
  };
  </script>