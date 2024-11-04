<template>
  <div class="dashboard">
    <div class="dashboard-card">
      <!-- Sidebar toggler -->
      <div class="sidebar-toggler" @click="toggleSidebar">
        <button class="icon-button">
          <i :class="sidebar ? 'fas fa-times' : 'fas fa-angle-double-right'" style="font-size: 25px; color: rgb(234, 68, 74)" />
        </button>
      </div>

      <!-- Sidebar -->
      <div :class="['dashboard-options', { active: sidebar }]">
        <div class="dashboard-logo">
          <i class="fas fa-book" style="font-size: 50px" />
          <p class="logo-name">LACOS</p>
        </div>
        <p
          v-for="option in options"
          :key="option.id"
          :class="['dashboard-option', { clicked: active === option.id }]"
          @click="selectOption(option.id)"
        >
          <i :class="option.iconClass" class="dashboard-option-icon" />
          {{ option.label }}
        </p>
        <p class="dashboard-option" @click="logout">
          <i class="fas fa-power-off dashboard-option-icon" /> Đăng xuất
        </p>
      </div>

      <!-- Content -->
      <div class="dashboard-option-content">
        <div v-show="active === 'addbook'" class="dashboard-addbooks-content">
          <AddBook />
        </div>
        <div v-show="active === 'addtransaction'" class="dashboard-transactions-content">
          <AddTransaction />
        </div>
        <div v-show="active === 'addmember'" class="dashboard-addmember-content">
          <AddMember />
        </div>
        <div v-show="active === 'getmember'" class="dashboard-addmember-content">
          <GetMember />
        </div>
        <div v-show="active === 'returntransaction'" class="dashboard-addmember-content">
          <Return />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddTransaction from '..AddTransaction.vue'
import AddMember from '../components/AddMember.vue'
import AddBook from '../components/AddBook.vue'
import GetMember from '../components/GetMember.vue'
import Return from '../components/Return.vue'

const active = ref('addbook')
const sidebar = ref(false)

const toggleSidebar = () => {
  sidebar.value = !sidebar.value
}

const selectOption = (optionId) => {
  active.value = optionId
  sidebar.value = false
}

const logout = () => {
  localStorage.removeItem('user')
  window.location.reload()
}

const options = [
  { id: 'profile', label: 'Profile', iconClass: 'fas fa-user-circle' },
  { id: 'addbook', label: 'Add Book', iconClass: 'fas fa-book' },
  { id: 'addtransaction', label: 'Add Transaction', iconClass: 'fas fa-receipt' },
  { id: 'getmember', label: 'Get Member', iconClass: 'fas fa-user' },
  { id: 'addmember', label: 'Add Member', iconClass: 'fas fa-user-plus' },
  { id: 'returntransaction', label: 'Return', iconClass: 'fas fa-undo-alt' },
]
</script>

<style scoped>
/* Style từ AdminDashboard.css có thể được chuyển trực tiếp vào đây */
.dashboard {
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #DCF2F1;
  position: relative;
}

.dashboard-card {
  font-family: sans-serif;
  width: 80vw;
  height: 90vh;
  margin: 60px auto;
  display: flex;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}

/* Sidebar */
.dashboard-options {
  background-color: #0F1035;
  color: #DCF2F1;
  display: flex;
  flex-direction: column;
  flex: 0.25;
  width: 40vw;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.dashboard-logo {
  margin-top: 50px;
  margin-bottom: 50px !important;
  color: #7FC7D9;
  font-size: 30px;
  font-weight: 800;
  text-align: center;
}

.dashboard-option {
  text-decoration: none;
  padding: 15px;
  border-bottom: 0.5px solid #365486;
  border-top: 1px solid rgba(127, 199, 217, 0.5);
  color: #ffffff;
  font-weight: 700;
  text-align: left;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dashboard-option:hover {
  color: #7FC7D9;
  border-left: 5px solid #7FC7D9;
  transition: all 0.5s ease;
  background-color: #365486;
}

.dashboard-option.clicked {
  color: #7FC7D9;
  border-left: 5px solid #7FC7D9;
  transition: all 0.5s ease;
  background-color: #365486;
}

/* Content of each option in Sidebar */
.dashboard-option-content {
  display: flex;
  flex: 0.75;
  width: 80vw;
}

.dashboard-option-icon {
  margin-left: 15px;
  margin-right: 15px;
}

/* Form Styling */
.addbook-form-input,
.addmember-form-input,
.transaction-form-input {
  padding: 8px;
  width: 100%;
  max-width: 400px;
  outline: none;
  border-radius: 5px;
  font-size: 18px;
  border: 1px solid #365486;
  background-color: #DCF2F1;
}

.addbook-form-label,
.addmember-form-label,
.transaction-form-label {
  color: #365486;
  font-weight: 600;
  margin-top: 10px;
  font-size: 18px;
}

.addbook-submit,
.addmember-submit,
.transaction-form-submit {
  padding: 8px 10px;
  border: 2px solid #0F1035;
  background-color: #365486;
  color: #DCF2F1;
  font-weight: 600;
  margin-top: 15px;
  border-radius: 5px;
}

.addbook-submit:hover,
.addmember-submit:hover,
.transaction-form-submit:hover {
  background-color: #DCF2F1;
  color: #365486;
  border: 2px solid #365486;
  transition: all ease 0.5s;
}

/* Table Styling */
.admindashboard-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px !important;
}

.admindashboard-table td,
.admindashboard-table th {
  border: 1px solid #ddd;
  padding: 8px;
  font-size: 14px;
  text-align: center;
}

.admindashboard-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #0F1035;
  color: #ffffff;
}

</style>
