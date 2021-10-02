import { ADD_COUNTER, ADD_TO_CART } from "./mutations-type";

export default {
    addCart(context, payload) {
        // let oldProduct = null;
        // for (let item of state.cartList) {
        //   if (item.iid === payload.iid) {
        //     oldProduct = item;
        //   }
        // }
        return new Promise((resolve) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct);
                resolve('当前商品数量+1');
            } else {
                payload.count = 1;
                // context.state.cartList.push(payload);
                context.commit(ADD_TO_CART, payload);
                resolve('已添加该商品');
            }
        })
    }
}