"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import styles from "@/app/components/molecules/dynamicForm/feedForm/inputFeed.module.css";

/**
 * Page use to say the customer we receive your information
 */
export default function ThanksPage() {
  //recover data from central store
  const formData = useSelector((state: RootState) => state.form);

  // prepare data structure from reducx to interate and build a dinamyc form again
  const formStructure = Object.keys(formData).map((key) => {
    const value = formData[key];
    return {
      id: key,
      type:
        typeof value === "string"
          ? "text"
          : Array.isArray(value)
          ? "select"
          : "text",
      required: true,
    };
  });

  return (
    <>
      <div className={`${styles["information-message"]} ${styles["mt-4"]}`}>
        Hey, we have receive your information
      </div>
      <div className={styles["form-container"]}>
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
                        value={formData[subField.id] || ""}
                        className={styles["input"]}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {field.type === "select" ? (
                    <div className={styles["input-field"]} key={index}>
                      <select
                        name={field.id}
                        value={formData[field.id] || ""}
                        className={styles["input-field"]}
                      >
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
                        className={styles["input-field"]}
                      />
                    </div>
                  ) : (
                    <div className={styles["input-field"]} key={index}>
                      <input
                        type={field.type}
                        name={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        className={styles["input-field"]}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </form>
      </div>
    </>
  );
}
