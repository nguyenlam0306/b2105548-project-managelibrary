<template>
  <div class="books-page">
    <div class="books">
      <div class="book-card" v-for="book in books" :key="book.title">
        <img :src="book.image" alt="" />
        <p class="bookcard-title">{{ book.title }}</p>
        <p class="bookcard-author">By {{ book.author }}</p>
        <div class="bookcard-category">
          <p>{{ book.category }}</p>
        </div>
        <div class="bookcard-emptybox"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllBooks",
  data() {
    return {
      books: [
        {
          title: "Wings Of Fire",
          author: "Pranavdhar",
          category: "Auto Biography",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp16xiXu1ZtTzbLy-eSwEK4Ng6cUpUZnuGbQ&usqp=CAU",
        },
        {
          title: "The Power Of Your Subconscious Mind",
          author: "Joseph",
          category: "Psychology",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU",
        },
        {
          title: "Elon Musk",
          author: "Elon",
          category: "Auto Biography",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRFiDRQ7a-Oo-CnMmnbIMApP1Cq9B5bYx-UA&usqp=CAU",
        },
        {
          title: "The Subtle Art Of Not Giving A Fuck",
          author: "Mark Manson",
          category: "COMIC",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Rb2t6jA5ml7n57qdTZbAOWX1qSfsLCbaOA&usqp=CAU",
        },
      ],
    };
  },
};
</script>

<style scoped>
.books-page{
    height: 100vh;
    width: 100vw;
    background-color: wheat;
}

.books{
    margin: 60px auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 15px;
    max-width: 1024px;
}

.book-card{
    display: flex;
    flex-direction: column;
    box-sizing: content-box;
    height: auto;
    width: 250px;
    align-items: center;
    padding: 25px;
    margin: 10px;
    -webkit-box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    border-radius: 15px;
    position: relative;
    background-color: rgb(238, 238, 238);
}

.book-card img{
    width: 150px;
    height: auto;
    margin-bottom: 25px!important;
    border-radius: 18px;
}

.book-card img:hover{
    transform: scale(1.05);
    transition: all ease 1.3s;
}

.bookcard-title{
    word-wrap: break-word;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
}

.bookcard-author{
    color: rgb(141, 140, 140);
    font-size: 14px;
    font-weight: 900;
}

.bookcard-category{
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    bottom: 5%;
    left: 5%;
}

.bookcard-category p{
    padding: 8px 15px;
    background-color: lightgray;
    font-weight: 600;
    margin: 5px;
    border-radius: 5px;
}

.bookcard-emptybox{
    height: 50px;
    position: relative;
    bottom: 0%;
    background-color: rgb(0, 0, 0);
}
</style>
