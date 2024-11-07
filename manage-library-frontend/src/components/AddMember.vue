<template>
  <div>
    <p class="dashboard-option-title">Thêm người dùng</p>
    <div class="dashboard-title-line"></div>
    <form class="addmember-form" @submit.prevent="addMember">
      <div class="semanticdropdown">
        <v-select
          :options="userTypes"
          v-model="userType"
          placeholder="User Type"
        />
      </div>
      <label class="addmember-form-label" for="userFullName">Tên đầy đủ<span class="required-field">*</span></label><br />
      <input class="addmember-form-input" type="text" v-model="userFullName" required /><br />

      <label class="addmember-form-label" :for="userType === 'Student' ? 'admissionId' : 'employeeId'">{{ userType === 'Student' ? 'Admission Id' : 'Employee Id' }}<span class="required-field">*</span></label><br />
      <input class="addmember-form-input" type="text" {{v-model="userType === 'Student' ? admissionId : employeeId"}} required /><br />

      <label class="addmember-form-label" for="mobileNumber">Mobile Number<span class="required-field">*</span></label><br />
      <input class="addmember-form-input" type="text" v-model="mobileNumber" required /><br />

      <label class="addmember-form-label" for="gender">Gender<span class="required-field">*</span></label><br />
      <div class="semanticdropdown">
        <v-select
          :options="genderTypes"
          v-model="gender"
          placeholder="Gender"
        />
      </div>

      <label class="addmember-form-label" for="age">Age<span class="required-field">*</span></label><br />
      <input class="addmember-form-input" type="text" v-model="age" required /><br />

      <label class="addmember-form-label" for="dob">Date of Birth<span class="required-field">*</span></label><br />
      <date-picker
        v-model="dob"
        :format="'MM/DD/YYYY'"
        placeholder="MM/DD/YYYY"
        @change="onDateChange"
      />

      <label class="addmember-form-label" for="address">Address<span class="required-field">*</span></label><br />
      <input class="addmember-form-input address-field" type="text" v-model="address" required /><br />

      <label class="addmember-form-label" for="email">Email<span class="required-field">*</span></label><br />
      <input class="addmember-form-input" type="email" v-model="email" required /><br />

      <label class="addmember-form-label" for="password">Password<span class="required-field">*</span></label><br />
      <input class="addmember-form-input" type="password" v-model="password" /><br />

      <button class="addmember-submit" type="submit" :disabled="isLoading">SUBMIT</button>
    </form>

    <p class="dashboard-option-title">Recent Members</p>
    <div class="dashboard-title-line"></div>
    <table class="admindashboard-table">
      <thead>
        <tr>
        <th>STT</th>
        <th>Chức vụ</th>
        <th>Mã thành viên</th>
        <th>Tên thành viên</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in recentAddedMembers" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ member.userType }}</td>
        <td>{{ member.userType === 'Student' ? member.admissionId : member.employeeId }}</td>
        <td>{{ member.userFullName }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import DatePicker from 'vue-datepicker-next';
import VSelect from 'vue-select';

export default {
  components: { DatePicker, VSelect },
  data() {
    return {
      API_URL: process.env.VUE_APP_API_URL,
      isLoading: false,
      userFullName: null,
      admissionId: null,
      employeeId: null,
      address: null,
      email: null,
      password: null,
      mobileNumber: null,
      recentAddedMembers: [],
      userType: null,
      gender: null,
      age: null,
      dob: null,
      dobString: null,
      genderTypes: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ],
      userTypes: [
        { value: 'Staff', label: 'Staff' },
        { value: 'Student', label: 'Student' }
      ]
    };
  },
  methods: {
    async addMember() {
      this.isLoading = true;
      if (this.validateFields()) {
        const userData = {
          userType: this.userType,
          userFullName: this.userFullName,
          admissionId: this.admissionId,
          employeeId: this.employeeId,
          age: this.age,
          dob: this.dobString,
          gender: this.gender,
          address: this.address,
          mobileNumber: this.mobileNumber,
          email: this.email,
          password: this.password
        };
        try {
          const response = await axios.post(`${this.API_URL}api/auth/register`, userData);
          if (this.recentAddedMembers.length >= 5) {
            this.recentAddedMembers.pop();
          }
          this.recentAddedMembers.unshift(response.data);
          this.resetForm();
          alert("Member Added");
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("All fields must be filled");
      }
      this.isLoading = false;
    },
    async fetchMembers() {
      try {
        const response = await axios.get(`${this.API_URL}api/users/all`);
        this.recentAddedMembers = response.data.slice(0, 5);
      } catch (err) {
        console.log(err);
      }
    },
    onDateChange(date) {
      this.dob = date;
      this.dobString = this.formatDate(date);
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('en-US') : null;
    },
    validateFields() {
      return (
        this.userFullName &&
        this.userType &&
        this.age &&
        this.dobString &&
        this.gender &&
        this.address &&
        this.mobileNumber &&
        this.email &&
        this.password
      );
    },
    resetForm() {
      this.userFullName = null;
      this.userType = 'Student';
      this.admissionId = null;
      this.employeeId = null;
      this.address = null;
      this.mobileNumber = null;
      this.email = null;
      this.password = null;
      this.gender = null;
      this.age = null;
      this.dob = null;
      this.dobString = null;
    }
  },
  mounted() {
    this.fetchMembers();
  }
};
</script>

<style scoped>

</style>
