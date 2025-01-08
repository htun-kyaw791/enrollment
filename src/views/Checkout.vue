<template>
    <div class="flex justify-center items-center py-10">
      <div class="flex flex-col w-full max-w-4xl space-y-6">
        <div v-if="!section" class="text-center">
          <p class="text-red-500 text-lg font-semibold">Loading section data...</p>
        </div>
        <div v-else class="bg-white rounded-lg shadow-md p-5">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Section Information</h2>
          <div class="flex flex-col space-y-2">
            <div>
              <strong>Section Name:</strong> {{ section.name }}
            </div>
            <div>
              <strong>Cost:</strong> MMK{{ section.cost }}
            </div>
            <div>
              <strong>Timeline:</strong> {{ section.start_date }} to {{  section.end_date }}
            </div>
            <div>
              <strong>Courses:</strong>
              <ul class="list-disc list-inside">
                <li v-for="course in section.courses" :key="course.id">
                  <span class="font-bold">{{ course.name }}</span> - <span class="text-gray-600">{{ course.description }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="bg-white rounded-lg shadow-md p-5">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Checkout</h2>
          <form @submit.prevent="handleCheckout" class="flex flex-col space-y-4">
            <div>
              <label for="paymentType" class="block font-medium text-gray-700">Payment Type</label>
              <select v-model="form.payment_type_id" id="paymentType" class="block w-full mt-1 p-2 border rounded-md">
                <option value="" disabled>Select Payment Type</option>
                <option v-for="type in paymentTypes" :key="type.paymenttypeid" :value="type.paymenttypeid">
                  {{ type.paymenttypename }}
                </option>
              </select>
            </div>
  
  
            <div>
              <label for="cost" class="block font-medium text-gray-700">Amount</label>
              <input
                v-model="form.amount"
                id="cost"
                type="text"
                class="block w-full mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                readonly
              />
            </div>
  
            <div>
              <label for="evidenceImage" class="block font-medium text-gray-700">Evidence Image</label>
              <input
                type="file"
                id="evidenceImage"
                @change="handleFileUpload"
                class="block w-full mt-1 p-2 border rounded-md"
              />
            </div>
  
            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import api from '@/services/api';
  
  export default {
    setup() {
      const section = ref(null);
      const paymentTypes = ref([]);
      const sectionId = sessionStorage.getItem('session_checkout');
      const form = ref({
        payment_type_id: '',
        student_id: '',
        // enrollment_id: '',
        amount: '',
        section_id: sectionId,
        evidence_image: null,
      });
  
      const fetchSectionData = async () => {
        if (!sectionId) {
          console.error('No section ID found in session storage.');
          return;
        }
  
        try {
          const response = await api.get(`/section/${sectionId}`);
          if (response && response.data) {
            section.value = response.data.data;
            form.value.amount = response.data.data.cost; 
          }
        } catch (error) {
          console.error('Error fetching section data:', error);
        }
      };
  
      const fetchPaymentTypes = async () => {
        try {
          const response = await api.get(`/payment-type`);
          if (response && response.data) {
            paymentTypes.value = response.data.data;
          }
        } catch (error) {
          console.error('Error fetching payment types:', error);
        }
      };
  
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        form.value.evidence_image = file;
      };
  
      const handleCheckout = async () => {
        if (
          !form.value.payment_type_id ||
          !form.value.amount ||
          !form.value.section_id
        ) {
          alert('Please fill in all required fields.');
          return;
        }

        const student = JSON.parse(localStorage.getItem('login_student')); 
        if (!student) {
          alert('No student found in localStorage!');
          return;
        }else{
            form.value.student_id = student.student_id;
        }
  
        const formData = new FormData();
        Object.entries(form.value).forEach(([key, value]) => {
          formData.append(key, value);
        });

        try {
          const response = await api.post('/payment/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
  
          if (response && response.data.status == 201) {
            alert('Checkout successful!');
          } else {
            alert('Checkout failed.');
          }
        } catch (error) {
          console.error('Error during checkout:', error);
          alert('An error occurred during checkout.');
        }
      };
  
      onMounted(() => {
        fetchSectionData();
        fetchPaymentTypes();
      });
  
      return {
        section,
        paymentTypes,
        form,
        handleFileUpload,
        handleCheckout,
      };
    },
  };
  </script>
  