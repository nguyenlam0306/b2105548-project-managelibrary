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
            <tr>
              <th>STT</th>
              <th>Tên sách</th>
              <th>Mượn từ ngày</th>
              <th>Ngày trả dự kiến</th>
              <th>TÌnh trạng</th>
            </tr>
            <tr v-for="(data, index) in issuedBooks" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ data.bookName }}</td>
              <td>{{ data.fromDate }}</td>
              <td>{{ data.toDate }}</td>
              <td>{{ calculateFine(data.toDate) }}</td>
            </tr>
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
.dashboard-option-content {
  display: flex;
  flex-direction: column;
  flex: 0.75;
  width: 80vw;
  overflow-y: scroll;
}

.member-profile-content,
.member-activebooks-content,
.member-reservedbooks-content,
.member-history-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 25px 25px 100px 25px;
}

.dashboard-option-content::-webkit-scrollbar,
.member-profile-content::-webkit-scrollbar,
.member-activebooks-content::-webkit-scrollbar,
.member-reservedbooks-content::-webkit-scrollbar,
.member-history-content::-webkit-scrollbar {
  display: none;
}

.user-details-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  border-radius: 5px;
  border: 1px solid lightgray;
  padding: 15px 35px;
  -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.user-profileimage {
  height: 150px;
  width: 150px;
  border-radius: 50%;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  line-height: 50px;
}

.user-id {
  font-size: 18px;
  color: rgb(161, 151, 0);
  font-weight: bold;
}

.user-email,
.user-phone {
  font-size: 18px;
  font-weight: bold;
  color: rgb(131, 131, 131);
}

.user-details-specific {
  display: flex;
}

.specific-left {
  display: flex;
  flex-direction: column;
  width: 50%;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 25px;
  margin: 20px 10px 0 0;
  -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.specific-left-top {
  display: flex;
  justify-content: space-between;
}

.specific-left-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.specific-right {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 15px;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin: 20px 0 0 10px;
  -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.specific-right-top,
.specific-right-bottom {
  display: flex;
  flex-direction: column;
  flex: 0.5;
}

.specific-left-topic {
  display: flex;
  flex: 0.5;
  flex-direction: column;
}

.specific-right-topic {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.member-dashboard-heading {
  margin: 22px 0;
  font-size: 22px;
  font-weight: bold;
}

.activebooks-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  margin-bottom: 10px !important;
  -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.activebooks-table td,
.activebooks-table th {
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 16px;
}

.activebooks-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(24, 33, 62);
  color: white;
}

@media screen and (max-width: 768px) {
  .user-details-topbar {
    flex-direction: column;
  }
  .user-details-specific {
    flex-direction: column;
  }
  .specific-left,
  .specific-right {
    width: 100%;
    margin: 20px auto;
  }
}


</style>
