import { useContext } from "react";

import { OrdersModalContext } from "../contexts/index";

export const useOrdersModalContext = () => {
    const { ordersModalVisible, setOrdersModalVisible } =
        useContext(OrdersModalContext);
    return { ordersModalVisible, setOrdersModalVisible };
};