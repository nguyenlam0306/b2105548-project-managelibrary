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
import AddTransaction from '../../components/AddTransaction.vue'
import AddMember from '../../components/AddMember.vue'
import AddBook from '../../components/AddBook.vue'
import GetMember from '../../components/GetMember.vue'
import Return from '../../components/Return.vue'

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
@import "./AdminDashboard.css";

</style>
