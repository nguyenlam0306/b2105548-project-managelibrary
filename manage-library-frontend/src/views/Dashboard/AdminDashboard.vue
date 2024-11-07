<template>

    <div class="container-fluid">
        <div class="row">
            <SideBarMenu></SideBarMenu>
            <main class="col-md-9  col-lg-10  mt-2" style="min-height: 600px">
                <Suspense>
                    <template #default> <router-view></router-view></template>
                    <template #fallback>
                        Loadding ...
                    </template>
                </Suspense>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

import { RouterView } from 'vue-router';
import SideBarMenu from '../../components/SideBarMenu.vue'

const authStore = useAuthStore()
</script>

<style scoped>


</style>
