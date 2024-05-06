<template lang="pug">
    UiInput(
        :model-value="modelValue"
        :type="is_show_password ? 'text' : 'password'"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :loading="loading"
        :error="error"
        @update:model-value="(value) => $emit('update:modelValue', value)"
    )
        template(#right)
            div(class="ui-password" @mousedown="is_show_password = true" @mouseup="is_show_password = false")
                Eye(v-if="!is_show_password")
                Closed(v-else)
</template>

<script>
    import Closed from '@/assets/icon/eye-closed.svg'
    import Eye from '@/assets/icon/eye.svg'
    import UiInput from '@/components/ui/UiInput.vue'

    export default {
        name: 'UiPassword',
        components: {
            UiInput,
            Eye,
            Closed
        },
        props: {
            modelValue: { type: String },
            label: { type: String },
            placeholder: { type: String },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            error: {
                type: String
            }
        },
        emits: ['update:modelValue'],

        data() {
            return {
                is_show_password: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-password {
        cursor: pointer;
    }
</style>
