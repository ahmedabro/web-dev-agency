import * as Yup from 'yup'
export const contactFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  company: Yup.string().optional(),
  budget: Yup.number().optional().typeError('Budget must be a number').min(0, 'Budget cannot be negative'),
  message: Yup.string().required('Message is required').min(30, 'Message must be at least 30 characters'),
  interestedIn: Yup.string().optional(),
})
