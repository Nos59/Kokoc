<template lang="pug">
    div(class="ui-loader")
        div(class="ui-loader__circle" :style="loader_style")
</template>

<script>
    export default {
        name: 'UiLoader',
        props: {
            size: {
                type: Number,
                default: 50
            },
            stroke: {
                type: Number,
                default: 7
            }
        },

        computed: {
            loader_style() {
                return [
                    { 'width' : `${this.size}px` },
                    { 'height' : `${this.size}px` },
                    { 'border-width' : `${this.stroke}px` }
                ]
            }
        }

    }
</script>

<style lang="scss" scoped>
    .ui-loader {
        display: inline-block;
        vertical-align: middle;

        &__circle {
            border-radius: 50%;
            border-style: solid;
            border-color: $color-gray;
            border-left-color: $color-graydark;
            animation: ui-loader 1s infinite linear;
        }
    }

    @keyframes ui-loader {
        0% {
            transform:rotate(0deg)
        }
        to {
            transform:rotate(1turn)
        }
    }
</style>

