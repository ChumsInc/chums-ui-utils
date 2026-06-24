import {useEffect, useRef, useState} from "react";
import isEqual from "react-fast-compare";

export function useIsChanged<T = unknown>(value:T, compareTo:T, wait?:number) {
    const [changed, setChanged] = useState(false);
    const timeoutRef = useRef<number|null>(null);

    const cancel = () => {
        window.clearTimeout(timeoutRef.current ?? undefined)
    };

    useEffect(() => {
        cancel();
        timeoutRef.current = window.setTimeout(() => {
            const same = isEqual(value, compareTo);
            setChanged(!same);
        }, wait ?? 350);
    }, [value, compareTo, wait]);

    useEffect(() => {
        return cancel;
    }, []);
    return changed;
}
