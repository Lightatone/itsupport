/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EmailCreateFormInputValues = {
    to?: string;
    from?: string;
    subject?: string;
    body?: string;
};
export declare type EmailCreateFormValidationValues = {
    to?: ValidationFunction<string>;
    from?: ValidationFunction<string>;
    subject?: ValidationFunction<string>;
    body?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailCreateFormOverridesProps = {
    EmailCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    to?: PrimitiveOverrideProps<TextFieldProps>;
    from?: PrimitiveOverrideProps<TextFieldProps>;
    subject?: PrimitiveOverrideProps<TextFieldProps>;
    body?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmailCreateFormProps = React.PropsWithChildren<{
    overrides?: EmailCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EmailCreateFormInputValues) => EmailCreateFormInputValues;
    onSuccess?: (fields: EmailCreateFormInputValues) => void;
    onError?: (fields: EmailCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailCreateFormInputValues) => EmailCreateFormInputValues;
    onValidate?: EmailCreateFormValidationValues;
} & React.CSSProperties>;
export default function EmailCreateForm(props: EmailCreateFormProps): React.ReactElement;
