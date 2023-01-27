import * as R from "ramda";

export const isEmpty = (x: any) => {
    return !R.is(String, x) || R.isEmpty(x);
};