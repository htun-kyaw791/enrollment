<template>
    <div class="flex flex-col justify-center font-[sans-serif] items-center min-h-screen" id="app">
      <div v-if="paymentData" class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <form @submit.prevent="updatePayment" class="space-y-6">
          <div class="flex items-center justify-center space-x-3 mb-5">
              <img class="h-10 w-auto" src="https://mms-it.com/profile/images/logo.png" alt="Logo" />
              <h2 class="text-2xl font-bold tracking-tight text-gray-700">Payment Update Form</h2>
            </div>
            <div>
            <label for="enrollment_id" class="block text-md/6 font-medium text-gray-900">Enrollment_id</label>
            <div class="mt-2">
              <input
                id="enrollment_id"
                v-model="paymentData.enrollment_id"
                type="text"
                disabled
                class="block w-full h-12 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
          </div>
          <div>
            <label for="payment_type_id" class="block text-md/6 font-medium text-gray-900">Payment Type</label>
            <div class="mt-2">
              <input
                id="payment_type_id"
                v-model="paymentData.paymenttypename"
                type="text"
                disabled
                class="block w-full h-12 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
          </div>
          <div>
            <label for="student_id" class="block text-md/6 font-medium text-gray-900">Student</label>
            <div class="mt-2">
              <input
                id="student_id"
                v-model="paymentData.student_name"
                type="text"
                disabled
                class="block w-full h-12 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
          </div>
          <div>
            <label for="amount" class="block text-md/6 font-medium text-gray-900">Amount</label>
            <div class="mt-2">
              <input
                id="amount"
                v-model="paymentData.amount"
                type="text"
                disabled
                class="block w-full h-12 rounded-md bg-white px-3 py-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-emerald-500 sm:text-md/6"
              />
            </div>
          </div>
          <div>
            <label for="image" class="block text-md/6 font-medium text-gray-900">Image</label>
            <div class="mt-2">
              <img :src="`http://localhost:8000/uploads/evidence/${paymentData.evidence_image}`" 
              alt="Payment Type Image" 
              class="w-24 h-32 object-cover">
              <input v-model="paymentData.evidence_image">
            </div>
          </div>
          <div>
            <label for="status" class="block text-md/6 font-medium text-gray-900">Status</label>
            <div class="mt-2">
              <v-select
                v-model="paymentData.status"
                :options="statusOptions"
                label="status"
                class="block w-full"
              ></v-select>
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
    import { useRouter } from 'vue-router';
    import { useNotification } from "@kyvg/vue3-notification"
  
    export default {
    setup() {
      const paymentData = ref({
          enrollment_id:'',
          payment_type_id:'',
          student_id:'', 
          status: 'pending'
          
      }); 
      const router = useRouter();
      const students = ref([{}]);
      const enrollments = ref([{}]);
      const paymentTypes = ref([{}]);
      const statusOptions = ['confirmed', 'pending', 'rejected'];
      const notification = useNotification();
      const fetchpaymentData = async () => {
        try {
            const id = sessionStorage.getItem('sessionID');
            const response = await api.get(`/payment/${id}`);
            paymentData.value = response.data.data;
            
        }
        catch (error) 
        {
            notification.notify(
            {
                text:'Error fetching data:',
                type: 'fail'
            });
            notification.notify.close()
        }
        
      };
 
      async function updatePayment() {
        try {
          const id = sessionStorage.getItem('sessionID');
        if (!id) 
        {
            throw new Error('Session ID is missing');
        }
        if (!paymentData.value.student_id ) 
        {
           
            console.error("Missing student_id");
            return;  // Optionally show an error message
        }
        const response = await api.put('/payment/update/' + id, 
        {
            enrollment_id: paymentData.value.enrollment_id,
            payment_type_id: paymentData.value.payment_type_id,
            student_id: paymentData.value.student_id,
            amount: paymentData.value.amount,
            evidence_image:paymentData.value.evidence_image,
            status: paymentData.value.status,
        });
          console.log(response);
          console.log(response.data);
          if(response.data.status == '200'){
  
            notification.notify(
              {
                text:'Enrollment is updated',
                type: 'success'
              }
            );
            notification.notify.close()
  
            router.push('/admin/payment')
  
          }
        } catch (error) 
        {
          if (error?.status == 403) 
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
            console.log(error);
            notification.notify(
              {
                text:'Error during update ',
                type: 'error'
              }
            );
          notification.notify.close()
          }
        }
      };
       onMounted(() => 
       {
        fetchpaymentData();
      });
  
      return {
        paymentData,
        updatePayment,
        students,
        enrollments,
        statusOptions,
      };
    },
  };
  </script>