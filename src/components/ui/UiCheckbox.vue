<template lang="pug">
    label(class="ui-checkbox")
        input(
            ref="checkbox"
            type="checkbox"
            class="ui-checkbox__checkbox"
            :indeterminate="indeterminate"
            :checked="modelValue"
            @input="event => $emit('update:modelValue', event.target.checked)"
        )
        span(v-if="label" ) {{ label }}
</template>

<script>
    export default {
        name: 'UiCheckbox',
        emits: ['update:modelValue'],
        props: {
            modelValue: {
                type: Boolean,
                default: false
            },
            label: {
                type: String
            },
            indeterminate: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-checkbox {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        user-select: none;

        .ui-checkbox__checkbox[type="checkbox"] {
            position: relative;
            appearance: none;
            background-color: inherit;
            margin: 0;
            width: 19px;
            height: 19px;
            border-radius: 6px;
            border: 1px solid $color-gray;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ui-checkbox__checkbox[type="checkbox"]::before {
            position: absolute;
            width: 13px;
            height: 13px;
            content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
            opacity: 0;
        }

        .ui-checkbox__checkbox[type="checkbox"]:checked {
            border-color: $color-green;
            background-color: $color-green;
        }

        .ui-checkbox__checkbox[type="checkbox"]:indeterminate {
            border-color: $color-green;
            background-color: $color-green;
        }

        .ui-checkbox__checkbox[type="checkbox"]:checked::before {
            opacity: 1;
        }
    }
</style>
