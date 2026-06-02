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
          handleSubmit(values, helpers)
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <Field name="category" placeholder="Category" />
            <Field name="date" type="date" />
            <Field name="title" placeholder="Title" />
            <Field as="textarea" name="content" placeholder="Content" />

            {/* IMAGE INPUT */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.currentTarget.files);
                setFieldValue("images", files);
              }}
            />

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