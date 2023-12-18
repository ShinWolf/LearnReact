import { useEffect, useRef, useState } from "react";

/**
 * Modifie le titre
 * 
 * @param {String} title
 */
export function useDocumentTitle(title) {

    const titlteRef = useRef(document.title);

    useEffect(() => {
        const originalTitle = titlteRef.current;
        return () => {
            document.title = originalTitle;
        }
    }, []);

    useEffect(() => {
        document.title = title ? title : titlteRef.current;
    }, [title]);


}