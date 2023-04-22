import React, { createContext, PropsWithChildren, useReducer, useEffect  } from "react";
import { useMany } from "@refinedev/core";

import { IBasketOrder } from ".././interfaces/basket";
//import { IProduct } from ".././interfaces/property";
 import { PropertyCardProps } from ".././interfaces/property";
import { OrdersModalContextProvider } from "../contexts/index";

export const BasketContext = createContext<{
    orders: IBasketOrder[];
    dispatch: Function;
    totalPrice: number;
    products: PropertyCardProps[];
}>({ orders: [], dispatch: () => null, totalPrice: 0, products: [] });

const initialBasket: IBasketOrder[] = [];

const basketReducer = (
    state: IBasketOrder[],
    action: {
        payload: IBasketOrder;
        type: string;
    },
): IBasketOrder[] => {
    switch (action.type) {
        case "addProduct":
            return [...state, { ...action.payload }];
        case "resetBasket":
            return [];
        default:
            return [];
    }
};
export const BasketContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {
    console.log('BasketContextProvider rendered'); // <-- add this line
    const [orders, dispatch] = useReducer(basketReducer, initialBasket);
    const isBasketHaveOrders = orders.length > 0;

    console.log("basketState: ", { orders, dispatch });

    const productIds = orders
        .map((o) => o.productId)
        .filter((value, index, array) => array.indexOf(value) === index);

    const { data: productsData } = useMany<PropertyCardProps>({
        resource: "products",
        ids: productIds,
        queryOptions: {
            enabled: isBasketHaveOrders,
        },
    });

    const totalPrice = orders.reduce((total, currentValue) => {
        const product = productsData?.data.find(
            (value) => value.id === currentValue.productId,
        );

        return total + currentValue.amount * (product?.cost ?? 0);
    }, 0);

    useEffect(() => {
        console.log("Orders changed:", orders);
      }, [orders]);

    return (
        <BasketContext.Provider
            value={{
                orders,
                dispatch,
                totalPrice,
                products: productsData?.data ?? [],
            }}
        >
            <OrdersModalContextProvider>{children}</OrdersModalContextProvider>
        </BasketContext.Provider>
    );
};