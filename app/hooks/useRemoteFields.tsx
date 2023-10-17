import { useEffect, useState } from "react";
import { Field } from "../components/molecules/dynamicForm/feedForm/InputField";
import { dataObject } from "@/app/commons/data/objectSource";

/**
 * Custom hook use to Retrive the inputs to create the dinamyc form
 * @returns inputs to the dinamyc form
 */
const useRemoteFields = () => {
  const [formStructure, setFormStructure] = useState<Field | Field[][]>([]);

  useEffect(() => {
    const fetchFileInputs = async () => {
      try {
        const finalFeedInput = Object.values(dataObject) as Field | Field[][];
        setFormStructure(finalFeedInput);
      } catch (error) {
        console.log("fetching error", error);
      }
    };

    fetchFileInputs();
  }, []);

  return formStructure;
};

export default useRemoteFields;
