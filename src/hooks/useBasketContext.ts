import { useContext } from "react";

import { BasketContext } from ".././contexts/index";

export const useBasketContext = () => {
    const basket = useContext(BasketContext);
    console.log("useBasketContext", basket)
    return basket;
};