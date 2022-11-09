import styles from "../styles/FormField.module.css"

import {Form } from "react-bootstrap"

export default function FormField({title, value, setValue, placeholder, valueType}) {

    return (
        <div>
            <Form.Group className={`mb-3 ${styles.formGroup}`} controlId="formBasicEmail">
                <Form.Label className={styles.label}>{title}</Form.Label>
                <Form.Control size="sm" className={styles.formControl} type={valueType} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
            </Form.Group>
        </div>
    )
}