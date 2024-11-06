<script>
import Footer from '@/components/Footer.vue';
import PhotoGallery from '@/components/PhotoGallery.vue';

export default {
  name: 'About',
  components: {
    PhotoGallery,
    Footer
  }
};
</script>
<template>
  <div class="" id="about">
    <div class="about-box mt-5" >
    <h2 class="about-title">Về chúng tôi Lacos Library</h2>
    <div class="about-data">
      <div class="about-img">
        <img
          src="/public/2.svg"
          alt=""
        />
      </div>
      <div>
        <p class="about-text">
          Thư viện Lacos mang đến trải nghiệm thoải mái tiện lợi<br />
          <br />
          Được tin dùng hơn 100 máy chủ<br />
          <br />
          Đa dạng các loại sách<br />
          <br />
          Hãy trải nghiệm và đưa ra đánh giá
        </p>
      </div>
    </div>
  </div>
  </div>
  <PhotoGallery/>
<Footer/>

</template>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

.about-box {
    background-color: #F3F3E0; /* Màu nền chính của box */
}

/* Mobile View */
@media screen and (max-width: 768px) {
    .about-data {
        display: grid;
    }
    .about-data p {
        margin-left: 16px;
        margin-right: 16px;
        font-size: 13px;
        font-family: 'Poppins', sans-serif;
        text-align: justify;
        padding: 15px;
        color: #133E87; /* Màu chữ cho đoạn văn */
    }
}

/* Desktop View */
.about-title {
    position: relative;
    color: #133E87; /* Màu chữ của tiêu đề */
    text-align: center;
    font-size: 32px;
    padding: 25px;
}

.about-img img {
    width: 100%;
    max-width: 700px;
    border-radius: 25px;
    padding: 15px;
    background-color: #CBDCEB; /* Màu nền của ảnh */
    border: 2px solid #608BC1; /* Viền của ảnh */
}

@media screen and (min-width: 768px) {
    .about-data p {
        margin-left: 50px;
        margin-right: 50px;
        font-size: 15px;
        font-family: 'Poppins', sans-serif;
        text-align: justify;
        color: #133E87; /* Màu chữ cho đoạn văn */
        padding: 15px;
    }
    .about-data {
        display: grid;
        grid-template-columns: 50% 50%;
    }
}

</style>
