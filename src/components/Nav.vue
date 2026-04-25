<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'

import { useAuth } from '../composables/auth'
import { httpRequestFactory } from '../utils/req'

const { refetch } = useAuth()

const { mutate, isPending } = useMutation({
    mutationFn: () => httpRequestFactory('POST', '/api/method/logout')(),
    onSuccess: () => {
        console.log('Logout successful')
        refetch()
    },
    onError: (error) => {
        console.error('Logout failed', error)
    },
})
</script>

<template>
    <nav>
        <button @click="mutate()" :disabled="isPending">
            {{ isPending ? 'Logging out...' : 'Logout' }}
        </button>
    </nav>
</template>
