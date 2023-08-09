// import { MutableRefObject, useRef } from 'react';

// const useFocus = (): [any, () => void] => {
//     const htmlElRef: MutableRefObject<any> = useRef(null);
//     const setFocus = (): void => {
//         htmlElRef?.current?.focus?.();
//     };

//     return [htmlElRef, setFocus];
// };

// export default useFocus;

import React from "react";

export default function useFocus<T extends HTMLElement = HTMLElement>() {
    const ref = React.useRef<T>(null);
    const setFocus = () => ref?.current?.focus?.();

    return [ref, setFocus] as const;
}

// const [focusRef, setFocus] = useFocus<HTMLButtonElement>();