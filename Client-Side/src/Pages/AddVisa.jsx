import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate } from 'react-router-dom';

// Validation Schema
const VisaSchema = Yup.object().shape({
  // countryImage: Yup.string().url('Invalid URL format'),
  countryName: Yup.string()
    .required('Country name is required')
    .min(2, 'Country name must be at least 2 characters')
    .max(50, 'Country name must be less than 50 characters'),
  visaType: Yup.string().required('Visa type is required'),
  processingTime: Yup.string().required('Processing time is required'),
  requiredDocuments: Yup.array()
    .min(1, 'Select at least one document')
    .required('Required documents are required'),
  description: Yup.string()
    .required('Description is required')
    .min(20, 'Description must be at least 20 characters'),
  ageRestriction: Yup.number()
    .required('Age restriction is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  fee: Yup.number()
    .required('Fee is required')
    .positive('Fee must be a positive number'),
  validity: Yup.string().required('Validity period is required'),
  applicationMethod: Yup.string().required('Application method is required'),
});

const AddVisa = () => {
  const { user } = useContext(AuthContext);
  console.log('User in AddVisa component:', user);

  // Email and display name validation
  if (!user?.displayName || !user?.email) {
    return <Navigate to="/login" />;
  }

  const visaTypes = ['Tourist visa', 'Student visa', 'Official visa', 'Work visa', 'Transit visa', 'Business visa'];
  const documentOptions = [
    'Valid passport',
    'Visa application form',
    'Recent passport-sized photograph',
    'Proof of funds',
    'Travel itinerary',
    'Accommodation proof'
  ];

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    // Add user metadata and other data to formData
    const formData = { 
      ...values, 
      email: user.email, 
      username: user.displayName,
      // userMetadata: {
      //   createdAt: user.metadata?.creationTime || '',
      //   lastLoginAt: user.metadata?.lastLoginAt || '',
      //   lastSignInTime: user.metadata?.lastSignInTime || '',
      // }
    };
    console.log('Form data being sent:', formData);

    try {
      const response = await fetch('https://server-side-pi-seven.vercel.app/visas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data with the email and metadata
      });

      if (response.ok) {
        toast.success('Visa added successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        resetForm();
      } else {
        toast.error('Failed to add visa!');
      }
      setSubmitting(false);
    } catch (error) {
      toast.error('An error occurred!');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
        {/* Decorative Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-6">
          <div className="absolute inset-0 opacity-20 bg-world-pattern bg-cover bg-center"></div>
          <div className="relative z-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-center drop-shadow-lg">
              Visa Application Portal
            </h1>
            <p className="text-center mt-2 text-blue-100 opacity-80">
              Create and manage visa entries with ease
            </p>
          </div>
        </div>

        <Formik
          initialValues={{
            countryImage: '',
            countryName: '',
            visaType: '',
            processingTime: '',
            requiredDocuments: [],
            description: '',
            ageRestriction: '',
            fee: '',
            validity: '',
            applicationMethod: '',
          }}
          validationSchema={VisaSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form className="p-8 space-y-6">
              {/* Country Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country Image URL
                  </label>
                  <Field
                    type="text"
                    name="countryImage"
                    className={`w-full px-4 py-3 border rounded-lg transition duration-300 ${
                      touched.countryImage && errors.countryImage
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:outline-none`}
                    placeholder="Enter image URL"
                  />
                  <ErrorMessage 
                    name="countryImage" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country Name
                  </label>
                  <Field
                    type="text"
                    name="countryName"
                    className={`w-full px-4 py-3 border rounded-lg transition duration-300 ${
                      touched.countryName && errors.countryName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:outline-none`}
                    placeholder="Enter country name"
                  />
                  <ErrorMessage 
                    name="countryName" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>
              </div>

              {/* Visa Type and Processing Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visa Type
                  </label>
                  <Field
                    as="select"
                    name="visaType"
                    className={`w-full px-4 py-3 border rounded-lg transition duration-300 ${
                      touched.visaType && errors.visaType
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:outline-none`}
                  >
                    <option value="">Select visa type</option>
                    {visaTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage 
                    name="visaType" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Time
                  </label>
                  <Field
                    type="text"
                    name="processingTime"
                    className={`w-full px-4 py-3 border rounded-lg transition duration-300 ${
                      touched.processingTime && errors.processingTime
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:outline-none`}
                    placeholder="e.g., 5-7 business days"
                  />
                  <ErrorMessage 
                    name="processingTime" 
                    component="div" 
                    className="text-red-500 text-sm mt-1" 
                  />
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Documents
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {documentOptions.map((option) => (
                    <label key={option} className="flex items-center">
                      <Field
                        type="checkbox"
                        name="requiredDocuments"
                        value={option}
                        className="mr-2 h-5 w-5 text-blue-500 border-gray-300 rounded"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="requiredDocuments"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description, Age Restriction, Fee, Validity, Application Method */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg transition duration-300 ${
                      touched.description && errors.description
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    } focus:ring-2 focus:outline-none`}
                    placeholder="Provide a brief description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age Restriction
                    </label>
                    <Field
                      type="number"
                      name="ageRestriction"
                      className={`w-full px-4 py-3 border rounded-lg transition duration-300 ${
                        touched.ageRestriction && errors.ageRestriction
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      } focus:ring-2 focus:outline-none`}
                      placeholder="Age restriction"
                    />
                    <ErrorMessage
                      name="ageRestriction"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fee
                    </label>
                    <Field
                      type="number"
                      name="fee"
                      className={`w-full px-4 py-3 border rounded-lg transition duration-300 ${
                        touched.fee && errors.fee
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      } focus:ring-2 focus:outline-none`}
                      placeholder="Visa fee"
                    />
                    <ErrorMessage
                      name="fee"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validity Period
                    </label>
                    <Field
                      type="text"
                      name="validity"
                      className={`w-full px-4 py-3 border rounded-lg transition duration-300 ${
                        touched.validity && errors.validity
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      } focus:ring-2 focus:outline-none`}
                      placeholder="Validity period"
                    />
                    <ErrorMessage
                      name="validity"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Method
                    </label>
                    <Field
                      as="select"
                      name="applicationMethod"
                      className={`w-full px-4 py-3 border rounded-lg transition duration-300 ${
                        touched.applicationMethod && errors.applicationMethod
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      } focus:ring-2 focus:outline-none`}
                    >
                      <option value="">Select application method</option>
                      <option value="Online">Online</option>
                      <option value="In-person">In-person</option>
                    </Field>
                    <ErrorMessage
                      name="applicationMethod"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transform transition-all hover:scale-105"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Visa Application'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddVisa;
