<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { Button } from 'frappe-ui'
import { TextInput } from 'frappe-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuth } from '../composables/auth'
import { httpRequestFactory } from '../utils/req'

const username = ref('')
const password = ref('')

const { refetch } = useAuth()
const router = useRouter()
const { mutate, isPending } = useMutation({
    mutationFn: (credentials: { usr: string; pwd: string }) =>
        httpRequestFactory('POST', '/api/method/login', credentials)(),
    onSuccess: (data) => {
        console.log('Login successful', data)
        refetch()
        router.push('/')
    },
    onError: (error) => {
        console.error('Login failed', error)
    },
})
</script>

<template>
    <h1 class="text-2xl font-bold mb-4">Login</h1>
    <form class="flex flex-col space-y-4 max-w-sm">
        <TextInput label="Username" placeholder="Username" v-model="username" />
        <TextInput
            label="Password"
            type="password"
            placeholder="Password"
            v-model="password"
        />
        <Button
            @click="mutate({ usr: username, pwd: password })"
            :disabled="isPending"
        >
            {{ isPending ? 'Logging in...' : 'Login' }}
        </Button>
    </form>
</template>
