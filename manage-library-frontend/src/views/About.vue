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
    <h2 class="about-title">Tầm nhìn Lacos Library</h2>
    <div class="about-data">
      <div class="about-img">
        <img
          src="/public/4.svg"
          alt=""
        />
      </div>
      <div>
        <p class="about-text">
         Quản lý dữ liệu sách dễ dàng – Thay vì theo dõi từng đầu sách bằng giấy tờ hoặc hệ thống cũ, bạn có thể lưu trữ mọi thông tin từ tiêu đề, tác giả, năm xuất bản, giá cả, đến ảnh bìa sách một cách đầy đủ và rõ ràng.

Truy cập thông tin nhanh chóng – Người dùng có thể tra cứu sách theo tiêu đề, tác giả, hoặc thể loại chỉ trong vài giây. Điều này giúp tiết kiệm thời gian đáng kể cho cả nhân viên và người dùng thư viện.

Bảo mật và phân quyền linh hoạt – Với tính năng xác thực và phân quyền chi tiết, nhân viên thư viện và người dùng đều có quyền truy cập theo nhu cầu, đảm bảo an toàn và thuận tiện khi sử dụng.

Tối ưu hóa trải nghiệm người dùng – Giao diện đẹp mắt và thân thiện, được thiết kế với các màu sắc hài hòa giúp bạn có trải nghiệm sử dụng thoải mái và dễ dàng.
        </p>
      </div>
    </div>
  </div>
  </div>
  <div class="" id="about">
    <div class="about-box " >
    <h2 class="about-title">Nhà sáng  lập Lacos Library</h2>
    <div class="about-data">
     
      <div>
        <p class="about-text">
         Việc tạo ra giá trị kết nối trong cuộc sống giúp bạn có lối sống tiện nghi hơn.
         Mục tiêu của chúng tôi là giúp thư viện trở nên thông minh, hiệu quả và gần gũi hơn với cộng đồng. Ứng dụng này không chỉ là công cụ, mà còn là giải pháp để quản lý thư viện thời đại mới, đáp ứng nhu cầu thông tin một cách chuyên nghiệp và nhanh chóng.
         <br />
         
        </p>
      </div>
       <div class="about-img">
        <img
          src="/public/6.svg"
          alt=""
        />
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
