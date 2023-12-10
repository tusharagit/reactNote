/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Mynotes } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function MynotesUpdateForm(props) {
  const {
    id: idProp,
    mynotes: mynotesModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    notetitle: "",
    notedata: "",
  };
  const [notetitle, setNotetitle] = React.useState(initialValues.notetitle);
  const [notedata, setNotedata] = React.useState(initialValues.notedata);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = mynotesRecord
      ? { ...initialValues, ...mynotesRecord }
      : initialValues;
    setNotetitle(cleanValues.notetitle);
    setNotedata(cleanValues.notedata);
    setErrors({});
  };
  const [mynotesRecord, setMynotesRecord] = React.useState(mynotesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Mynotes, idProp)
        : mynotesModelProp;
      setMynotesRecord(record);
    };
    queryData();
  }, [idProp, mynotesModelProp]);
  React.useEffect(resetStateValues, [mynotesRecord]);
  const validations = {
    notetitle: [],
    notedata: [],
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
          notetitle,
          notedata,
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
          await DataStore.save(
            Mynotes.copyOf(mynotesRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "MynotesUpdateForm")}
      {...rest}
    >
      <TextField
        label="Notetitle"
        isRequired={false}
        isReadOnly={false}
        value={notetitle}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notetitle: value,
              notedata,
            };
            const result = onChange(modelFields);
            value = result?.notetitle ?? value;
          }
          if (errors.notetitle?.hasError) {
            runValidationTasks("notetitle", value);
          }
          setNotetitle(value);
        }}
        onBlur={() => runValidationTasks("notetitle", notetitle)}
        errorMessage={errors.notetitle?.errorMessage}
        hasError={errors.notetitle?.hasError}
        {...getOverrideProps(overrides, "notetitle")}
      ></TextField>
      <TextField
        label="Notedata"
        isRequired={false}
        isReadOnly={false}
        value={notedata}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              notetitle,
              notedata: value,
            };
            const result = onChange(modelFields);
            value = result?.notedata ?? value;
          }
          if (errors.notedata?.hasError) {
            runValidationTasks("notedata", value);
          }
          setNotedata(value);
        }}
        onBlur={() => runValidationTasks("notedata", notedata)}
        errorMessage={errors.notedata?.errorMessage}
        hasError={errors.notedata?.hasError}
        {...getOverrideProps(overrides, "notedata")}
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
          isDisabled={!(idProp || mynotesModelProp)}
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
              !(idProp || mynotesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
