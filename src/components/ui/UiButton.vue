<template lang="pug">
    button(class="ui-button" :class="button_class")
        div(class="ui-button__content")
            slot
        UiLoader(v-if="loading" :size="20" :stroke="3")
</template>

<script>
    import UiLoader from '@/components/ui/UiLoader.vue'
    export default {
        name: 'UiButton',
        components: {
            UiLoader
        },
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            variant: {
                type: String,
                default: 'green'
            },
            size: {
                type: String,
                default: 'md'
            }
        },
        computed: {
            button_class() {
                return [
                    { 'ui-button--disabled': this.disabled },
                    { 'ui-button--loading': this.loading },
                    `ui-button--${this.variant}`,
                    `ui-button--${this.size}`
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-button {
        position: relative;
        text-decoration: none;
        user-select: none;
        border-radius: 6px;
        cursor: pointer;
        border: 0;

        &--loading {
            cursor: default;
            pointer-events: none;
            .ui-button__content {
                opacity: 0;
            }
        }

        &__content {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: center;
            white-space: nowrap;
            font-weight: 600;
        }

        .ui-loader {
            left: 50%;
            position: absolute;
            top: 50%;
            transform: translate(-50%,-50%);
        }

        &:active {
            transform: translate3d(0, 1px, 0);
            box-shadow: none;
        }

        &--green {
            color: $color-white;
            background-color: $color-green;
        }

        &--grey {
            color: $color-darkblue;
            background-color: $color-buttongray;
        }

        &--md {
            height: 50px;
            padding: 17px 30px 18px 30px;
        }

        &--sm {
            height: 30px;
            padding: 12px 12px 13px 10px;
        }

        &--disabled {
            cursor: default;
            pointer-events: none;
            background-color: $color-buttongray;
            color: $color-gray;
        }
    }
</style>
