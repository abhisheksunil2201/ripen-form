"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useToast } from "./ui/use-toast";
import { formFields } from "~/consts";

const formSchema = z.object({
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

type FormValues = z.infer<typeof formSchema>;

export default function RipenForm() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: undefined,
      gender: undefined,
      companySize: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Form validated",
      description: "Values logged to console",
    });
    console.log(values);
  }

  return (
    <MaxWidthWrapper className="mt-10 flex p-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>A Ripen Form</CardTitle>
          <CardDescription>
            A form with a 5 fields and validations.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-[0.7] space-y-8 p-4"
            >
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {field.type === "select" ? (
                          <Select
                            onValueChange={formField.onChange}
                            value={formField.value as string | undefined}
                          >
                            <SelectTrigger>
                              <SelectValue
                                placeholder={`Select ${field.label.toLowerCase()}`}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : field.type === "file" ? (
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png,.webp"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                formField.onChange(files);
                              } else {
                                formField.onChange(null);
                              }
                            }}
                          />
                        ) : field.type === "radio" ? (
                          <RadioGroup
                            onValueChange={formField.onChange}
                            value={formField.value as string}
                            className="flex flex-col space-y-1"
                          >
                            {field.options.map((option) => (
                              <FormItem
                                key={option.value}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={option.value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        ) : field.type === "number" ? (
                          <Input
                            type="number"
                            placeholder={field.placeholder}
                            {...formField}
                            value={
                              (formField.value as number | undefined) ?? ""
                            }
                            onChange={(e) =>
                              formField.onChange(Number(e.target.value))
                            }
                          />
                        ) : (
                          <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            {...formField}
                            value={formField.value as string}
                            onChange={(e) => formField.onChange(e.target.value)}
                          />
                        )}
                      </FormControl>
                      <FormDescription>{field.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  );
}
