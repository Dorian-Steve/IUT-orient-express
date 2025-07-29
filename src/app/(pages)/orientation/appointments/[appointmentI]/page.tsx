import React from "react";

type PageProps = {
  params: Promise<{
    appointmentI: string;
  }>;
};

export default async function AppointmentPage({ params }: PageProps) {
  // Await the params since it's now a Promise in Next.js 15
  const { appointmentI } = await params;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-3xl font-bold text-gray-800">
            Appointment Details
          </h1>
          <p className="text-lg text-gray-700">
            Appointment ID:{" "}
            <span className="font-semibold text-blue-600">{appointmentI}</span>
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-md bg-blue-50 p-4">
              <h2 className="mb-2 text-xl font-semibold text-blue-800">
                Appointment Information
              </h2>
              <p className="text-blue-700">
                Details for appointment {appointmentI} will be displayed here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
