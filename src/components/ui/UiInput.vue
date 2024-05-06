<template lang="pug">
    div(class="ui-input" :class="{ 'ui-input--disabled': disabled }")
        div(v-if="label" class="ui-input__label caption") {{ label }}

        div(class="ui-input__inner" :class="`ui-input__inner--${this.size}`")
            div(v-if="$slots.left" class="ui-input__control")
                slot(name="left")
            input(
                ref="input"
                :value="modelValue"
                class="ui-input__field"
                :disabled="disabled"
                :type="type"
                :placeholder="placeholder"
                @input="event => $emit('update:modelValue', event.target.value)"
            )
            div(v-if="$slots.right || loading" class="ui-input__control")
                UiLoader(v-if="loading" :size="20" :stroke="3")
                slot(v-else name="right")

        div(v-if="error" class="ui-input__error") {{ error }}
</template>

<script>
    import UiLoader from '@/components/ui/UiLoader.vue'
    export default {
        name: 'UiInput',
        components: {
            UiLoader
        },
        props: {
            modelValue: { type: String, Number },
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
            size: {
                type: String,
                default: 'md'
            },
            type: {
                type: String,
                default: 'text'
            },
            error: {
                type: String
            }
        },
        emits: ['update:modelValue']
    }
</script>

<style lang="scss" scoped>
    .ui-input {
        width: 100%;
        &__inner {
            background-color: $color-buttongray;
            box-shadow: 0 1px 2px 0 #00000040 inset;
            position: relative;
            display: flex;
            border-radius: 6px;
            gap: 8px;
            padding: 0 16px;
            overflow: hidden;
            height: 100%;
            color: $color-black;

            &--md {
                height: 50px;
            }

            &--sm {
                height: 30px;
            }
        }

        &__control {
            display: flex;
            gap: 16px;
            align-items: center;
        }

        &__label {
            margin-bottom: 8px;
        }

        &__field {
            background-color: transparent;
            outline: none;
            border: unset;
            transition: .2s all ease-in-out;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            color: inherit;
            padding: 0;
        }

        &__error {
            color: $color-error;
            margin-top: 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            min-height: 25px;
        }

        &--disabled {
            pointer-events: none;
            .ui-input__inner {
                box-shadow: 0 1px 2px 0 #0000001A inset;
                background-color: #FAF9FA;
                color: #CECECF;
            }
        }

        &:focus-within:not(.ui-input--error) {
            .ui-input__inner {
                border: 1px solid $color-darkblue;
            }
        }

        input::placeholder {
            user-select: none;
            color: $color-gray;
        }
    }
</style>
