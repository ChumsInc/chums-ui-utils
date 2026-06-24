import { useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";
export function useIsChanged(value, compareTo, wait) {
    const [changed, setChanged] = useState(false);
    const timeoutRef = useRef(null);
    const cancel = () => {
        window.clearTimeout(timeoutRef.current ?? undefined);
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
