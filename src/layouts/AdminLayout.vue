<template>
    <div class="flex">
      <!-- Sidebar -->
      <div
        :class="[
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 z-50 md:translate-x-0'
        ]"
      >
        <div class="p-4 font-bold text-lg">Admin Sidebar</div>
        <ul class="space-y-4 p-4">
          <li>
            <RouterLink
              to="/admin/dashboard"
              class="block hover:bg-gray-700 px-4 py-2 rounded"
              @click="closeSidebar"
            >
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/user"
              class="block hover:bg-gray-700 px-4 py-2 rounded"
              @click="closeSidebar"
            >
              Users
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/payment_type"
              class="block hover:bg-gray-700 px-4 py-2 rounded"
              @click="closeSidebar"
            >
              Payment Type
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/course"
              class="block hover:bg-gray-700 px-4 py-2 rounded"
              @click="closeSidebar"
            >
              Course
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/subject"
              class="block hover:bg-gray-700 px-4 py-2 rounded"
              @click="closeSidebar"
            >
              Subject
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/section"
              class="block hover:bg-gray-700 px-4 py-2 rounded"
              @click="closeSidebar"
            >
              Section
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/teacher"
              class="block hover:bg-gray-700 px-4 py-2 rounded"
              @click="closeSidebar"
            >
              Teacher
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/enrollment"
              class="block hover:bg-gray-700 px-4 py-2 rounded"
              @click="closeSidebar"
            >
              Enrollment
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/payment"
              class="block hover:bg-gray-700 px-4 py-2 rounded"
              @click="closeSidebar"
            >
              Payment
            </RouterLink>
          </li>
          <li>
            <div
              class="block hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
              @click="logout"
            >
              Logout
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Main Content -->
      <div
        :class="[
          isOpen ? 'ml-64' : 'ml-0',
          'flex-1 min-h-screen bg-gray-100 transition-all duration-300'
        ]"
      >
        <header class="bg-gray-800 text-white p-4 md:hidden">
          <button @click="toggleSidebar" class="text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>
        <div class="ml-0 md:ml-64">
            <RouterView />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { RouterLink, RouterView } from 'vue-router';
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      toggleSidebar() {
        this.isOpen = !this.isOpen;
      },
      closeSidebar() {
        if (window.innerWidth < 768) {
          this.isOpen = false;
        }
      },
      logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('login_user');
        api.post('/auth/logout');
        this.$router.push('/login').then(()=>{window.location.reload()});
      }
    },
  };
  </script>
  