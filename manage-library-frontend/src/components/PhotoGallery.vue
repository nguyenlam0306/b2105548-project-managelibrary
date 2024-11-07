<template>
  <div class="photogallery-container">
    <h1 class="photogallery-title">Người nổi tiếng ghé thăm</h1>
    <div class="photogallery-images">
      <img src="https://images.pexels.com/photos/2386687/pexels-photo-2386687.jpeg" alt="" />
      <img src="https://images.pexels.com/photos/3094218/pexels-photo-3094218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sách 1" />
      <img src="https://images.pexels.com/photos/3253724/pexels-photo-3253724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sách 2" />
      <img src="https://images.pexels.com/photos/949274/pexels-photo-949274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sách 3" />
    </div>
    <button>
      Nhiều hơn
      <i class="fas fa-arrow-right" style="font-size: 20px;"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PhotoGallery'
}
</script>

<style scoped>
.photogallery-container {
  width: 100%;
  height: auto;
  background-color: #F3F3E0;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.photogallery-title {
  padding-top: 15px;
  text-align: center;
  color: #133E87;
}

.photogallery-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 15px;
}

.photogallery-images img {
  width: 100%;
  max-width: 400px;
  max-height: 400px;
  display: block;
  border-radius: 5px;
  transition: all 100ms ease-out;
  border: 2px solid #CBDCEB;
}

.photogallery-images img:hover {
  transform: scale(1.04);
  transition: all ease 0.5s;
}

.photogallery-container button {
  font-size: 18px;
  font-weight: 800;
  padding: 8px 5px;
  border-radius: 5px;
  margin-left: 12px;
  width: 160px;
  color: #F3F3E0;
  border: 1px solid #608BC1;
  background-color: #133E87;
}

.photogallery-container button:hover {
  background-color: #F3F3E0;
  color: #133E87;
  border: 1px solid #133E87;
  transition: all ease 0.5s;
}
</style>
