<template>
  <div class="footer">
    <div>
      <div class="footer-data">
        <div class="contact-details">
          <h1>Liên hệ</h1>
          <p>Quản lý thư viện</p>
          <p>Phòng học Lacos</p>
          <p>Nguyen Phu Lam B2105548</p>          
          <p>Can Tho University</p>
          <p><b>Email:</b> mangelibrary@gmail.com</p>
        </div>
        <div class="useful-links">
          <h1>Link quan trọng</h1>
          <a href="#home">About us</a>  
        </div>
        <div class="librarian-details">
          <h1>Quản lý thư viện</h1>
          <p>Lacos</p>
          <p>Tổ chức giáo dục</p>
          <p>Contact: +84  123456789</p>
        </div>
      </div>
      <div class="contact-social">
        <a href="#home" class="social-icon">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#home" class="social-icon">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="#home" class="social-icon">
          <i class="fab fa-telegram"></i>
        </a>
        <a href="#home" class="social-icon">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
    <div class="copyright-details">
      <p class="footer-copyright">
        &#169; 2024<br />
        <span>Lacos library</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

.footer {
  display: flex;
  flex-direction: column;
  background-color: #133E87; /* màu nền chính */
  color: #F3F3E0; /* màu chữ */
  padding: 20px; 
}

.footer-data {
  display: flex;
  justify-content: space-around;
  max-width: 1000px;
  margin: auto;
}

.contact-details, .useful-links, .librarian-details {
  text-align: left;
  letter-spacing: 1.5px;
  margin: 15px;
}

.useful-links a {
  color: #CBDCEB; /* màu nhấn cho các liên kết */
}

.contact-details h1, .useful-links h1, .librarian-details h1 {
  font-size: 22px;
  color: #608BC1; /* màu nhấn cho tiêu đề */
  border-bottom: 2px solid #608BC1;
  padding-bottom: 8px;
  width: fit-content;
}

.contact-social {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.social-icon{
  font-size: 36px;
  color: #fafdff; /* màu cho các icon mạng xã hội */
  margin: 10px;
  padding: auto;
  transition: transform 0.3s;
}

.social-icon i:hover {
  transform: scale(1.1);
  color: #608BC1;
}

.copyright-details p {
  font-size: 16px;
  text-align: center;
  color: #F3F3E0;
  margin-top: 10px;
}

@media screen and (max-width: 768px) {
  .footer-data {
    flex-direction: column;
    align-items: center;
  }
}
</style>
