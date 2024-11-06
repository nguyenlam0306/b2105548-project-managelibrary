<template>
  <div class="dashboard">
    <div class="dashboard-card">
      <div class="sidebar-toggler" @click="toggleSidebar">
        <v-icon large>{{ sidebar ? 'mdi-close' : 'mdi-chevron-double-right' }}</v-icon>
      </div>

      <div :class="['dashboard-options', { active: sidebar }]">
        <div class="dashboard-logo">
          <v-icon large>mdi-library-books</v-icon>
          <p class="logo-name">Lacos</p>
        </div>
        <a
          href="#profile@member"
          class="dashboard-option"
          :class="{ clicked: active === 'profile' }"
          @click="setActive('profile')"
        >
          <v-icon class="dashboard-option-icon">mdi-account-circle</v-icon> Thông tin 
        </a>
        <a
          href="#activebooks@member"
          class="dashboard-option"
          :class="{ clicked: active === 'active' }"
          @click="setActive('active')"
        >
          <v-icon class="dashboard-option-icon">mdi-library-shelves</v-icon> Đang mượn
        </a>
        <a
          href="#reservedbook@member"
          class="dashboard-option"
          :class="{ clicked: active === 'reserved' }"
          @click="setActive('reserved')"
        >
          <v-icon class="dashboard-option-icon">mdi-book</v-icon> Reserved
        </a>
        <a
          href="#history@member"
          class="dashboard-option"
          :class="{ clicked: active === 'history' }"
          @click="setActive('history')"
        >
          <v-icon class="dashboard-option-icon">mdi-history</v-icon> Lịch sử
        </a>
        <a
          href="#profile@member"
          class="dashboard-option"
          :class="{ clicked: active === 'logout' }"
          @click="logout"
        >
          <v-icon class="dashboard-option-icon">mdi-power</v-icon> Đăng xuất
        </a>
      </div>

      <div class="dashboard-option-content">
        <div v-if="active === 'profile'" class="member-profile-content" id="profile@member">
          <div class="user-details-topbar">
            <img class="user-profileimage" src="./assets/images/Profile.png" alt="" />
            <div class="user-info">
              <p class="user-name">{{ memberDetails?.userFullName }}</p>
              <p class="user-id">
                {{ memberDetails?.userType === "Student" ? memberDetails?.admissionId : memberDetails?.employeeId }}
              </p>
              <p class="user-email">{{ memberDetails?.email }}</p>
              <p class="user-phone">{{ memberDetails?.mobileNumber }}</p>
            </div>
          </div>
          <div class="user-details-specific">
            <!-- Details Section -->
          </div>
        </div>

        <div v-if="active === 'active'" class="member-activebooks-content" id="activebooks@member">
          <p class="member-dashboard-heading">Issued</p>
          <table class="activebooks-table">
            <thead>
             <tr>
              <th>STT</th>
              <th>Tên sách</th>
              <th>Mượn từ ngày</th>
              <th>Ngày trả dự kiến</th>
              <th>TÌnh trạng</th>
             </tr>
            </thead>
            <tbody>
              <tr v-for="(data, index) in issuedBooks" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ data.bookName }}</td>
              <td>{{ data.fromDate }}</td>
              <td>{{ data.toDate }}</td>
              <td>{{ calculateFine(data.toDate) }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Reserved and History sections -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const API_URL = process.env.VUE_APP_API_URL;
    const active = ref("profile");
    const sidebar = ref(false);
    const memberDetails = ref(null);

    const issuedBooks = computed(() =>
      memberDetails.value?.activeTransactions?.filter((data) => data.transactionType === "Issued")
    );

    const calculateFine = (toDate) => {
      const daysLate = Math.floor((Date.parse(moment().format("MM/DD/YYYY")) - Date.parse(toDate)) / 86400000);
      return daysLate > 0 ? daysLate * 10 : 0;
    };

    const setActive = (option) => {
      active.value = option;
      sidebar.value = false;
    };

    const toggleSidebar = () => {
      sidebar.value = !sidebar.value;
    };

    const logout = () => {
      localStorage.removeItem("user");
      window.location.reload();
    };

    onMounted(async () => {
      try {
        const response = await axios.get(`${API_URL}api/users/${user.value._id}`);
        memberDetails.value = response.data;
      } catch (err) {
        console.error("Error in fetching the member details");
      }
    });

    return {
      active,
      sidebar,
      memberDetails,
      issuedBooks,
      setActive,
      toggleSidebar,
      logout,
      calculateFine,
    };
  },
};
</script>

<style scoped>
@import "../../assets/MemberDashboard.css";
</style>
