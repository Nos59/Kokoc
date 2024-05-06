<script>import UiButton from '@/components/ui/UiButton.vue'
    import UiInput from '@/components/ui/UiInput.vue'
    import UiPassword from '@/components/ui/UiPassword.vue'
    import { mapState } from 'vuex'

    export default {
        name: 'Auth',
        components: { UiButton, UiPassword, UiInput },
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                }
            }
        },
        computed: {
            ...mapState('auth', [
                'login_status'
            ]),

            disabled() {
                return !(!!this.form.email && !!this.form.password)
            }
        },
        methods: {
            submit() {
                this.$store.dispatch('auth/login', this.form)
            }
        }
    }
</script>

<template lang="pug">
    div(class='auth')
        h1 Вход
        div
            span Нет аккаунта?
            a  Зарегистрироваться
        form(class="auth__form" id="login" @submit.prevent="submit")
            UiInput(v-model="form.email" label="Email" placeholder="yourmail@mail.ru")
            UiPassword(v-model="form.password" label="Пароль" placeholder="Ваш пароль")
            a Забыли пароль?
        UiButton(type="submit" form="login" :loading="login_status.loading" :disabled="disabled") Войти
</template>

<style lang="scss" scoped>
    .auth {
        width: 430px;
        height: 500px;
        border-radius: 15px;
        box-shadow: 0 6px 8px 0 #00000029;
        background-color: $color-white;
        padding: 30px;
        display: flex;
        flex-direction: column;

        &__form {
            display: grid;
            grid-template-rows: 100px 100px;
            padding: 20px 0;
        }
    }
</style>
