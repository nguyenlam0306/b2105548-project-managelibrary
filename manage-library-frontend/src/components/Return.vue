<template>
  <div>
    <div class="semanticdropdown returnbook-dropdown">
      <v-select
        v-model="borrowerId"
        :options="allMembersOptions"
        placeholder="Select Member"
        label="text"
      ></v-select>
    </div>
    <p class="dashboard-option-title">Issued</p>
    <table class="admindashboard-table">
      <tr>
        <th>Tên sách</th>
        <th>Người mượn</th>
        <th>Từ ngày</th>
        <th>Đến ngày</th>
        <th>Tình trạng</th>
        <th></th>
      </tr>
      <tr
        v-for="(data, index) in filteredIssuedTransactions"
        :key="index"
      >
        <td>{{ data.bookName }}</td>
        <td>{{ data.borrowerName }}</td>
        <td>{{ data.fromDate }}</td>
        <td>{{ data.toDate }}</td>
        <td>{{ calculateFine(data.toDate) }}</td>
        <td>
          <button @click="returnBook(data._id, data.borrowerId, data.bookId, calculateDue(data.toDate))">
            Trả sách
          </button>
        </td>
      </tr>
    </table>

    <p class="dashboard-option-title">Đặt sách</p>
    <table class="admindashboard-table">
      <tr>
        <th>Tên sách</th>
        <th>Người mượn</th>
        <th>Từ ngày</th>
        <th>Trả ngày</th>
        <th></th>
      </tr>
      <tr
        v-for="(data, index) in filteredReservedTransactions"
        :key="index"
      >
        <td>{{ data.bookName }}</td>
        <td>{{ data.borrowerName }}</td>
        <td>{{ data.fromDate }}</td>
        <td>{{ data.toDate }}</td>
        <td>
          <button @click="convertToIssue(data._id)">
            Convert
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  components: { vSelect },
  data() {
    return {
      API_URL: process.env.VUE_APP_API_URL,
      user: {}, // assuming you've stored user context in a Vuex store or provide it through props
      allTransactions: [],
      ExecutionStatus: null,
      allMembersOptions: [],
      borrowerId: null,
    };
  },
  computed: {
    filteredIssuedTransactions() {
      return this.allTransactions
        .filter(data => data.transactionType === 'Issued' && (this.borrowerId === null || data.borrowerId === this.borrowerId));
    },
    filteredReservedTransactions() {
      return this.allTransactions
        .filter(data => data.transactionType === 'Reserved' && (this.borrowerId === null || data.borrowerId === this.borrowerId));
    }
  },
  methods: {
    async getMembers() {
      try {
        const response = await axios.get(this.API_URL + 'api/users/all');
        this.allMembersOptions = response.data.map(member => ({
          value: member._id,
          text: member.userType === 'Student'
            ? `${member.userFullName}[${member.admissionId}]`
            : `${member.userFullName}[${member.employeeId}]`,
        }));
      } catch (err) {
        console.error(err);
      }
    },
    async getAllTransactions() {
      try {
        const response = await axios.get(this.API_URL + 'api/transactions/all-transactions');
        this.allTransactions = response.data
          .sort((a, b) => Date.parse(a.toDate) - Date.parse(b.toDate))
          .filter(data => data.transactionStatus === 'Active');
        this.ExecutionStatus = null;
      } catch (err) {
        console.error(err);
      }
    },
    async returnBook(transactionId, borrowerId, bookId, due) {
      try {
        await axios.put(this.API_URL + 'api/transactions/update-transaction/' + transactionId, {
          isAdmin: this.user.isAdmin,
          transactionStatus: 'Completed',
          returnDate: moment(new Date()).format('MM/DD/YYYY'),
        });

        const borrowerData = await axios.get(this.API_URL + 'api/users/getuser/' + borrowerId);
        const points = borrowerData.data.points;

        await axios.put(this.API_URL + 'api/users/updateuser/' + borrowerId, {
          points: due > 0 ? points - 10 : points + 10,
          isAdmin: this.user.isAdmin,
        });

        const bookDetails = await axios.get(this.API_URL + 'api/books/getbook/' + bookId);
        await axios.put(this.API_URL + 'api/books/updatebook/' + bookId, {
          isAdmin: this.user.isAdmin,
          bookCountAvailable: bookDetails.data.bookCountAvailable + 1,
        });

        await axios.put(this.API_URL + `api/users/${transactionId}/move-to-prevtransactions`, {
          userId: borrowerId,
          isAdmin: this.user.isAdmin,
        });

        this.ExecutionStatus = 'Completed';
        alert('Book returned to the library successfully');
      } catch (err) {
        console.error(err);
      }
    },
    async convertToIssue(transactionId) {
      try {
        await axios.put(this.API_URL + 'api/transactions/update-transaction/' + transactionId, {
          transactionType: 'Issued',
          isAdmin: this.user.isAdmin,
        });
        this.ExecutionStatus = 'Completed';
        alert('Book issued successfully 🎆');
      } catch (err) {
        console.error(err);
      }
    },
    calculateFine(toDate) {
      const dueDays = Math.floor((Date.now() - Date.parse(toDate)) / 86400000);
      return dueDays > 0 ? dueDays * 10 : 0;
    },
    calculateDue(toDate) {
      return Math.floor((Date.now() - Date.parse(toDate)) / 86400000);
    }
  },
  watch: {
    ExecutionStatus(newVal) {
      if (newVal === 'Completed') {
        this.getAllTransactions();
      }
    },
  },
  mounted() {
    this.getMembers();
    this.getAllTransactions();
  },
};
</script>

<style scoped>
@import '../assets/AdminDashboard.css';
@import '../assets/MemberDashboard.css';
</style>
