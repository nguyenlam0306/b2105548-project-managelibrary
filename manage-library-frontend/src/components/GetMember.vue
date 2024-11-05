<template>
  <div>
    <div class="semanticdropdown getmember-dropdown">
      <v-select
        :options="allMembersOptions"
        v-model="memberId"
        label="text"
        placeholder="Select Member"
      />
    </div>
    <div v-if="memberId !== null">
      <div class="member-profile-content" id="profile@member">
        <div class="user-details-topbar">
          <img class="user-profileimage" src="./assets/images/Profile.png" alt="" />
          <div class="user-info">
            <p class="user-name">{{ memberDetails?.userFullName }}</p>
            <p class="user-id">
              {{ memberDetails?.userType === 'Student' ? memberDetails?.admissionId : memberDetails?.employeeId }}
            </p>
            <p class="user-email">{{ memberDetails?.email }}</p>
            <p class="user-phone">{{ memberDetails?.mobileNumber }}</p>
          </div>
        </div>
        <div class="user-details-specific">
          <div class="specific-left">
            <div style="display: flex; justify-content: space-between">
              <p style="flex: 0.5; flex-direction: column">
                <span><b>Age</b></span>
                <span>{{ memberDetails?.age }}</span>
              </p>
              <p style="flex: 0.5; flex-direction: column">
                <span><b>Gender</b></span>
                <span>{{ memberDetails?.gender }}</span>
              </p>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 30px">
              <p style="flex: 0.5; flex-direction: column">
                <span><b>DOB</b></span>
                <span>{{ memberDetails?.dob }}</span>
              </p>
              <p style="flex: 0.5; flex-direction: column">
                <span><b>Address</b></span>
                <span>{{ memberDetails?.address }}</span>
              </p>
            </div>
          </div>
          <div class="specific-right">
            <p><b>Points</b></p>
            <p>{{ memberDetails?.points }}</p>
            <p><b>Rank</b></p>
            <p>{{ memberDetails?.rank }}</p>
          </div>
        </div>
      </div>

      <!-- Issued Books Table -->
      <div class="member-activebooks-content" id="activebooks@member">
        <p><b>Issued</b></p>
        <table class="activebooks-table">
          <tr>
            <th>S.No</th>
            <th>Book-Name</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Fine</th>
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

      <!-- Reserved Books Table -->
      <div class="member-reservedbooks-content" id="reservedbooks@member">
        <p><b>Reserved</b></p>
        <table class="activebooks-table">
          <tr>
            <th>S.No</th>
            <th>Book-Name</th>
            <th>From</th>
            <th>To</th>
          </tr>
          <tr v-for="(data, index) in reservedBooks" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ data.bookName }}</td>
            <td>{{ data.fromDate }}</td>
            <td>{{ data.toDate }}</td>
          </tr>
        </table>
      </div>

      <!-- History Table -->
      <div class="member-history-content" id="history@member">
        <p><b>History</b></p>
        <table class="activebooks-table">
          <tr>
            <th>S.No</th>
            <th>Book-Name</th>
            <th>From</th>
            <th>To</th>
            <th>Return Date</th>
          </tr>
          <tr v-for="(data, index) in memberDetails.prevTransactions" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ data.bookName }}</td>
            <td>{{ data.fromDate }}</td>
            <td>{{ data.toDate }}</td>
            <td>{{ data.returnDate }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import vSelect from "vue-select";

export default {
  components: { vSelect },
  data() {
    return {
      API_URL: process.env.VUE_APP_API_URL,
      allMembersOptions: [],
      memberId: null,
      memberDetails: null,
    };
  },
  computed: {
    issuedBooks() {
      return this.memberDetails?.activeTransactions?.filter((data) => data.transactionType === "Issued") || [];
    },
    reservedBooks() {
      return this.memberDetails?.activeTransactions?.filter((data) => data.transactionType === "Reserved") || [];
    },
  },
  watch: {
    memberId(newMemberId) {
      this.getMemberDetails(newMemberId);
    },
  },
  methods: {
    async getMembers() {
      try {
        const response = await axios.get(`${this.API_URL}api/users/all`);
        this.allMembersOptions = response.data.map((member) => ({
          value: member._id,
          text: member.userType === "Student" ? `${member.userFullName}[${member.admissionId}]` : `${member.userFullName}[${member.employeeId}]`,
        }));
      } catch (err) {
        console.error(err);
      }
    },
    async getMemberDetails(memberId) {
      if (memberId) {
        try {
          const response = await axios.get(`${this.API_URL}api/users/${memberId}`);
          this.memberDetails = response.data;
        } catch (err) {
          console.error("Error in fetching the member details");
        }
      }
    },
    calculateFine(toDate) {
      const overdueDays = Math.floor((new Date() - new Date(toDate)) / 86400000);
      return overdueDays > 0 ? overdueDays * 10 : 0;
    },
  },
  created() {
    this.getMembers();
  },
};
</script>

<style scoped>
/* Add necessary CSS here */
</style>
