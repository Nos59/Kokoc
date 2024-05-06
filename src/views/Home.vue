<script>
    import ProductTable from '@/components/ProductTable.vue'
    import UiButton from '@/components/ui/UiButton.vue'
    import UiCheckbox from '@/components/ui/UiCheckbox.vue'
    import UiInput from '@/components/ui/UiInput.vue'
    import UiPagination from '@/components/ui/UiPagination.vue'
    import UiTable from '@/components/ui/UiTable.vue'
    import { mapState } from 'vuex'

    export default {
        name: 'Home',

        components: {
            UiCheckbox,
            ProductTable,
            UiTable,
            UiInput,
            UiButton,
            UiPagination
        },

        created() {
            this.$store.dispatch('product/getProducts')
        },

        computed: {
            ...mapState('product', ['products'])
        },

        methods: {
            paginate(page, per_page) {
                this.$store.dispatch('product/getProducts', { page, per_page })
            }
        }
    }
</script>

<template lang="pug">
    div(class="home")
        h2 Мои товары
        p Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
        p Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter
        div(class="home__add")
            UiInput(label="Добавление товаров" placeholder="Введите артикул продавца, артикул WB или ссылку на товар" )
            UiButton(disabled) Добавить
        ProductTable(
            :rows="products.results"
            :total="products.count"
            :loading="products.loading"
            @paginate="paginate"
        )

</template>

<style lang="scss" scoped>
    .home {
        width: 100%;
        padding: 15px;
        border-radius: 15px;
        background-color: white;

        &__add {
            display: flex;
            align-items: end;
            gap: 30px;
            width: 850px;
        }
    }
</style>
