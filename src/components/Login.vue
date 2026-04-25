<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { ref } from 'vue'

import { useAuth } from '../composables/auth'
import { httpRequestFactory } from '../utils/req'

const username = ref('')
const password = ref('')

const { refetch } = useAuth()

const { mutate, isPending } = useMutation({
    mutationFn: (credentials: { usr: string; pwd: string }) =>
        httpRequestFactory('POST', '/api/method/login', credentials)(),
    onSuccess: (data) => {
        console.log('Login successful', data)
        refetch()
    },
    onError: (error) => {
        console.error('Login failed', error)
    },
})
</script>

<template>
    <div>Login</div>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button
        @click="mutate({ usr: username, pwd: password })"
        :disabled="isPending"
    >
        {{ isPending ? 'Logging in...' : 'Login' }}
    </button>
</template>
