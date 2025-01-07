<template>
    <div class="flex">
      <!-- Sidebar -->
      <div
        :class="[
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 z-50 md:translate-x-0'
        ]"
      >
        <div class="p-4 font-bold text-lg">My Sidebar</div>
        <ul class="space-y-4 p-4">
          <li><a href="#" class="block hover:bg-gray-700 px-4 py-2 rounded">Home</a></li>
          <li><a href="#" class="block hover:bg-gray-700 px-4 py-2 rounded">About</a></li>
          <li><a href="#" class="block hover:bg-gray-700 px-4 py-2 rounded">Services</a></li>
          <li><a href="#" class="block hover:bg-gray-700 px-4 py-2 rounded">Contact</a></li>
        </ul>
      </div>
  
      <!-- Main Content -->
      <div class="flex-1 min-h-screen bg-gray-100">
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
        <slot> </slot>
      </div>
  
      <!-- Overlay -->
      <div
        v-if="isOpen"
        @click="toggleSidebar"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      ></div>
    </div>
  </template>
  
  <script>
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
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles (optional) */
  </style>
  