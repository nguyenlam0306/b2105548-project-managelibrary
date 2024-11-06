<template>
  <div>
    <p class="dashboard-option-title">Thêm mới giao dịch</p>
    <div class="dashboard-title-line"></div>
    <form class="transaction-form" @submit.prevent="addTransaction">
      <label class="transaction-form-label" for="borrowerId">Người mượn<span class="required-field">*</span></label><br />
      <div class="semanticdropdown">
        <v-select
          :options="allMembers"
          v-model="borrowerId"
          placeholder="Select Member"
          label="text"
          :reduce="option => option.value"
        />
      </div>

      <table v-if="borrowerId" class="admindashboard-table shortinfo-table">
        <thead>
          <tr>
          <th>Tên</th>
          <th>Đã phát hành</th>
          <th>Đã được đặt</th>
          <th>Điểm</th>
        </tr>
        </thead>
        <tbody>
          <tr>
          <td>{{ borrowerDetails.fullName }}</td>
          <td>{{ borrowerDetails.activeTransactions.filter(data => data.transactionType === 'Issued' && data.transactionStatus === 'Active').length }}</td>
          <td>{{ borrowerDetails.activeTransactions.filter(data => data.transactionType === 'Reserved' && data.transactionStatus === 'Active').length }}</td>
          <td>{{ borrowerDetails.points }}</td>
        </tr>
        </tbody>
      </table>

      <label class="transaction-form-label" for="bookName">Tên sách<span class="required-field">*</span></label><br />
      <div class="semanticdropdown">
        <v-select
          :options="allBooks"
          v-model="bookId"
          placeholder="Select a Book"
          label="text"
          :reduce="option => option.value"
        />
      </div>

      <label class="transaction-form-label" for="transactionType">Loại giao dịch<span class="required-field">*</span></label><br />
      <div class="semanticdropdown">
        <v-select
          :options="transactionTypes"
          v-model="transactionType"
          placeholder="Select Transaction"
          label="text"
          :reduce="option => option.value"
        />
      </div>

      <label class="transaction-form-label" for="from-date">Ngày mượn<span class="required-field">*</span></label><br />
      <date-picker
        v-model="fromDate"
        placeholder="MM/DD/YYYY"
        :format="'MM/DD/YYYY'"
        :min-date="new Date()"
      />

      <label class="transaction-form-label" for="to-date">Ngày trả<span class="required-field">*</span></label><br />
      <date-picker
        v-model="toDate"
        placeholder="MM/DD/YYYY"
        :format="'MM/DD/YYYY'"
        :min-date="new Date()"
      />

      <input class="transaction-form-submit" type="submit" value="SUBMIT" :disabled="isLoading" />
    </form>

    <p class="dashboard-option-title">Mượn gần đây</p>
    <div class="dashboard-title-line"></div>
    <table class="admindashboard-table">
      <thead>
        <tr>
        <th>STT</th>
        <th>Tên sách</th>
        <th>Người mượn</th>
        <th>Ngày</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in recentTransactions" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ transaction.bookName }}</td>
        <td>{{ transaction.borrowerName }}</td>
        <td>{{ transaction.updatedAt.slice(0, 10) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import DatePicker from 'vue-datepicker-next'

export default {
  components: {
    VSelect,
    DatePicker
  },
  setup() {
    const API_URL = import.meta.env.VUE_APP_API_URL
    const isLoading = ref(false)
    const borrowerId = ref('')
    const borrowerDetails = ref({})
    const bookId = ref('')
    const recentTransactions = ref([])
    const allMembers = ref([])
    const allBooks = ref([])
    const fromDate = ref(null)
    const toDate = ref(null)
    const transactionType = ref('')
    
    const transactionTypes = [
      { value: 'Reserved', text: 'Reserve' },
      { value: 'Issued', text: 'Issue' }
    ]

    const addTransaction = async () => {
      isLoading.value = true
      try {
        const borrower_details = await axios.get(`${API_URL}/api/users/${borrowerId.value}`)
        const book_details = await axios.get(`${API_URL}/api/books/${bookId.value}`)
        const transactionData = {
          bookId: bookId.value,
          borrowerId: borrowerId.value,
          borrowerName: borrower_details.data.fullName,
          bookName: book_details.data.bookName,
          transactionType: transactionType.value,
          fromDate: fromDate.value,
          toDate: toDate.value
        }
        
        const response = await axios.post(`${API_URL}/api/transactions/add`, transactionData)
        recentTransactions.value.unshift(response.data)
      } catch (error) {
        console.error("Lỗi khi thêm mới giao dịch", error)
      }
      isLoading.value = false
    }

    const fetchTransactions = async () => {
      const response = await axios.get(`${API_URL}/api/transactions/all`)
      recentTransactions.value = response.data.slice(0, 5)
    }

    onMounted(fetchTransactions)

    return {
      isLoading,
      borrowerId,
      borrowerDetails,
      bookId,
      recentTransactions,
      allMembers,
      allBooks,
      fromDate,
      toDate,
      transactionType,
      transactionTypes,
      addTransaction
    }
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
