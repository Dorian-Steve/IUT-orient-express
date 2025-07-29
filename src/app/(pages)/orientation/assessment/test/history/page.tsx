import React from "react";
import Link from "next/link";

export default function TestHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
              Test History
            </h1>

            <p className="mb-8 text-gray-600">
              View your completed and in-progress assessment tests. Track your
              progress and access your results from previous sessions.
            </p>

            {/* Filter Section */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search tests..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
              </select>
              <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">All Types</option>
                <option value="academic">Academic Assessment</option>
                <option value="career">Career Assessment</option>
                <option value="learning-style">Learning Style</option>
                <option value="personality">Personality Test</option>
              </select>
            </div>
          </div>

          {/* Test History List */}
          <div className="space-y-4">
            {/* Completed Test */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 rounded-full bg-green-100 p-2">
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Academic Readiness Assessment
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          Completed
                        </span>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                          Academic
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-10 space-y-2">
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                      <span>
                        <strong>Score:</strong> 85/100
                      </span>
                      <span>
                        <strong>Duration:</strong> 18 minutes
                      </span>
                      <span>
                        <strong>Questions:</strong> 15/15
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Completed:</strong> March 15, 2024 at 2:45 PM
                    </p>
                    <p className="text-sm text-gray-700">
                      Strong performance in analytical thinking and
                      problem-solving. Recommended for advanced coursework.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:mt-0 lg:ml-6">
                  <Link
                    href="/orientation/assessment/results/test-001"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white transition-colors hover:bg-blue-700"
                  >
                    View Results
                  </Link>
                  <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50">
                    Download Report
                  </button>
                </div>
              </div>
            </div>

            {/* In Progress Test */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 rounded-full bg-yellow-100 p-2">
                      <svg
                        className="h-5 w-5 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Career Interest Survey
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                          In Progress
                        </span>
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                          Career
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-10 space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="mb-1 flex justify-between text-sm text-gray-600">
                          <span>
                            <strong>Progress:</strong> 7/12 questions
                          </span>
                          <span>58% complete</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-yellow-500 transition-all duration-300"
                            style={{ width: "58%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      <strong>Started:</strong> March 16, 2024 at 10:30 AM
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Last Activity:</strong> March 16, 2024 at 10:45 AM
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:mt-0 lg:ml-6">
                  <Link
                    href="/orientation/assessment/test/test-002"
                    className="rounded-lg bg-green-600 px-4 py-2 text-center text-sm text-white transition-colors hover:bg-green-700"
                  >
                    Continue Test
                  </Link>
                  <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50">
                    Save & Exit
                  </button>
                </div>
              </div>
            </div>

            {/* Not Started Test */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 rounded-full bg-gray-100 p-2">
                      <svg
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Learning Style Assessment
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
                          Not Started
                        </span>
                        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
                          Learning Style
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-10 space-y-2">
                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                      <span>
                        <strong>Duration:</strong> ~15 minutes
                      </span>
                      <span>
                        <strong>Questions:</strong> 10 total
                      </span>
                      <span>
                        <strong>Type:</strong> Multiple choice
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Discover your preferred learning methods to optimize your
                      study approach and academic performance.
                    </p>
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <Link
                    href="/orientation/assessment/test/test-003"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
                  >
                    Start Test
                  </Link>
                </div>
              </div>
            </div>

            {/* Expired Test */}
            <div className="rounded-lg bg-white p-6 opacity-75 shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 rounded-full bg-red-100 p-2">
                      <svg
                        className="h-5 w-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Personality Assessment
                      </h3>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                          Expired
                        </span>
                        <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
                          Personality
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-10 space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Started:</strong> March 10, 2024 at 3:00 PM
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Expired:</strong> March 12, 2024 (Session timeout)
                    </p>
                    <p className="text-sm text-gray-700">
                      Test session expired due to inactivity. You can restart
                      the assessment.
                    </p>
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <button className="rounded-lg bg-gray-600 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700">
                    Restart Test
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Test Statistics
            </h3>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="rounded-lg bg-yellow-50 p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
              <div className="rounded-lg bg-purple-50 p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">82%</div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
