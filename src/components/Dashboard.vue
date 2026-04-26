<!-- https://bossanova.uk/jspreadsheet/docs/vue -->
<template>
    <Spreadsheet
        ref="spreadsheet"
        :onchange="onChange"
        :onafterchanges="onAfterChanges"
    >
        <Worksheet :data="data" :columns="columns" />
    </Spreadsheet>
    <input type="button" value="getData" @click="getData" />
</template>

<script setup lang="ts">
import { Spreadsheet, Worksheet } from '@jspreadsheet-ce/vue'
import 'jspreadsheet-ce/dist/jspreadsheet.css'
import 'jsuites/dist/jsuites.css'
import { ref } from 'vue'

function onChange(
    _instance: any,
    _cell: HTMLTableCellElement | null,
    x: string | number,
    y: string | number,
    value: any,
    oldValue: any
) {
    console.log('onChange', { x, y, value, oldValue })
}

function onAfterChanges(
    _instance: any,
    changes: Array<{ x: string; y: string; value: any; oldValue: any }>
) {
    console.log('onAfterChanges', changes)
}

const data = ref([
    ['US', 'Cheese', '2019-02-12'],
    ['CA', 'Apples', '2019-03-01'],
    ['CA', 'Carrots', '2018-11-10'],
    ['BR', 'Oranges', '2019-01-12'],
])

const columns = ref([
    { title: 'Country', width: '300px' },
    { title: 'Product', width: '200px' },
    { title: 'Date', width: '200px' },
])

const spreadsheet = ref<any>(null)

const getData = () => {
    const sheet = spreadsheet.value?.current?.[0]
    if (!sheet) return

    console.log(sheet.getData())
}
</script>
