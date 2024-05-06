<template lang="pug">
    div(class="product-table")
        UiTable(:headers="headers" :rows="rows" :loading="loading")
            template(#header-checkbox)
                UiCheckbox(
                    :model-value="selected_row.size === per_page"
                    :indeterminate="is_indeterminate"
                    @update:model-value="clickMultiCheckbox"
                )
            template(#checkbox="{ id }")
                UiCheckbox(:model-value="isSelected(id)" @update:model-value="check => clickCheckbox(id, check)")

            template(#action="" v-if="selected_row.size !== 0" )
                div(class="product-table__action")
                    div(class="product-table__delete")
                        span Выбрано {{ selected_row.size }} из {{ per_page }}
                        UiButton(variant="grey" size="sm" @click="deleteSelected")
                            DeleteSmall
                            span(style="margin-left: 5px") Удалить выделенные
                    div(class="ui-table__cell product-table__info") Для всех выделенных
                    div(class="ui-table__cell")
                        UiInput(
                            v-model="min_price"
                            @update:model-value="changeMinPrice"
                            size="sm"
                            placeholder="₽"
                            type="number"
                        )
                    div(class="ui-table__cell")
                        UiInput(
                            v-model="max_price"
                            @update:model-value="changeMaxPrice"
                            size="sm"
                            placeholder="₽"
                            type="number"
                        )

            template(#images="{images}")
                img(:src="images[0]" width="50px" height="50px")

            template(#min_price="{id}")
                UiInput(
                    v-model="min_price_map[id]"
                    size="sm"
                    placeholder="₽"
                    type="number"
                )

            template(#max_price="{id}")
                UiInput(
                    v-model="max_price_map[id]"
                    size="sm"
                    placeholder="₽"
                    type="number"
                )

            template(#remote_id)
                Delete

        UiPagination(:page="page" :total="total" @paginate="paginate" :per_page="per_page")
</template>

<script>
    import Delete from '@/assets/icon/delete.svg'
    import DeleteSmall from '@/assets/icon/delet-small.svg'
    import UiButton from '@/components/ui/UiButton.vue'
    import UiCheckbox from '@/components/ui/UiCheckbox.vue'
    import UiInput from '@/components/ui/UiInput.vue'
    import UiPagination from '@/components/ui/UiPagination.vue'
    import UiTable from '@/components/ui/UiTable.vue'

    export default {
        name: 'ProductTable',
        components: { UiButton, UiCheckbox, UiInput, UiPagination, UiTable, Delete, DeleteSmall },
        emits: ['paginate'],
        props: {
            rows: {
                type: Array,
                default: () => []
            },

            total: {
                type: Number,
                default: 1
            },

            loading: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                page: 1,
                per_page: 4,
                headers: [
                    { title: '', field: 'checkbox' },
                    { title: 'Фото', field: 'images' },
                    { title: 'Артикул продавца', field: 'items' },
                    { title: 'Бренд', field: 'brand_name' },
                    { title: 'Название', field: 'title', width: 'minmax(100px, 1fr)' },
                    { title: 'Остаток, шт.', field: 'quantity' },
                    { title: 'Текущая цена', field: 'price' },
                    { title: 'Минимальная цена', field: 'min_price' },
                    { title: 'Максимальная цена', field: 'max_price' },
                    { title: 'Удалить', field: 'remote_id' }
                ],
                selected_row: new Set(),
                min_price: null,
                max_price: null,
                min_price_map: {},
                max_price_map: {}
            }
        },

        computed: {
            is_indeterminate() {
                return this.selected_row.size > 0 && this.selected_row.size < this.per_page
            }
        },

        methods: {
            paginate(page) {
                this.page = page
                this.selected_row.clear()
                this.min_price = null
                this.max_price = null
                this.min_price_map = {}
                this.max_price_map = {}
                this.$emit('paginate', page, this.per_page)
            },

            isSelected(id) {
                return this.selected_row.has(id)
            },

            clickCheckbox(id, check) {
                if (check) {
                    this.selected_row.add(id)
                } else {
                    this.selected_row.delete(id)
                }
            },

            clickMultiCheckbox(check) {
                if (check) {
                    this.rows.forEach(item => this.selected_row.add(item.id))
                } else {
                    this.rows.forEach(item => this.selected_row.delete(item.id))
                }
            },

            deleteSelected() {
                console.log(this.selected_row)
            },

            changeMinPrice(value) {
                this.selected_row.forEach(item => {
                    this.min_price_map[item] = value
                })
            },

            changeMaxPrice(value) {
                this.selected_row.forEach(item => {
                    this.max_price_map[item] = value
                })
            }

        }
    }
</script>

<style scoped lang="scss">
    .product-table {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 50px;

        &__action {
            grid-column: 1/-1;
            display: grid;
            grid-template-columns: subgrid;
            background-color: #13263924;
        }

        &__info {
            grid-column: 6/8;
            text-align: right;
        }

        &__delete {
            display: flex;
            align-items: center;
            grid-column: 2/6;
            gap: 10px;
        }
    }
</style>
