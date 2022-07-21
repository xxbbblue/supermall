import Vue from 'vue'
import Vuex from "vuex"
import mutations from "./mutations"
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations,
    // 每个方法尽可能完成的事件比较单一一点，但是我们这里的addCart做了两件事：数量加一和新添加商品，这种有逻辑判断的放actions里面比较好
    // addCart(state, payload) {
    //     // state.cartList.push(payload)
    //     // 1.查找之前数组是否有该商品
    //     let oldproduct = state.cartList.find(item => item.iid === payload.iid)
    //     //判断oldproduct+1还是新添加
    //     if (oldproduct) {
    //         state.cartList.count += 1
    //     } else {
    //         payload.count = 1
    //         state.cartList.push(payload)
    //     }
    // }


    actions,
    getters
})

export default store
