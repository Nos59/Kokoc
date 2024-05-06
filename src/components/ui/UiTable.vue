<template lang="pug">
    div(class="ui-table" :style="table_style")
        div(class="ui-table__headers")
            div(v-for="header in headers" class="ui-table__header")
                slot(:name="`header-${header.field}`" v-bind="header") {{ header.title }}
        div(v-if="$slots.action" class="ui-table__row")
            slot(name="action")

        div(v-if="loading" v-for="row in rows" class="ui-table__row")
            div(v-for="header in headers" class="ui-table__cell")
                div(class="ui-table__skeleton")

        div(v-else v-for="row in rows" class="ui-table__row")
            div(v-for="header in headers" class="ui-table__cell")
                slot(:name="header.field" v-bind="row") {{ getCellContent(row, header) }}
</template>

<script>
    import UiLoader from '@/components/ui/UiLoader.vue'

    export default {
        name: 'UiTable',
        components: { UiLoader },

        props: {
            rows: {
                type: Array,
                required: true
            },

            headers: {
                type: Array,
                required: true
            },

            loading: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            table_style() {
                return {
                    '--grid-template-columns': this.headers
                        .map((item) => item.width || 'minmax(min-content, auto)')
                        .join(' ')
                }
            }
        },

        methods: {
            getCellContent(row, header) {
                return row[header.field]
            }
        }
    }
</script>

<style lang="scss">
    .ui-table {
        width: 100%;
        position: relative;
        display: grid;
        grid-template-columns: var(--grid-template-columns);
        grid-auto-rows: 80px;
        column-gap: 10px;
        overflow: auto;

        &__headers,
        &__row {
            grid-column: 1/ -1;
            display: grid;
            grid-template-columns: subgrid;
            border-bottom: 1px solid #00000033;
            cursor: default;
            align-items: center;
        }
        &__cell, &__header, &__skeleton {
            padding: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        &__header {
            color: $color-gray;
        }

        &__skeleton {
            background-color: $color-gray;
            opacity: 0.5;
            border-radius: 6px;
            position: relative;
            &::after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                transform: translateX(-100%);
                background-image: linear-gradient(
                        90deg,
                        rgba(#fff, 0) 0,
                        rgba(#fff, 0.2) 20%,
                        rgba(#fff, 0.5) 60%,
                        rgba(#fff, 0)
                );
                animation: shimmer 3s infinite;
                content: '';
            }
            @keyframes shimmer {
                100% {
                    transform: translateX(100%);
                }
            }
        }
    }

    .ui-table-loading {
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
