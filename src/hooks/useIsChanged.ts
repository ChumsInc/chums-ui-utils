import {useEffect, useState} from "react";
import isEqual from "react-fast-compare";

export default function useIsChanged<T = unknown>(value:T, compareTo:T) {
    const [changed, setChanged] = useState(false);
    useEffect(() => {
        const same = isEqual(value, compareTo);
        setChanged(!same);
    }, [value, compareTo]);
    return changed;
}
