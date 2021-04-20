<template>
    <div class="container">home</div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
// interface dataProps {}
export default {
    name: 'App',
    setup() {
        const data = reactive({});
        const refData = toRefs(data);
        return {
            ...refData,
        };
    },
};
</script>

<style lang="scss" scoped></style>
