<template>
  <div class="recentaddedbooks-container">
    <h1 class="recentbooks-title">Sách gần đây</h1>
    <div class="recentbooks">
      <div class="images">
        <img class="recent-book" src="https://inkinmytea.files.wordpress.com/2011/12/apj.jpg?w=640" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/91VokXkn8hL.jpg" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/71t4GuxLCuL.jpg" alt="" />
        <img class="recent-book" src="https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/81mXQdi5x+L.jpg" alt="" />
        <img class="recent-book" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1498813353l/34267304.jpg" alt="" />
        <img class="recent-book" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105" alt="" />
      </div>
      <div class="images">
        <img class="recent-book" src="https://inkinmytea.files.wordpress.com/2011/12/apj.jpg?w=640" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/91VokXkn8hL.jpg" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/71t4GuxLCuL.jpg" alt="" />
        <img class="recent-book" src="https://19en282jw7pc3zpwj22pg8v0-wpengine.netdna-ssl.com/wp-content/uploads/2021/01/Good-to-Great-Jim-Collins.jpg" alt="" />
        <img class="recent-book" src="https://images-na.ssl-images-amazon.com/images/I/81mXQdi5x+L.jpg" alt="" />
        <img class="recent-book" src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1498813353l/34267304.jpg" alt="" />
        <img class="recent-book" src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1588152105" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentAddedBooks'
}
</script>

<style scoped>
.recentaddedbooks-container {
    background-color: #F3F3E0; /* Màu nền chính cho container */
    display: flex;
    flex-direction: column;
}

.recentbooks {
    padding: 20px;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;
    display: flex;
}

.recentbooks:hover div {
    animation-play-state: paused;
}

.recentbooks-title {
    position: relative;
    color: #133E87; /* Màu chữ tiêu đề */
    font-size: 32px;
    text-align: center;
}

.recent-book:hover {
    transform: scale(1.15);
    transition: all ease 0.7s;
    animation-play-state: paused;
}

.images {
    animation: marquee 15s linear infinite;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
}

.recent-book {
    display: block;
    width: 150px;
    height: auto;
    margin: 0 1vw;
    border-radius: 5px;
    border: 2px solid #608BC1; /* Viền của ảnh */
    background-color: #CBDCEB; /* Màu nền cho ảnh */
}

@keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-100%); }
}

</style>
