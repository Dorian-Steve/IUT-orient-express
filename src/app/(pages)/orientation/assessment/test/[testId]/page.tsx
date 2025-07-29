import React from "react";

type PageProps = {
  params: Promise<{
    testId: string;
  }>;
};

export default async function TestPage({ params }: PageProps) {
  // Await the params since it's now a Promise in Next.js 15
  const { testId } = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-800">
                  Assessment Test
                </h1>
                <p className="text-gray-600">
                  Test ID:{" "}
                  <span className="font-semibold text-blue-600">{testId}</span>
                </p>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">Progress</div>
                <div className="text-2xl font-bold text-blue-600">3/10</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between text-sm text-gray-600">
                <span>Question 3 of 10</span>
                <span>30% Complete</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>

            {/* Sample Question */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">
                Question 3: Learning Preferences
              </h2>

              <p className="mb-6 text-gray-700">
                Which learning environment helps you understand concepts best?
              </p>

              <div className="space-y-4">
                <label className="flex cursor-pointer items-center rounded-lg border border-gray-300 p-4 transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="learning_preference"
                    value="visual"
                    className="mr-4 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      Visual Learning
                    </div>
                    <div className="text-sm text-gray-600">
                      Diagrams, charts, and visual representations
                    </div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center rounded-lg border border-gray-300 p-4 transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="learning_preference"
                    value="auditory"
                    className="mr-4 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      Auditory Learning
                    </div>
                    <div className="text-sm text-gray-600">
                      Lectures, discussions, and verbal explanations
                    </div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center rounded-lg border border-gray-300 p-4 transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="learning_preference"
                    value="kinesthetic"
                    className="mr-4 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      Hands-on Learning
                    </div>
                    <div className="text-sm text-gray-600">
                      Practical exercises and interactive activities
                    </div>
                  </div>
                </label>

                <label className="flex cursor-pointer items-center rounded-lg border border-gray-300 p-4 transition-colors hover:bg-gray-50">
                  <input
                    type="radio"
                    name="learning_preference"
                    value="reading"
                    className="mr-4 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-medium text-gray-800">
                      Reading/Writing
                    </div>
                    <div className="text-sm text-gray-600">
                      Text-based materials and written assignments
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between">
              <button className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50">
                ← Previous
              </button>

              <div className="flex space-x-3">
                <button className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50">
                  Save & Continue Later
                </button>
                <button className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
                  Next Question →
                </button>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 rounded-lg bg-blue-50 p-4">
              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 font-medium text-blue-800">Need Help?</h4>
                  <p className="text-sm text-blue-700">
                    Choose the option that best describes your preferred
                    learning style. There are no right or wrong answers - be
                    honest about what works best for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Test Information Sidebar */}
          <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Test Information
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Test Type:</span>
                <span className="font-medium text-gray-800">
                  Learning Style Assessment
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium text-gray-800">~15 minutes</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Questions:</span>
                <span className="font-medium text-gray-800">10 total</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Started:</span>
                <span className="font-medium text-gray-800">10:30 AM</span>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-yellow-50 p-3">
              <p className="text-sm text-yellow-800">
                💡 Your responses will help us understand your learning
                preferences and recommend the most suitable study approaches for
                you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
