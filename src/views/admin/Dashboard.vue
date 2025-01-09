<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-500 text-white p-4 rounded shadow">
        <h2 class="text-lg">Total Students</h2>
        <p class="text-2xl font-bold">{{ studentCount.total_students }}</p>
      </div>
      <div class="bg-green-500 text-white p-4 rounded shadow">
        <h2 class="text-lg">Total Enrollments</h2>
        <p class="text-2xl font-bold">{{ totalEnrollments.total_enrollments }}</p>
      </div>
      <div class="bg-yellow-500 text-white p-4 rounded shadow">
        <h2 class="text-lg">Total Revenue</h2>
        <p class="text-2xl font-bold">MMK{{ paymentSummary[0]?.total_revenue }}</p>
      </div>
      <div class="bg-red-500 text-white p-4 rounded shadow">
        <h2 class="text-lg">Pending Payments</h2>
        <p class="text-2xl font-bold">{{ paymentSummary[0]?.pending_payments }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-bold mb-2">Enrollment Trends (Last 7 Days)</h2>
        <LineChart :chart-data="enrollmentChartData" :chart-options="lineChartOptions" />
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h2 class="text-lg font-bold mb-2">Revenue by Payment Type</h2>
        <PieChart :chart-data="paymentTypeChartData" :chart-options="pieChartOptions" />
      </div>
    </div>

    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-lg font-bold mb-2">Recent Registrations</h2>
      <table class="table-auto w-full text-left border-collapse border border-gray-200">
        <thead>
          <tr>
            <th class="border border-gray-200 p-2">NRC ID</th>
            <th class="border border-gray-200 p-2">DOB</th>
            <th class="border border-gray-200 p-2">Gender</th>
            <th class="border border-gray-200 p-2">Registration Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in recentRegistrations" :key="student.id">
            <td class="border border-gray-200 p-2">{{ student.nrc_id }}</td>
            <td class="border border-gray-200 p-2">{{ student.date_of_birth }}</td>
            <td class="border border-gray-200 p-2">{{ student.gender }}</td>
            <td class="border border-gray-200 p-2">{{ student.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { LineChart, PieChart } from 'vue-chart-3';
import api from '@/services/api';

export default {
  components: {
    LineChart,
    PieChart,
  },
  setup() {
    const studentCount = ref(0);
    const totalEnrollments = ref(0);
    const paymentSummary = ref({});
    const enrollmentChartData = ref({
      labels: [],
      datasets: [],
    });
    const paymentTypeChartData = ref({
      labels: [],
      datasets: [],
    });
    const recentRegistrations = ref([]);

    const lineChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
    });

    const pieChartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
    });

    const fetchDashboardData = async () => {
      try {
        const response = await api.get(`/admin-dashboard`);
        const data = response.data.data;

        studentCount.value = data.studentCount;
        totalEnrollments.value = data.totalEnrollments;
        paymentSummary.value = data.paymentSummary;

        enrollmentChartData.value = {
          labels: data.enrollmentTrends.map((item) => item.date),
          datasets: [
            {
              label: 'Enrollments',
              data: data.enrollmentTrends.map((item) => item.daily_count),
              borderColor: '#4caf50',
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
            },
          ],
        };

        paymentTypeChartData.value = {
          labels: data.revenueByPaymentType.map((item) => item.payment_type),
          datasets: [
            {
              label: 'Revenue',
              data: data.revenueByPaymentType.map((item) => item.total_revenue),
              backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
            },
          ],
        };

        recentRegistrations.value = data.recentRegistrations;
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    onMounted(fetchDashboardData);

    return {
      studentCount,
      totalEnrollments,
      paymentSummary,
      enrollmentChartData,
      paymentTypeChartData,
      recentRegistrations,
      lineChartOptions,
      pieChartOptions,
    };
  },
};
</script>
