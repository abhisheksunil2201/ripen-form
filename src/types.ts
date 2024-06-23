export type FormField =
  | { name: "profileImage"; type: "file"; label: string; description: string }
  | {
      name: "name";
      type: "text";
      label: string;
      placeholder: string;
      description: string;
    }
  | {
      name: "age";
      type: "number";
      label: string;
      placeholder: string;
      description: string;
    }
  | {
      name: "gender";
      type: "radio";
      label: string;
      options: Array<{ value: string; label: string }>;
      description: string;
    }
  | {
      name: "companySize";
      type: "select";
      label: string;
      options: Array<{ value: string; label: string }>;
      description: string;
    };
