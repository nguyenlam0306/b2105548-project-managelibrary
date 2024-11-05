<template>
  <div class="reservedbooks-container">
    <h1 class="reservedbooks-title">Sách trên kệ</h1>
    <table class="reservedbooks-table">
      <tr>
        <th>Tên sách</th>
        <th>Sách</th>
        <th>Ngày</th>
      </tr>
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
    </table>
  </div>
</template>

<script>
export default {
  name: 'ReservedBooks'
}
</script>

<style scoped>
.reservedbooks-container{
    background-color: rgb(16,25,13);
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.reservedbooks-table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    max-width: 1024px;
    margin: 0px auto;
    padding: 15px!important;
}
  
.reservedbooks-table td,.reservedbooks-table th {
    border: 2px solid #696969;
    text-align: left;
    padding: 8px;
    background-color: #dddddd;
}

.reservedbooks-title{
    position: relative;
    color: rgb(238,129,30);
    text-align: center;
    font-size: 32px;
}
</style>
