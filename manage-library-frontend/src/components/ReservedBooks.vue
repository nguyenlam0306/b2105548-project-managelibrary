<template>
  <div class="reservedbooks-container">
    <h1 class="reservedbooks-title">Sách trên kệ</h1>
    <table class="reservedbooks-table">
      <thead>
        <tr>
        <th>Tên sách</th>
        <th>Sách</th>
        <th>Ngày</th>
      </tr>
      </thead>
      <tbody>
        <tr>
        <td>Pranav</td>
        <td>Rich Dad Poor Dad</td>
        <td>12/7/2021</td>
      </tr>
      <tr>
        <td>Sashank</td>
        <td>The Subtle Art</td>
        <td>10/7/2021</td>
      </tr>
      <tr>
        <td>Tanishq</td>
        <td>Wings Of Fire</td>
        <td>15/9/2021</td>
      </tr>
      <tr>
        <td>Akhil</td>
        <td>The Secret</td>
        <td>02/9/2021</td>
      </tr>
      <tr>
        <td>Surya</td>
        <td>Bad Guys</td>
        <td>21/7/2021</td>
      </tr>
      <tr>
        <td>Dinesh</td>
        <td>Giovanni Rovelli</td>
        <td>02/7/2021</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ReservedBooks'
}
</script>

<style scoped>
.reservedbooks-container {
    background-color: #F3F3E0; /* Màu nền của container */
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.reservedbooks-table {
    font-family: Arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    padding: 15px!important;
}

.reservedbooks-table td, .reservedbooks-table th {
    border: 2px solid #133E87; /* Màu viền bảng */
    text-align: left;
    padding: 8px;
    background-color: #CBDCEB; /* Màu nền ô trong bảng */
    color: #133E87; /* Màu chữ trong bảng */
}

.reservedbooks-title {
    position: relative;
    color: #133E87; /* Màu chữ tiêu đề */
    text-align: center;
    font-size: 32px;
}

/* Các ô tiêu đề (th) sẽ có màu khác biệt để tạo điểm nhấn */
.reservedbooks-table th {
    background-color: #608BC1; /* Màu nền của ô tiêu đề */
    color: #F3F3E0; /* Màu chữ ô tiêu đề */
}

</style>
