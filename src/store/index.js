import auth from '@/store/modules/auth'
import product from '@/store/modules/product.js'
import { createStore } from 'vuex'

export default createStore({
    modules: {
        auth,
        product
    }
})
