import axios from "axios";
import { createContext } from "react";
import router from "next/router";
import { useEffect, useState, useContext } from "react";
import {TranslationHelper } from "../logic/translation-helper"

const domain = process.env.NEXT_PUBLIC_API_URL;



const LanguageContext = createContext();

//* ================================================================
//* Language PROVIDER
//* =================================================================
export const LanguageProvider = ({ children }) => {

    const [language, setLanguage] = useState('en');
    const translationHelper = new TranslationHelper()

    useEffect(() => {
            var newLanguage = localStorage.getItem("lan");
            if (newLanguage) {
                setLanguage(newLanguage);
            }
            else {
                setLanguage("en");
            }
    }, [])

    //* ================================================================
    //* Translate
    //* =================================================================

    const translate = (translationType, text, cap) => {
        return translationHelper.translateWord(translationType, text, language, cap);
    };

    //* ================================================================
    //* Change Language
    //* =================================================================
    const changeLanguage = (lan) => {
        setLanguage(lan);
        localStorage.setItem("lan", lan);
    };


    return (
        <LanguageContext.Provider value={{ language, translate, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
export const LanguageConsumer = LanguageContext.Consumer;