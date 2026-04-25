<script setup>
import { createResource } from 'frappe-ui'

import { useAuth } from '../composables/auth'

const { username, isLoading } = useAuth()
</script>

<template>
    <div v-if="isLoading">Loading...</div>
    <pre v-else>{{ username }}</pre>
</template>
