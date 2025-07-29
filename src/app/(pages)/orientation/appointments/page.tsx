import React from "react";
import Link from "next/link";

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">
              Orientation Appointments
            </h1>

            <p className="mb-8 text-gray-600">
              Manage your orientation appointments and schedule new sessions
              with our counselors.
            </p>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/orientation/appointments/book"
                className="rounded-lg bg-blue-600 px-6 py-3 text-center text-white transition-colors hover:bg-blue-700"
              >
                📅 Book New Appointment
              </Link>
            </div>
          </div>

          {/* Appointments List */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Your Appointments
            </h2>

            <div className="space-y-4">
              {/* Sample appointment items - replace with actual data */}
              <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Program Selection Guidance
                    </h3>
                    <p className="text-sm text-gray-600">
                      March 15, 2024 at 2:00 PM
                    </p>
                    <p className="text-sm text-gray-500">with Dr. Johnson</p>
                  </div>
                  <Link
                    href="/orientation/appointments/apt-001"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View Details →
                  </Link>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Course Planning Session
                    </h3>
                    <p className="text-sm text-gray-600">
                      March 20, 2024 at 10:00 AM
                    </p>
                    <p className="text-sm text-gray-500">with Prof. Smith</p>
                  </div>
                  <Link
                    href="/orientation/appointments/apt-002"
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500">
                No more appointments scheduled.
                <Link
                  href="/orientation/appointments/book"
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  Book a new one?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
