<template>
  <div>
    <template v-if="layoutComponent === null">
      <div key="guest">
        <DefaultLayout key="default"><RouterView /></DefaultLayout>
      </div>
    </template>
    <template v-else>
      <component :is="layoutComponent" :key="layoutKey">
        <RouterView />
      </component>
    </template>
    <notifications />
  </div>
  <!-- backgroun-color -->
  <template>
  <div id="app">
    <!-- Background Div with Solid Color -->
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-blue-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>

    <!-- Main Content Div with Solid Background Color -->
    <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-blue-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>

    <!-- Main Content Here -->
    <div class="relative z-10 p-4">
      <h1 class="text-4xl font-bold text-gray-800">Welcome to My Vue App</h1>
      <p class="mt-4 text-lg text-gray-600">This is a sample Vue app styled with Tailwind CSS.</p>
    </div>
  </div>
</template>



</template>

<script>
import AdminLayout from "./layouts/AdminLayout.vue";
import StudentLayout from "./layouts/StudentLayout.vue";
import TeacherLayout from "./layouts/TeacherLayout.vue";
import DefaultLayout from "./layouts/DefaultLayout.vue";

export default {
  components: {
    DefaultLayout
  },
  computed: {
    userRole() {
      return localStorage.getItem("role");
    },
    layoutComponent() {
      if (this.$route.path.startsWith('/admin')) {
        return AdminLayout;
      }
      if (this.$route.path.startsWith('/student')) {
        return StudentLayout;
      }
      if (this.$route.path.startsWith('/teacher')) {
        return TeacherLayout;
      }
      return null;
    },
    layoutKey() {
      return `layout-${this.userRole}`;
    },
  },
};
</script>
