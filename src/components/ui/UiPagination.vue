<template lang="pug">
    div(class="ui-pagination")
        div(class="ui-pagination__item ui-pagination__item--select")
            Arrow(class="ui-pagination__arrow-left" @click="prev")
        template(v-for="item in pages")
            div(v-if="item === '...'" class="ui-pagination__item") {{ item }}
            div(
                v-else
                @click="paginate(Number(item))"
                class="ui-pagination__item ui-pagination__item--select"
                :class="[{'ui-pagination__item--active': item === page}]"
            ) {{ item }}
        div(class="ui-pagination__item ui-pagination__item--select")
            Arrow(class="ui-pagination__arrow-right" @click="next")
</template>

<script>
    import Arrow from '@/assets/icon/arrow.svg'

    export default {
        name: 'uiPagination',
        components: {
            Arrow
        },
        props: {
            page: {
                type: Number,
                default: 1
            },
            per_page: {
                type: Number,
                default: 10
            },
            total: {
                type: Number,
                required: true
            },
            size: {
                type: Number,
                default: 7
            }
        },
        emits: ['paginate'],

        computed: {
            total_pages() {
                return Math.ceil(this.total / this.per_page)
            },

            pages() {
                if (this.size >= this.total_pages) {
                    return this.range(1, this.total_pages)
                }

                const middlePages = Math.floor((this.size - 4) / 2)
                const leftLimit = 3 + middlePages
                const rightLimit = this.total_pages - 2 - middlePages

                if (this.page <= leftLimit) {
                    return [...this.range(1, this.size - 2), '...', this.total_pages]
                }

                if (this.page >= rightLimit) {
                    return [1, '...', ...this.range(rightLimit - middlePages, this.size - 2)]
                }

                return [1, '...', ...this.range(this.page - middlePages, this.size - 4), '...', this.total_pages]
            }
        },

        methods: {
            paginate(value) {
                this.$emit('paginate', value)
            },

            next() {
                if (this.page < this.total_pages) {
                    this.$emit('paginate', this.page + 1)
                }
            },

            prev() {
                if (this.page > 1) {
                    this.$emit('paginate', this.page - 1)
                }
            },

            range(start, count) {
                return Array.from({ length: count }, (_, index) => start + index)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-pagination {
        display: flex;
        gap: 5px;

        &__item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 6px;
            user-select: none;
            &--select {
                cursor: pointer;

                &:hover {
                    background-color: $color-buttongray;
                }
            }

            &--active {
                background-color: #13263933;
            }
        }

        &__arrow-left {
            rotate: 90deg;
        }

        &__arrow-right {
            rotate: -90deg;
        }
    }
</style>
