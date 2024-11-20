
<script setup>
 
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
const authStore = useAuthStore()

</script>


<template>
   <div class="member-profile-content mt-5" id="profile@member">
        <div class="user-details-topbar">
          <img class="user-profileimage" src="../assets/images/profile.png" alt="" />
          <div class="user-info">
            <p class="user-name">{{ authStore.user.userFullName }}</p>
            <p class="user-id">
              {{ authStore.user.userType === 'staff' ? authStore.user.admissionId : authStore.user.employeeId }}
            </p>
            <p class="user-email">{{ authStore.user.email }}</p>
            <p class="user-phone">{{ authStore.user.mobileNumber }}</p>
          </div>
        </div>
        <div class="user-details-specific">
          <div class="specific-left">
            <div style="display: flex; justify-content: space-between">
              <p style="flex: 0.5; flex-direction: column">
                <span><b>Tuổi</b></span>
                <br>
                <span>{{ authStore.user.age }}</span>
              </p>
              <p style="flex: 0.5; flex-direction: column">
                <span><b>Giới tính</b></span>
                <br>
                <span>{{ authStore.user.gender }}</span>
              </p>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 30px">
              <p style="flex: 0.5; flex-direction: column">
                <span><b>Ngày sinh</b></span>
                <br>
                <span>{{ authStore.user.dob }}</span>
              </p>
              <p style="flex: 0.5; flex-direction: column">
                <span><b>Địa chỉ</b></span>
                <br>
                <span>{{ authStore.user.address }}</span>
              </p>
            </div>
          </div>
          <div class="specific-right">
            <p><b>Điểm</b></p>
            <p>{{ authStore.user.points }}</p>
            <p><b>Loại tài khoản</b></p>
            <p>{{ authStore.user.userType }}</p>
          </div>
        </div>
      </div>
</template>

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
