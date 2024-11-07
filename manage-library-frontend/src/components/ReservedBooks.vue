<template>
  <div class="reservedbooks-container">
    <h1 class="reservedbooks-title">Sách trên kệ</h1>
    <table class="reservedbooks-table">
      <thead>
        <tr>
        <th>Tác giả</th>
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
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 1200px;
    margin: 0 auto;
}

.reservedbooks-title {
    color: #133E87;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
}

.reservedbooks-table {
    font-family: Arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.reservedbooks-table th, .reservedbooks-table td {
    border: 2px solid #CBDCEB;
    text-align: left;
    padding: 12px;
}

.reservedbooks-table th {
    background-color: #608BC1;
    color: #F3F3E0;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
}

.reservedbooks-table td {
    background-color: #CBDCEB;
    color: #133E87;
    font-size: 16px;
}

/* Hiệu ứng hover cho hàng dữ liệu */
.reservedbooks-table tr:hover td {
    background-color: #B0C8E1;
    transition: background-color 0.3s ease;
}

/* Các ô có đường viền mềm mại */
.reservedbooks-table th, .reservedbooks-table td {
    border: none;
}


</style>
