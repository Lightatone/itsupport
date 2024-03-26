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
export declare type EmailUpdateFormInputValues = {
    to?: string;
    from?: string;
    subject?: string;
    body?: string;
};
export declare type EmailUpdateFormValidationValues = {
    to?: ValidationFunction<string>;
    from?: ValidationFunction<string>;
    subject?: ValidationFunction<string>;
    body?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EmailUpdateFormOverridesProps = {
    EmailUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    to?: PrimitiveOverrideProps<TextFieldProps>;
    from?: PrimitiveOverrideProps<TextFieldProps>;
    subject?: PrimitiveOverrideProps<TextFieldProps>;
    body?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EmailUpdateFormProps = React.PropsWithChildren<{
    overrides?: EmailUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    email?: any;
    onSubmit?: (fields: EmailUpdateFormInputValues) => EmailUpdateFormInputValues;
    onSuccess?: (fields: EmailUpdateFormInputValues) => void;
    onError?: (fields: EmailUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EmailUpdateFormInputValues) => EmailUpdateFormInputValues;
    onValidate?: EmailUpdateFormValidationValues;
} & React.CSSProperties>;
export default function EmailUpdateForm(props: EmailUpdateFormProps): React.ReactElement;
