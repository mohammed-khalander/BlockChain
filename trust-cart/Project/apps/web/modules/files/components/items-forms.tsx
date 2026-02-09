"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"







const formSchema = z.object({
  title: z
    .string()
    .min(1, "Item Name Is Required"),
  category: z
    .string()
    .min(1, "Category Is Required"),
   image:z.string().min(1,"IPFS Image Link is Required"),
   price:z.number().int("Price must be a whole number").min(1, "Price is Required"),
   ratings:z.number().int("Rating must be a whole number").min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
   stock:z.number().int("Stock must be a whole number").min(1,"Item Stock Is Required"),
})


export function ItemForms() {


    const categories = [
      { label: "Gaming", value: "gaming" },
      { label: "Grocery", value: "grocery" },
      { label: "Electronics", value: "electronics" }
    ] as const

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      image:"",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    form.reset()
    console.log(data);
  }

  return (
    <Card className="w-full md:px-10 flex-1">
      <CardHeader>
        <CardTitle>Upload Item</CardTitle>
        <CardDescription>
          Add the Item to BlockChain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Item Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the Item Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field orientation="responsive" data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf-select-language">
                        Category
                      </FieldLabel>
                      <FieldDescription>
                        Select the Category Which the Item Belongs to
                      </FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="form-rhf-select-language"
                        aria-invalid={fieldState.invalid}
                        className="min-w-30"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    IPFS Image Link
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the IPFS Image link with CID"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Item Price
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the Price of the item"
                    autoComplete="off"
                    type="number"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="ratings"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Ratings
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the IPFS Image link with CID"
                    autoComplete="off"
                    type="number"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="stock"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Stocks
                  </FieldLabel>
                  <Input
                    {...field}
                    value={field.value ?? ""}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Stocks in the inventory"
                    autoComplete="off"
                    type="number"
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}


