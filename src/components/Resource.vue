<template>
    <Button @click="todos.reload()" :loading="todos.loading"> Reload </Button>
    <pre>{{ todos }}</pre>
</template>

<script setup>
import { createResource } from 'frappe-ui'
import { useAuth } from '../composables/auth';
useAuth()
let todos = createResource({
    url: 'frappe.client.get_list',
    params: {
        doctype: 'ToDo',
        filters: {
            allocated_to: 'faris@frappe.io',
        },
    },
})
todos.fetch()
</script>
