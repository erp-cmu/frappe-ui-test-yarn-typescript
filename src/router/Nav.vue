<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { Badge, Button } from 'frappe-ui'
import { useRouter } from 'vue-router'

import { useAuth } from '../composables/auth'
import { httpRequestFactory } from '../utils/req'

const { username, refetch } = useAuth()

const router = useRouter()

const { mutate, isPending } = useMutation({
    mutationFn: () => httpRequestFactory('POST', '/api/method/logout')(),
    onSuccess: () => {
        console.log('Logout successful')
        refetch()
        router.push('/')
    },
    onError: (error) => {
        console.error('Logout failed', error)
    },
})
</script>

<template>
    <div class="bg-gray-300 flex items-center justify-between p-4">
        <ul class="flex items-center space-x-4">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li v-if="username">
                <RouterLink to="/dashboard">Dashboard</RouterLink>
            </li>
        </ul>
        <div class="flex items-center space-x-4">
            <Badge v-if="username" :label="username" />
            <Button v-if="username" @click="mutate()" :disabled="isPending">
                {{ isPending ? 'Logging out...' : 'Logout' }}
            </Button>
            <Button v-if="!username">
                <RouterLink to="/signin">Login</RouterLink>
            </Button>
        </div>
    </div>
</template>
