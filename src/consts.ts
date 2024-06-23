import type { FormField } from "./types";

export const formFields: FormField[] = [
  {
    name: "profileImage" as const,
    label: "Profile Image",
    type: "file",
    description: "Upload your profile image (JPG, PNG, JPEG, or WEBP)",
  },
  {
    name: "name" as const,
    label: "Name",
    type: "text",
    placeholder: "John Doe",
    description: "Enter your full name",
  },
  {
    name: "age" as const,
    label: "Age",
    type: "number",
    placeholder: "30",
    description: "Enter your age",
  },
  {
    name: "gender" as const,
    label: "Gender",
    type: "radio",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
    description: "Select your gender",
  },
  {
    name: "companySize" as const,
    label: "Company Size",
    type: "select",
    options: [
      { value: "1", label: "1 employee" },
      { value: "2-10", label: "2-10 employees" },
      { value: "11-100", label: "11-100 employees" },
      { value: "100+", label: "100+ employees" },
    ],
    description: "Select your company size",
  },
];
