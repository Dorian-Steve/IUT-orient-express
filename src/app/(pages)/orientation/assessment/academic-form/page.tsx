import React from "react";

export default function AcademicFormPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            Academic Assessment Form
          </h1>

          <p className="mb-8 text-gray-600">
            Please fill out this form to help us better understand your academic
            background and provide personalized orientation guidance.
          </p>

          <form className="space-y-6">
            {/* Personal Information Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
            </div>

            {/* Academic Background Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Academic Background
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="previousEducation"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Previous Education Level *
                  </label>
                  <select
                    id="previousEducation"
                    name="previousEducation"
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select your education level</option>
                    <option value="high-school">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="fieldOfStudy"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Previous Field of Study
                  </label>
                  <input
                    type="text"
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g., Computer Science, Business, etc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="gpa"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    GPA (if applicable)
                  </label>
                  <input
                    type="number"
                    id="gpa"
                    name="gpa"
                    min="0"
                    max="4"
                    step="0.01"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="e.g., 3.5"
                  />
                </div>
              </div>
            </div>

            {/* Program Interest Section */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Program Interest
              </h2>

              <div>
                <label
                  htmlFor="interestedProgram"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Which program are you most interested in? *
                </label>
                <select
                  id="interestedProgram"
                  name="interestedProgram"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select a program</option>
                  <option value="computer-science">Computer Science</option>
                  <option value="business-admin">
                    Business Administration
                  </option>
                  <option value="engineering">Engineering</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="liberal-arts">Liberal Arts</option>
                  <option value="undecided">Undecided</option>
                </select>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="careerGoals"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Career Goals (Optional)
                </label>
                <textarea
                  id="careerGoals"
                  name="careerGoals"
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tell us about your career aspirations..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Submit Assessment
              </button>
            </div>
          </form>

          <div className="mt-6 rounded-md bg-blue-50 p-4">
            <p className="text-sm text-blue-800">
              📝 Your responses will help our counselors provide personalized
              guidance during your orientation appointment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
