<script setup lang="ts"></script>

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
