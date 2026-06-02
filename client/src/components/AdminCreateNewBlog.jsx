import React from 'react'
import { Form, Formik, Field } from 'formik'
import { blogsFormSchema } from '../utilities/BlogsFormSchema'

const AdminCreateNewBlog = () => {


  const handleSubmit = async (values) => {
    // submit logic
  }


  return (
    <section>
          <h2>Create a New Blog</h2>
      <Formik
        initialValues={{ category: '', date: '', title: '', content: '', images: [] }}
        validationSchema={blogsFormSchema}
        onSubmit={(values, { resetForm }) => {
                // Handle form submission
                console.log(values);
                handleSubmit(values);

                resetForm();
            }}
      >
        {({ errors, touched, values }) => {
          return (
            <Form>
              <div>
                <label htmlFor="category">Category</label>
                <Field name="category" id="category" type="text" placeholder="Category" />
              </div>
            </Form>
          )
        }}
        
          </Formik>

    </section>
  )
}

export default AdminCreateNewBlog
