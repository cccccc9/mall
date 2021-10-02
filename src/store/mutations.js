import { ADD_COUNTER, ADD_TO_CART } from "./mutations-type";

export default {

    // 修改state中的状态
    [ADD_COUNTER](state, payload) {
        payload.count++;
        console.log(state.cartList);
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true;
        state.cartList.push(payload);
    }
}