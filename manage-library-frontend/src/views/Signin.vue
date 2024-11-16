<template>
  <div class="signin-container mt-2">
    <div class="signin-card">
      <form @submit.prevent="handleForm">
        <h2 class="signin-title">Đăng nhập</h2>
        <p class="line"></p>
        <div class="persontype-question">
          <p class="p-2">
            Bạn là quản trị?
            <input type="checkbox" v-model="isStaff" id="isStaff" />
            <label for="isStaff" class="m-2"> Nhân viên</label>
          </p>
        </div>       
        <div class="signin-fields">
          <label :for="isStaff ? 'admissionId' : 'employeeId'"
            ><b>{{ isStaff ? "Mã nhân viên" : "Mã quản trị viên" }}</b></label
          >
          <input
            class="signin-textbox"
            type="text"
            :placeholder="isStaff ? 'Enter Staff ID' : 'Enter Admin ID'"
            :name="isStaff ? 'admissionId' : 'employeeId'"
            required
            @input="
              isStaff
                ? (admissionId = $event.target.value)
                : (employeeId = $event.target.value)
            "
          />
          <label for="password"><b>Mật khẩu</b></label>
          <input
            class="signin-textbox"
            type="password"
            minlength="6"
            placeholder="Enter Password"
            name="psw"
            required
            @input="password = $event.target.value"
          />
        </div>
        <button type="submit" class="signin-button">Đăng nhập</button>
        <a class="forget-pass" href="">Quên mật khẩu?</a>
      </form>
      <div class="signup-option">
        <p class="signup-question">
          Bạn chưa có tài khoản? Hãy liên hệ quản trị viên
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref } from "vue";
import { useAuthStore } from "../stores/auth.store";

const authStore = useAuthStore();
const isStaff = ref(false);
const admissionId = ref("");
const employeeId = ref("");
const password = ref("");
const error = ref("");

async function handleForm() {
  try {
    const result = await authStore.login({
      ...(isStaff.value
        ? { admissionId: admissionId.value }
        : { employeeId: employeeId.value }),
      password: password.value,
    });

    // Nếu đăng nhập thành công
    Swal.fire({
      icon: 'success',
      title: 'Đăng nhập thành công!',
      text: 'Chào mừng bạn trở lại!',
      timer: 2000,
      showConfirmButton: false,
    });     
    error.value = "";
  } catch (err) {
    // Nếu có lỗi, hiển thị thông báo lỗi
    Swal.fire({
      icon: 'error',
      title: 'Đăng nhập thất bại',
      text: 'Sai tên đăng nhập hoặc mật khẩu',
    });
    error.value = "Sai tên đăng nhập hoặc mật khẩu";
  }
}

</script>

<style scoped>
.signin-container {
  display: grid;
  place-items: center;
  height: 90vh;
  background-color: rgb(198, 222, 254);
  position: relative;
}

a {
  text-decoration: none;
}

.signin-card {
  font-family: sans-serif;
  width: 100%;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 38px;
  margin-bottom: 38px;
  border-radius: 10px !important;
  background-color: #ffff;
  box-shadow: 2px 5px 20px rgba(0, 0, 0, 0.1);
}

form {
  padding: 30px;
}

.error-message {
  color: red;
  font-weight: bold;
}

.signin-title {
  text-align: center;
  font-weight: bold;
  margin: 0;
}

.signup-option {
  background-color: rgb(69, 69, 185, 0.2);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.line {
  text-align: center;
  font-weight: bold;
  border-bottom: 2px solid rgb(245, 239, 239);
  line-height: 2px;
  margin: 25px 0;
}

.persontype-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  margin-top: 8px;
  font-weight: bold;
}

.signin-fields {
  display: flex;
  flex-direction: column;
}

.signin-fields label {
  color: rgb(170 166 166);
  text-align: left;
  margin-top: 25px;
}

.signin-textbox {
  padding: 15px 20px;
  margin-top: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
}

.signin-button {
  background-color: rgb(69, 69, 185);
  color: white;
  padding: 18px 20px;
  margin-top: 25px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.forget-pass {
  text-align: center;
  display: block;
}

.signup-question {
  text-align: center;
  font-weight: bold;
  margin-top: 15px !important;
  padding: 15px;
}
</style>
