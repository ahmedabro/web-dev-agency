import * as Yup from 'yup'
export const blogsFormSchema = Yup.object().shape({
    category: Yup
    .string()
    .required("Category is required")
    .trim(),

  date: Yup
    .string()
    .required("Date is required"),

  title: Yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title is too long")
    .trim(),

  content: Yup
    .string()
    .required("Content is required")
    .min(10, "Content must be at least 10 characters"),

  images: Yup
    .array()
    .required("At least one image is required")
    .min(1, "Upload at least one image")
    .of(
      Yup
        .mixed()
        .required("Image is required")
        .test("fileType", "Only image files are allowed", (file) => {
          if (!file) return false;
          return file.type && file.type.startsWith("image/");
        })
        .test("fileSize", "Max file size is 2MB", (file) => {
          if (!file) return false;
          return file.size <= 2 * 1024 * 1024;
        })
    ),

    
})
