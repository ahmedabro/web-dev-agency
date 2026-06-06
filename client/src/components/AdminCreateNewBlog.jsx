import React, { useState } from 'react';
import { Form, Formik, Field } from 'formik';
import { blogsFormSchema } from '../utilities/BlogsFormSchema';
import { useCreateBlogMutation } from '../redux/api/blogsApi';

const AdminCreateNewBlog = () => {

  const [createBlog, { isLoading }] = useCreateBlogMutation()

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("category", values.category);
      formData.append("date", values.date);
      formData.append("title", values.title);
      formData.append("content", values.content);

      values.images.forEach((file) => {
        formData.append("images", file);
      });

      const res = await createBlog(formData).unwrap();

      console.log("Blog created:", res);

      resetForm();
    } catch (err) {
      console.error("Error creating blog:", err);
    }
  };

  return (
    <section>
      <h2>Create a New Blog</h2>

      <Formik
        initialValues={{ category: '', date: '', title: '', content: '', images: [] }}
        validationSchema={blogsFormSchema}
        onSubmit={(values, helpers) => {
          console.log("Formik Submit Triggered")
          handleSubmit(values, helpers)
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <Field name="category" placeholder="Category" />
            {touched.category && errors.category && (<p>{errors.category}</p>)}
            <Field name="date" type="date" />
            {touched.date && errors.date && (<p>{errors.date}</p>)}
            <Field name="title" placeholder="Title" />
            {touched.title && errors.title && (<p>{errors.title}</p>)}
            <Field as="textarea" name="content" placeholder="Content" />
            {touched.content && errors.content && (<p>{errors.content}</p>)}

            {/* IMAGE INPUT */}
            <input
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.currentTarget.files);
                setFieldValue("images", files);
              }}
            />
            {touched.images && errors.images && (<p>{errors.images}</p>)}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Blog"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AdminCreateNewBlog;