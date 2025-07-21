import { useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";
export default function useIsChanged(value, compareTo, wait) {
    const [changed, setChanged] = useState(false);
    const timeoutRef = useRef(0);
    useEffect(() => {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            const same = isEqual(value, compareTo);
            setChanged(!same);
        }, wait ?? 350);
    }, [value, compareTo, wait]);
    useEffect(() => {
        return () => {
            window.clearTimeout(timeoutRef.current);
        };
    }, []);
    return changed;
}
