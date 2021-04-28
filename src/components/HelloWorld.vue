<template>
    <div>msg</div>
    <div>msg</div>
    <div>msg</div>
    <div>msg</div>
    <div>msg</div>
    <div>msg</div>
    <div>msg</div>
    <div>msg</div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    // import { useStore } from 'vuex'
    // import { key } from '../store'

    export default defineComponent({
        name: 'HelloWorld'
        // props: {
        //     msg: {
        //         type: String,
        //         required: true
        //     }
        // },
        // setup: async () => {
        //     const store = useStore(key)
        //     const count = computed(() => store.state.count)

        //     const { ctx } = getCurrentInstance() as any
        //     // const res = await ctx.$api.get('home.banner')
        //     // console.log('%c 🥝 res: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', res);

        //     return { count, inCrement: () => store.commit('increment') }
        // }
    })
</script>

<style scoped>
    a {
        color: #42b983;
    }

    label {
        margin: 0 0.5em;
        font-weight: bold;
    }

    code {
        background-color: #eee;
        padding: 2px 4px;
        border-radius: 4px;
        color: #304455;
    }
</style>
