import {useEffect, useRef, useState} from "react";
import isEqual from "react-fast-compare";

export default function useIsChanged<T = unknown>(value:T, compareTo:T, wait?:number) {
    const [changed, setChanged] = useState(false);
    const timer = useRef<number>(0)
    useEffect(() => {
        timer.current = window.setTimeout(() => {
            const same = isEqual(value, compareTo);
            setChanged(!same);
        }, wait ?? 350);
        return () => {
            window.clearTimeout(timer.current);
        }
    }, [value, compareTo, wait]);
    return changed;
}
