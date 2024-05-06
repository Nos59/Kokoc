<template lang="pug">
    div(class="header" :class="{'header--auth': is_logged}")
        img(src="/full.png" height="30px" )
        UiButton(v-if="is_logged" @click="logout") Выйти
</template>

<script>
    import UiButton from '@/components/ui/UiButton.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'TheHeader',
        components: { UiButton },

        computed: {
            ...mapGetters('auth', ['is_logged'])
        },

        methods: {
            logout() {
                this.$store.dispatch('auth/logout')
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 30px;

        &--auth {
            background-color: $color-white;
        }
    }
</style>
