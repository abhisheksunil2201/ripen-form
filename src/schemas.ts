"use client";

import { z } from "zod";

export const formSchema = z.object({
  profileImage: z
    .instanceof(FileList, { message: "Please select an image file" })
    .refine((files) => files.length > 0, "Profile image is required")
    .transform((files) => files[0])
    .refine(
      (file): file is File =>
        file instanceof File &&
        ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "File must be JPG, PNG, JPEG, or WEBP",
    ),
  name: z.string().min(2, "Name must be at least 2 characters."),
  age: z
    .number({ invalid_type_error: "Age must be a number" })
    .int()
    .positive()
    .max(120, "Age must be 120 or less")
    .nullable(),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  companySize: z.enum(["1", "2-10", "11-100", "100+"], {
    required_error: "Please select a company size",
  }),
});

export type FormValues = z.infer<typeof formSchema>;
