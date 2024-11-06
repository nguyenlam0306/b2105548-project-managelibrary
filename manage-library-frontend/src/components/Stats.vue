<template>
  <div class="stats">
    <div class="stats-block">
     <i class="fa-solid fa-book-open"></i>
      <p class="stats-title">Tổng số sách</p>
      <p class="stats-count">300</p>
    </div>
    <div class="stats-block">
     <i class="fa-regular fa-user"></i>
      <p class="stats-title">Truy cập</p>
      <p class="stats-count">80</p>
    </div>
    <div class="stats-block">
      
      <p class="stats-title">Đã đặt hàng</p>
      <p class="stats-count">78</p>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Stats'
};
</script>

<style scoped>
.stats{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(247,235,215);
    flex-wrap: wrap;
    padding: 20px;
}

.stats-icon{
    align-items: center;
}

.stats-block{
    height: 170px;
    width: 150px;
    border-radius: 10px;
    margin: 25px;
    -webkit-box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}
</style>
