import React from "react";
import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
              Assessment Tests
            </h1>

            <p className="mb-8 text-gray-600">
              Take comprehensive assessment tests to better understand your
              academic strengths, learning preferences, and career interests.
              These tests provide detailed insights to guide your educational
              journey.
            </p>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/orientation/assessment/test/history"
                className="rounded-lg bg-blue-600 px-6 py-3 text-center text-white transition-colors hover:bg-blue-700"
              >
                📊 View Test History
              </Link>
              <Link
                href="/orientation/assessment/results"
                className="rounded-lg bg-green-600 px-6 py-3 text-center text-white transition-colors hover:bg-green-700"
              >
                📈 View All Results
              </Link>
            </div>
          </div>

          {/* Available Tests */}
          <div className="mb-8 grid gap-6">
            {/* Academic Readiness Test */}
            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-full bg-blue-100 p-3">
                  <svg
                    className="h-6 w-6 text-blue-600"
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

                <div className="flex-1">
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-800">
                        Academic Readiness Assessment
                      </h3>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                          Academic
                        </span>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                          Available
                        </span>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                          20 min
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/orientation/assessment/test/academic-readiness"
                      className="rounded-lg bg-blue-600 px-6 py-2 text-sm whitespace-nowrap text-white transition-colors hover:bg-blue-700"
                    >
                      Start Test
                    </Link>
                  </div>

                  <p className="mb-4 text-gray-600">
                    Evaluate your preparedness for academic challenges and
                    identify areas where you excel or may need additional
                    support.
                  </p>

                  <div className="grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-800">
                        What it measures:
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Critical thinking skills</li>
                        <li>• Mathematical reasoning</li>
                        <li>• Reading comprehension</li>
                        <li>• Problem-solving abilities</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-800">
                        Test details:
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• 15 questions</li>
                        <li>• Multiple choice format</li>
                        <li>• No time limit per question</li>
                        <li>• Can save and resume</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Style Assessment */}
            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-full bg-green-100 p-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-800">
                        Learning Style Assessment
                      </h3>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                          Learning
                        </span>
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
                          In Progress
                        </span>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                          15 min
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/orientation/assessment/test/learning-style"
                      className="rounded-lg bg-green-600 px-6 py-2 text-sm whitespace-nowrap text-white transition-colors hover:bg-green-700"
                    >
                      Continue Test
                    </Link>
                  </div>

                  <div className="mb-4">
                    <div className="mb-2 flex justify-between text-sm text-gray-600">
                      <span>Progress: 6/10 questions</span>
                      <span>60% complete</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-green-500 transition-all duration-300"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>

                  <p className="mb-4 text-gray-600">
                    Discover how you learn best and get personalized study
                    recommendations based on your preferred learning methods.
                  </p>

                  <div className="grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-800">
                        Learning styles:
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Visual learning</li>
                        <li>• Auditory learning</li>
                        <li>• Kinesthetic learning</li>
                        <li>• Reading/Writing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-800">
                        Results include:
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Preferred learning methods</li>
                        <li>• Study strategies</li>
                        <li>• Course recommendations</li>
                        <li>• Time management tips</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Career Interest Survey */}
            <div className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-full bg-purple-100 p-3">
                  <svg
                    className="h-6 w-6 text-purple-600"
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

                <div className="flex-1">
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-800">
                        Career Interest Survey
                      </h3>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                          Career
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
                          Completed
                        </span>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                          25 min
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/orientation/assessment/results/career-survey-001"
                      className="rounded-lg bg-gray-600 px-6 py-2 text-sm whitespace-nowrap text-white transition-colors hover:bg-gray-700"
                    >
                      View Results
                    </Link>
                  </div>

                  <div className="mb-4 rounded-lg bg-green-50 p-3">
                    <div className="flex items-center text-green-800">
                      <svg
                        className="mr-2 h-5 w-5"
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
                      <span className="font-semibold">
                        Completed on March 15, 2024
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-green-700">
                      Score: 88/100 - Strong career alignment identified
                    </p>
                  </div>

                  <p className="mb-4 text-gray-600">
                    Explore various career paths and discover which professions
                    align with your interests, values, and personality traits.
                  </p>

                  <div className="grid gap-4 text-sm sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-800">
                        Areas explored:
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Work environment preferences</li>
                        <li>• Industry interests</li>
                        <li>• Job role preferences</li>
                        <li>• Work-life balance values</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold text-gray-800">
                        Your top matches:
                      </h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Software Developer (92%)</li>
                        <li>• Data Analyst (87%)</li>
                        <li>• Project Manager (83%)</li>
                        <li>• UX Designer (79%)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personality Assessment */}
            <div className="rounded-lg bg-white p-6 opacity-75 shadow-md transition-shadow hover:shadow-lg">
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0 rounded-full bg-orange-100 p-3">
                  <svg
                    className="h-6 w-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                <div className="flex-1">
                  <div className="mb-4 flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="mb-2 text-xl font-semibold text-gray-800">
                        Personality Assessment
                      </h3>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-800">
                          Personality
                        </span>
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800">
                          Coming Soon
                        </span>
                        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
                          30 min
                        </span>
                      </div>
                    </div>
                    <button
                      disabled
                      className="cursor-not-allowed rounded-lg bg-gray-400 px-6 py-2 text-sm whitespace-nowrap text-white"
                    >
                      Coming Soon
                    </button>
                  </div>

                  <p className="mb-4 text-gray-600">
                    Understand your personality traits and how they influence
                    your learning style, work preferences, and interpersonal
                    relationships.
                  </p>

                  <div className="rounded-lg bg-orange-50 p-3">
                    <p className="text-sm text-orange-800">
                      🚧 This assessment is currently under development and will
                      be available soon. It will provide insights into your
                      personality type and how it relates to your academic
                      success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Your Testing Overview
            </h3>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">2</div>
                <div className="text-sm text-gray-600">Tests Available</div>
              </div>
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="rounded-lg bg-yellow-50 p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">1</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="rounded-lg bg-purple-50 p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">88%</div>
                <div className="text-sm text-gray-600">Best Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
