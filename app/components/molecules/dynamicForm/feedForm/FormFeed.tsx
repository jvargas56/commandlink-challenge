"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { updateFormData } from "@/app/store/reducers/formReducer";
import useRemoteFields from "@/app/hooks/useRemoteFields";

import styles from "./inputFeed.module.css";
import { useRouter } from 'next/navigation'
import { Field } from "./InputField";

/**
 * This component render a dinyamc form base on the data structure
 * After user fill the require information data will send to the (thanks page)
 */
const FormFeed = () => {
  const router = useRouter();
  const formData = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const formStructure = useRemoteFields();
  const [requiredFields, setRequiredFields] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emptyRequiredFields: string[] = [];
    const checkRequiredFields = (field: Field | Field[]) => {
      if (Array.isArray(field)) {
        field.forEach((subField) => {
          if (subField.required && !formData[subField.id]) {
            emptyRequiredFields.push(subField.id);
          }
        });
      } else if (field.required && !formData[field.id]) {
        emptyRequiredFields.push(field.id);
      }
    };
  
    (formStructure as Field[] | Field[][]).forEach((field) =>
       checkRequiredFields(field));

    if (emptyRequiredFields.length > 0) {
      console.log(emptyRequiredFields);
      setRequiredFields(emptyRequiredFields);
    } else {
      alert("Thanks!");
      router.push('/thanks');
    }
  };

  return (
    <>
      <div className={styles["form-container"]}>
        <h3>Hi, this form is dynamic like a feed</h3>
        <form className={`${styles["form"]}`}>
          {formStructure.map((field, index) => (
            <div
              key={index}
              className={Array.isArray(field) ? styles["side-by-side"] : ""}
            >
              {Array.isArray(field) ? (
                <div className={styles["side-by-side"]}>
                  {field.map((subField, subIndex) => (
                    <div className={styles["input-field"]} key={subIndex}>
                      <input
                        key={subIndex}
                        type={subField.type}
                        name={subField.id}
                        placeholder={subField.placeholder}
                        required={subField.required}
                        value={formData[subField.id] || ""}
                        onChange={handleInputChange}
                        className={
                          requiredFields.includes(subField.id)
                            ? styles["required-field"]
                            : styles["input"]
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Type guards for field.type
                <>
                  {field.type === "select" ? (
                    <div className={styles["input-field"]} key={index}>
                      <select
                        name={field.id}
                        onChange={handleInputChange}
                        className={
                          requiredFields.includes(field.id)
                            ? styles["required-field"]
                            : styles["input-field"]
                        }
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option, optionIndex) => (
                          <option key={optionIndex} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : field.type === "textarea" ? (
                    <div className={styles["input-field"]} key={index}>
                      <textarea
                        name={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={handleInputChange}
                        className={
                          requiredFields.includes(field.id)
                            ? styles["required-field"]
                            : styles["input-field"]
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles["input-field"]} key={index}>
                      <input
                        type={field.type}
                        name={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={formData[field.id] || ""}
                        onChange={handleInputChange}
                        className={styles["required-field"]}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          {requiredFields.length > 0 && (
            <div className={styles["error-message"]}>
              Opps, we are sorry, next fields are required: {requiredFields.join(", ")}
            </div>
          )}
          <button
            type="button"
            className={`${styles["submit-button"]}`}
            onClick={handleSubmit}
            data-testid="submitTestId"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormFeed;
