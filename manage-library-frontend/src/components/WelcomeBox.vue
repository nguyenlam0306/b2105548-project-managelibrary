<template>
  <div class="welcome-box">
    <p class="welcome-title">Chào bạn đến với thư viện của Lâm</p>
    <p class="welcome-message">
      Feed Your Brain<br />
      <span class="welcome-submessage">Hãy chọn quyển sách của bạn</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "WelcomeBox",
};
</script>

<style scoped>
.welcome-box {
  text-align: center;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.welcome-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.welcome-message {
  font-size: 18px;
  color: #666;
}

.welcome-submessage {
  font-size: 16px;
  color: #888;
}

</style>
