// src/components/advisor/advisor-dashboard.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssignedStudentsView } from "./assigned-students-view";
import { MeetingRequestManagement } from "./meeting-request-management";
import { AdvisorChatInterface } from "./advisor-chat-interface";
import { useAuth, useUser } from "@clerk/nextjs"; // Using useUser for consistency, useAuth also works
import { Shield, Users, Calendar } from "lucide-react";
import { AdvisorScheduleView } from "./advisor-schedule-view";
import { AdvisorAvailabilityManagement } from "./advisor-availability-management";
import { AdvisorEventManagement } from "./advisor-event-management";
import { AdvisorResourceManagement } from "./advisor-resource-management";
import { Clock, CalendarDays, BookOpen, Loader2 } from "lucide-react"; // Added Loader2

export function AdvisorDashboard() {
  const { user, isLoaded, isSignedIn } = useUser(); // Changed to useUser for more explicit data

  const [activeTab, setActiveTab] = useState("students");

  // Show a loading spinner while Clerk user data is being loaded
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
        <p className="ml-2 text-lg text-gray-700">Loading dashboard...</p>
      </div>
    );
  }

  // --- TEMPORARY BYPASS FOR DEVELOPMENT START ---
  // ORIGINAL LINE: if (user?.role !== "ADVISOR") {
  // MODIFIED LOGIC: Temporarily bypass the role check.
  const isAdvisor = true; // For development, bypass advisor role check

  if (!isAdvisor) {
    // This entire block will now be skipped as isAdvisor is always true
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <Shield className="mx-auto mb-4 h-12 w-12 text-red-500" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You do not have advisor privileges to access this section.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  // --- TEMPORARY BYPASS FOR DEVELOPMENT END ---


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Advisor Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {user?.firstName || user?.fullName || 'Advisor'}! Manage your assigned students, meetings,
          and communications
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            My Students
          </TabsTrigger>
          <TabsTrigger value="meetings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Meetings
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="availability" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
          {/* Note: 'chat' tab is present in original, adding here for completeness */}
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {/* Use an appropriate icon here */}
            Chat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <AssignedStudentsView />
        </TabsContent>

        <TabsContent value="meetings">
          <MeetingRequestManagement />
        </TabsContent>

        <TabsContent value="schedule">
          <AdvisorScheduleView />
        </TabsContent>

        <TabsContent value="availability">
          <AdvisorAvailabilityManagement />
        </TabsContent>

        <TabsContent value="events">
          <AdvisorEventManagement />
        </TabsContent>

        <TabsContent value="resources">
          <AdvisorResourceManagement />
        </TabsContent>

        <TabsContent value="chat">
          <AdvisorChatInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
}