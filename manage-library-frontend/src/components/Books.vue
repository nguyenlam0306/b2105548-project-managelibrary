<script setup>
import { ref } from "vue"
import { RouterView, RouterLink } from "vue-router";

const tab = ref("AllBooks")

</script>

<template>
    <div class="btn-group">
        <router-link to="/books/all" class="btn btn-primary" :class="tab == 'AllBooks' ? 'active' : ''"
            @click="tab = 'AllBooks'">Kho sách
            products</router-link>
        <router-link to="/books/add" class="btn btn-primary" :class="tab == 'AddBook' ? 'active' : ''"
            @click="tab = 'AddBook'">Thêm sách
            product</router-link>
    </div>
    <div>
        <Suspense>
            <template #default> <router-view></router-view></template>
            <template #fallback>
                Loadding ...
            </template>
        </Suspense>
    </div>
</template>

<style scoped>
.btn-primary {
    background-color: #006f3c;
    border-color: #006f3c;
}

.btn.active {
    background-color: #03914e;
}
</style>