<script>
    import TheHeader from '@/components/TheHeader.vue'
    import { mapGetters } from 'vuex'

    export default {
        components: { TheHeader },
        computed: {
            ...mapGetters('auth', ['is_logged'])
        }
    }
</script>

<template lang="pug">
    div(class="main")
        TheHeader(class="header")
        div(class="content" :class="{'content--auth': is_logged}")
            RouterView
</template>

<style scoped lang="scss">
    .main {
        height: 100vh;
        display: grid;
        justify-content: center;
        grid-template-rows: 80px 1fr;
        grid-template-columns: 1fr minmax(320px, 1600px) 1fr;
        gap: 30px;

    }

    .header {
        grid-column: 1/-1;
    }

    .content {
        grid-column: 2/2;
        display: flex;
        align-items: center;
        justify-content: center;

        &--auth {
            align-items: start;
        }
    }
</style>
