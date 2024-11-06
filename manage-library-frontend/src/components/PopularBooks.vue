<template>
  <div class="popularbooks-container">
    <h1 class="popularbooks-title">Sách nổi bật</h1>
    <div class="popularbooks">
      <div class="popularbook-images">
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
          alt=""
        />
      </div>
      <div class="popularbook-images">
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS34iIDoKVXOhKhdwsiGSLc9RJmtq_lSQDig&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRHNwRyPkTxnMOzOvv5dOK4OS_lq4-2Yugg&usqp=CAU"
          alt=""
        />
        <img
          class="popular-book"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ElcNy_v2Ri1H3VhYjYP1MzR6zBUwFQWbOirCkaqcfOqJnbrK5ZvdZNUwEfrlmJwn7pA&usqp=CAU"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopularBooks'
}
</script>

<style scoped>
.popularbooks-container{
    background-color: #cfe9f1;
    display: flex;
    flex-direction: column;
}

.popularbooks{
    padding: 20px;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;	
    position: relative;
	display: flex;
    height: auto;
}

.popularbooks:hover div{
    animation-play-state: paused;
}

.popularbooks-title{
    position: relative;
    color: #0E2431;
    margin-top: 20px;
    margin-bottom: 50px;
    text-align: center;
    font-size: 32px;
}

.popular-book:hover{
    transform: scale(1.15);
    transition: all ease 0.7s;
    animation-play-state: paused;
}

.popularbook-images{
    animation: marquee 15s linear infinite;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
}

.popular-book{
    display: block;
    width: 150px;
    height: auto;
    margin: 0 1vw;
    border-radius: 5px;
}

@keyframes marquee {
	0%   { transform: translateX(0%); }
	100% { transform: translateX(-100%); }
}
</style>
