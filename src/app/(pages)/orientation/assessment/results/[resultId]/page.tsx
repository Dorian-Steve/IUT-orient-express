import React from "react";

type PageProps = {
  params: Promise<{
    resultId: string;
  }>;
};

export default async function ResultPage({ params }: PageProps) {
  // Await the params since it's now a Promise in Next.js 15
  const { resultId } = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 rounded-lg bg-white p-8 shadow-md">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
              Assessment Results
            </h1>

            <div className="mb-6 border-l-4 border-blue-400 bg-blue-50 p-4">
              <p className="text-blue-800">
                <strong>Result ID:</strong> {resultId}
              </p>
            </div>

            {/* Academic Assessment Results */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Academic Assessment Results
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Recommended Programs
                  </h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Computer Science (95% match)</li>
                    <li>• Information Technology (88% match)</li>
                    <li>• Software Engineering (82% match)</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Academic Strengths
                  </h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Analytical Thinking</li>
                    <li>• Problem Solving</li>
                    <li>• Mathematical Skills</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Career Assessment Results */}
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Career Aspiration Results
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Career Matches
                  </h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Software Developer (92% match)</li>
                    <li>• Data Analyst (87% match)</li>
                    <li>• Systems Administrator (79% match)</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Work Style
                  </h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Prefers collaborative work</li>
                    <li>• Enjoys problem-solving</li>
                    <li>• Values work-life balance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-green-800">
                🎯 Personalized Recommendations
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-800">
                    Suggested Next Steps:
                  </h4>
                  <ul className="mt-2 space-y-1 text-green-700">
                    <li>
                      1. Schedule an appointment with a Computer Science advisor
                    </li>
                    <li>
                      2. Attend the upcoming Information Technology program
                      webinar
                    </li>
                    <li>3. Consider taking introductory programming courses</li>
                    <li>4. Join the Tech Student Association for networking</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-800">
                    Recommended Courses:
                  </h4>
                  <ul className="mt-2 space-y-1 text-green-700">
                    <li>• Introduction to Programming (CS 101)</li>
                    <li>• Data Structures and Algorithms (CS 201)</li>
                    <li>• Database Management Systems (IT 150)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
                📅 Schedule Advisor Meeting
              </button>
              <button className="rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700">
                📧 Email Results to Me
              </button>
              <button className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50">
                📄 Download PDF Report
              </button>
            </div>
          </div>

          {/* Assessment Summary */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Assessment Summary
            </h3>

            <div className="grid gap-4 text-center sm:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Program Match</div>
              </div>
              <div className="rounded-lg bg-green-50 p-4">
                <div className="text-2xl font-bold text-green-600">92%</div>
                <div className="text-sm text-gray-600">Career Alignment</div>
              </div>
              <div className="rounded-lg bg-purple-50 p-4">
                <div className="text-2xl font-bold text-purple-600">A+</div>
                <div className="text-sm text-gray-600">Overall Grade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
