import React from "react";
import Link from "next/link";

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
              Assessment Results History
            </h1>

            <p className="mb-8 text-gray-600">
              View and manage your previous assessment results. Each result
              provides personalized recommendations based on your responses.
            </p>

            {/* Filter/Search Section */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search results..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <select className="rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">All Types</option>
                <option value="academic">Academic Assessment</option>
                <option value="career">Career Assessment</option>
                <option value="combined">Combined Results</option>
              </select>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            {/* Sample Result 1 */}
            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center">
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
                        Combined Assessment Results
                      </h3>
                      <p className="text-sm text-gray-500">
                        Completed on March 15, 2024 at 2:30 PM
                      </p>
                    </div>
                  </div>

                  <div className="ml-10">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                        Academic
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        Career
                      </span>
                      <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
                        95% Match
                      </span>
                    </div>

                    <p className="mb-2 text-sm text-gray-600">
                      <strong>Top Recommendation:</strong> Computer Science
                      Program
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Career Match:</strong> Software Developer (92%
                      compatibility)
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <Link
                    href="/orientation/assessment/results/result-001"
                    className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Sample Result 2 */}
            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center">
                    <div className="mr-3 rounded-full bg-blue-100 p-2">
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
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Academic Assessment Only
                      </h3>
                      <p className="text-sm text-gray-500">
                        Completed on March 10, 2024 at 10:15 AM
                      </p>
                    </div>
                  </div>

                  <div className="ml-10">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                        Academic Only
                      </span>
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                        Incomplete
                      </span>
                    </div>

                    <p className="mb-2 text-sm text-gray-600">
                      <strong>Top Recommendations:</strong> IT, Computer
                      Science, Engineering
                    </p>
                    <p className="text-sm text-gray-500">
                      Complete career assessment for full recommendations
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 sm:mt-0 sm:ml-4">
                  <Link
                    href="/orientation/assessment/results/result-002"
                    className="block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white transition-colors hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/orientation/assessment/aspiration-form"
                    className="block rounded-lg bg-green-600 px-4 py-2 text-center text-sm text-white transition-colors hover:bg-green-700"
                  >
                    Complete Career
                  </Link>
                </div>
              </div>
            </div>

            {/* Sample Result 3 */}
            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center">
                    <div className="mr-3 rounded-full bg-purple-100 p-2">
                      <svg
                        className="h-5 w-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Career Assessment Only
                      </h3>
                      <p className="text-sm text-gray-500">
                        Completed on March 8, 2024 at 4:45 PM
                      </p>
                    </div>
                  </div>

                  <div className="ml-10">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        Career Only
                      </span>
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                        Incomplete
                      </span>
                    </div>

                    <p className="mb-2 text-sm text-gray-600">
                      <strong>Career Interests:</strong> Technology, Creative
                      Industries
                    </p>
                    <p className="text-sm text-gray-500">
                      Complete academic assessment for program recommendations
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 sm:mt-0 sm:ml-4">
                  <Link
                    href="/orientation/assessment/results/result-003"
                    className="block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white transition-colors hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/orientation/assessment/academic-form"
                    className="block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm text-white transition-colors hover:bg-blue-700"
                  >
                    Complete Academic
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="py-12 text-center">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="mb-4 text-gray-400">
                <svg
                  className="mx-auto h-16 w-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                No More Results
              </h3>
              <p className="mb-4 text-gray-600">
                You've seen all your assessment results. Take a new assessment
                to get updated recommendations.
              </p>
              <Link
                href="/orientation/assessment"
                className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
              >
                Take New Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
