<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div class="max-w-md text-center">
        <h1 class="text-4xl font-bold mb-4 text-red-500">Permission Denied</h1>
        <p class="text-lg mb-6">
          You do not have the necessary permissions to access this page.
        </p>
        <button
          @click="goHome"
          class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "403",
    methods: {
      goHome() {
        this.$router.push("/"); 
      },
    },
  };
  </script>
  