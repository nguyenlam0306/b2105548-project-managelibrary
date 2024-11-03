<template>
  <div class="header">
    <div class="logo-nav">
      <router-link to="/">
        <a href="#home">LacosLibrary</a>
      </router-link>
    </div>

    <div class="nav-right">
      <input class="search-input" type="text" placeholder="Search a Book" />
      <ul :class="{ 'nav-options': true, 'active': menutoggle }">
        <li class="option" @click="closeMenu">
          <router-link to="/">
            <a href="#home">Trang chủ</a>
          </router-link>
        </li>
        <li class="option" @click="closeMenu">
          <router-link to="/books">
            <a href="#books">Sách</a>
          </router-link>
        </li>
        <li class="option" @click="closeMenu">
          <router-link to="/signin">
            <a href="signin"><font-awesome-icon :icon="['far', 'user']" /></a>
          </router-link>
        </li>
      </ul>
    </div>

    <div class="mobile-menu" @click="Toggle">
      <span v-if="menutoggle" class="menu-icon clear-icon" style="font-size: 40px"><font-awesome-icon :icon="['fas', 'xmark']" /></span>
      <span v-else class="menu-icon" style="font-size: 40px"><font-awesome-icon :icon="['fas', 'list']" /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menutoggle: false,
    };
  },
  methods: {
    Toggle() {
      this.menutoggle = !this.menutoggle;
    },
    closeMenu() {
      this.menutoggle = false;
    },
  },
};
</script>

<style scoped>
/*Desktop View*/
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 40px;
    height: 60px;
    width: 100%;
    position: fixed;
    z-index: 100;
    background-color: #0F1035; /* Updated color */
    box-shadow: 0 1px 4px rgba(146,161,176,.15);
    top: 0%;
}

.logo-nav a{
    font-size: 20px;
    color: #365486; /* Updated color */
    font-weight: 800;
}

.logo-nav a:hover{
    color: #7FC7D9; /* Updated color */
    transition: all ease 0.5s;
}

.search-input{
    width: 100%;
    margin-left: 15px;
    max-width: 1800px;
    height: 40px;
    outline: none;
    padding: 10px 15px;
    font-size: 18px;
    border-radius: 10px;
    border: 1px solid #DCF2F1; /* Updated color */
}

.nav-options{
    padding-left: 25px;
    display: flex;
    list-style-type: none;
    margin-bottom: 15px!important;
}

.nav-right{
    display: flex;
    align-items: center;
    justify-content: center;
}
  
.option{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 40px;
    margin-top: 15px;
    color: #365486; /* Updated color */
}

.option a{
    color: #365486; /* Updated color */
    display: flex;
    align-items: center;
    font-weight: 800;
    font-size: 18px;
}

.option a:hover{
    color: #7FC7D9; /* Updated color */
    transition: all ease 0.5s;
}

a{
    text-decoration: none!important;
}
  
.option:hover{
    color: #DCF2F1; /* Updated color */
}

.mobile-menu{
    display: block;
}

/* Nav Options are given in this to make the search input as big as possible */

@media (min-width: 768px){
    .mobile-menu{
        display: none!important;
    }
    .header{
        display: grid;
        grid-template-columns: 10% 60%;
    }
}

@media (max-width: 768px){
    /*Mobile View */
    .header{
        padding: 0px 10px;
    }
    .nav-options{
        display: flex;
        width: 100%;
        height: 280px;
        position: absolute;
        top: 60px;
        left: -100%;
        opacity: 0;
        transition: all 0.5s ease;
        flex-direction: column;
        list-style-type: none;
        grid-gap: 0px;
    }
    .nav-options.active{
        background: black;
        left: 0;
        opacity: 1;
        transition: all 0.5s ease;
        z-index: 100;
        align-content: center;
        padding-left: 0px;
    }
  
    .menu-icon{
        width: 45px;
        height: 45px;
        color: #365486; /* Updated color */
        padding: 2px;
        background-color: #DCF2F1; /* Updated color */
        border-radius: 5px;
        cursor: pointer;
        margin:0px 5px 0px 10px;
    }
    .option{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 10vw;
        padding: 30px 0px;
    }
}

</style>
