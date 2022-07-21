

export default {

    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldproduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldproduct) {
                context.commit('addCounter', oldproduct)
                resolve('当前数量加1')
            } else {
                payload.count = 1
                //    context.state.cartList.push(payload)
                context.commit('addToCart', payload)
                resolve('添加了新的商品')
            }
        })
    }
}
