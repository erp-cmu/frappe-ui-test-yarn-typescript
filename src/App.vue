<script setup lang="ts">
// import Home from './components/Home.vue'
// import Login from './components/Login.vue'
// import Nav from './components/Nav.vue'
</script>

<template>
    <nav>
        <RouterView name="nav" />
    </nav>
    <main class="container-mx-auto p-4">
        <RouterView />
    </main>
    <footer>
        <RouterView name="footer" />
    </footer>
</template>
