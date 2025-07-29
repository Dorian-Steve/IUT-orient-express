import React from "react";

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            Book Your Orientation Appointment
          </h1>

          <div className="space-y-4">
            <p className="text-gray-600">
              Schedule a one-on-one session with our orientation counselors to
              help you navigate your academic journey at IUT.
            </p>

            <div className="border-t pt-4">
              <h2 className="mb-3 text-xl font-semibold">
                Available Services:
              </h2>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                <li>Program selection guidance</li>
                <li>Course planning assistance</li>
                <li>Career pathway consultation</li>
                <li>Academic requirements review</li>
              </ul>
            </div>

            <div className="mt-6 rounded-md bg-blue-50 p-4">
              <p className="text-blue-800">
                📅 Booking form will be implemented here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
