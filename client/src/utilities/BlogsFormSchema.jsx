import * as Yup from "yup";

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export const blogsFormSchema = Yup.object().shape({
  category: Yup.string()
    .required("Category is required")
    .trim(),

  date: Yup.string()
    .required("Date is required"),

  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title is too long")
    .trim(),

  content: Yup.string()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters"),

  images: Yup.array()
    .min(1, "Upload at least one image")
    .of(
      Yup.mixed()
        .required("Image is required")
        .test("fileType", "Only jpg, png, webp allowed", (file) => {
          return file && allowedTypes.includes(file.type);
        })
        .test("fileSize", "Max file size is 2MB", (file) => {
          return file && file.size <= 2 * 1024 * 1024;
        })
    ),
});