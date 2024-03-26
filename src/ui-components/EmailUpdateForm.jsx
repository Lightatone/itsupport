/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getEmail } from "../graphql/queries";
import { updateEmail } from "../graphql/mutations";
const client = generateClient();
export default function EmailUpdateForm(props) {
  const {
    id: idProp,
    email: emailModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    to: "",
    from: "",
    subject: "",
    body: "",
  };
  const [to, setTo] = React.useState(initialValues.to);
  const [from, setFrom] = React.useState(initialValues.from);
  const [subject, setSubject] = React.useState(initialValues.subject);
  const [body, setBody] = React.useState(initialValues.body);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = emailRecord
      ? { ...initialValues, ...emailRecord }
      : initialValues;
    setTo(cleanValues.to);
    setFrom(cleanValues.from);
    setSubject(cleanValues.subject);
    setBody(cleanValues.body);
    setErrors({});
  };
  const [emailRecord, setEmailRecord] = React.useState(emailModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getEmail.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEmail
        : emailModelProp;
      setEmailRecord(record);
    };
    queryData();
  }, [idProp, emailModelProp]);
  React.useEffect(resetStateValues, [emailRecord]);
  const validations = {
    to: [{ type: "Required" }],
    from: [{ type: "Required" }],
    subject: [],
    body: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          to,
          from,
          subject: subject ?? null,
          body: body ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateEmail.replaceAll("__typename", ""),
            variables: {
              input: {
                id: emailRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "EmailUpdateForm")}
      {...rest}
    >
      <TextField
        label="To"
        isRequired={true}
        isReadOnly={false}
        value={to}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              to: value,
              from,
              subject,
              body,
            };
            const result = onChange(modelFields);
            value = result?.to ?? value;
          }
          if (errors.to?.hasError) {
            runValidationTasks("to", value);
          }
          setTo(value);
        }}
        onBlur={() => runValidationTasks("to", to)}
        errorMessage={errors.to?.errorMessage}
        hasError={errors.to?.hasError}
        {...getOverrideProps(overrides, "to")}
      ></TextField>
      <TextField
        label="From"
        isRequired={true}
        isReadOnly={false}
        value={from}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              to,
              from: value,
              subject,
              body,
            };
            const result = onChange(modelFields);
            value = result?.from ?? value;
          }
          if (errors.from?.hasError) {
            runValidationTasks("from", value);
          }
          setFrom(value);
        }}
        onBlur={() => runValidationTasks("from", from)}
        errorMessage={errors.from?.errorMessage}
        hasError={errors.from?.hasError}
        {...getOverrideProps(overrides, "from")}
      ></TextField>
      <TextField
        label="Subject"
        isRequired={false}
        isReadOnly={false}
        value={subject}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              to,
              from,
              subject: value,
              body,
            };
            const result = onChange(modelFields);
            value = result?.subject ?? value;
          }
          if (errors.subject?.hasError) {
            runValidationTasks("subject", value);
          }
          setSubject(value);
        }}
        onBlur={() => runValidationTasks("subject", subject)}
        errorMessage={errors.subject?.errorMessage}
        hasError={errors.subject?.hasError}
        {...getOverrideProps(overrides, "subject")}
      ></TextField>
      <TextField
        label="Body"
        isRequired={false}
        isReadOnly={false}
        value={body}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              to,
              from,
              subject,
              body: value,
            };
            const result = onChange(modelFields);
            value = result?.body ?? value;
          }
          if (errors.body?.hasError) {
            runValidationTasks("body", value);
          }
          setBody(value);
        }}
        onBlur={() => runValidationTasks("body", body)}
        errorMessage={errors.body?.errorMessage}
        hasError={errors.body?.hasError}
        {...getOverrideProps(overrides, "body")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || emailModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || emailModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
