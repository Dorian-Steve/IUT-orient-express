"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MapPin,
  Mail,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Award,
  Target,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
// Mock student data
const mockStudentData = {
  personalInfo: {
    firstName: "Jean-Paul",
    lastName: "Mballa",
    email: "jean-paul.mballa@iut-douala.cm",
    phone: "+237 6 78 90 12 34",
    dateOfBirth: "2003-05-15",
    address: "Quartier Bonanjo, Douala",
    nationality: "Cameroonian",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  academicInfo: {
    studentId: "IUT2024001",
    program: "Computer Science",
    level: "Level 2",
    semester: "Semester 3",
    gpa: 3.7,
    creditsCompleted: 45,
    totalCredits: 180,
    enrollmentDate: "2024-09-01",
    expectedGraduation: "2027-06-30",
  },
  orientationResults: {
    overallScore: 85,
    completionDate: "2024-10-15",
    status: "Completed",
    strengths: [
      "Logical Thinking",
      "Problem Solving",
      "Mathematics",
      "Technology Aptitude",
    ],
    improvements: ["Public Speaking", "Team Collaboration", "Time Management"],
    recommendations: [
      "Join the Computer Science Club to enhance collaboration skills",
      "Participate in coding competitions to strengthen problem-solving",
      "Consider taking a public speaking course",
      "Engage in group projects to improve teamwork",
    ],
  },
  savedEvents: [
    {
      id: "1",
      title: "Tech Career Fair 2024",
      date: "2024-12-15",
      time: "09:00",
      location: "IUT Douala Main Hall",
      type: "Career",
      status: "Registered",
      description: "Meet with top tech companies in Cameroon",
    },
    {
      id: "2",
      title: "Python Programming Workshop",
      date: "2024-12-08",
      time: "14:00",
      location: "Computer Lab A",
      type: "Workshop",
      status: "Upcoming",
      description: "Advanced Python programming techniques",
    },
    {
      id: "3",
      title: "Alumni Networking Event",
      date: "2024-12-20",
      time: "18:00",
      location: "Hotel Akwa Palace",
      type: "Networking",
      status: "Interested",
      description: "Connect with IUT Douala alumni in tech industry",
    },
    {
      id: "4",
      title: "Cybersecurity Seminar",
      date: "2024-11-30",
      time: "10:00",
      location: "Amphitheater B",
      type: "Seminar",
      status: "Completed",
      description: "Introduction to cybersecurity best practices",
    },
  ],
  advisorAppointments: [
    {
      id: "1",
      advisor: {
        name: "Dr. Jean Mbarga",
        title: "Academic Advisor",
        department: "Computer Science",
        email: "j.mbarga@iut-douala.cm",
        phone: "+237 6 55 44 33 22",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-12-05",
      time: "10:00",
      duration: "30 minutes",
      location: "Office 205, Building A",
      status: "Confirmed",
      agenda: "Discuss course selection for next semester",
      notes: "Bring transcript and course catalog",
    },
    {
      id: "2",
      advisor: {
        name: "Prof. Alice Nkomo",
        title: "Career Counselor",
        department: "Student Services",
        email: "a.nkomo@iut-douala.cm",
        phone: "+237 6 77 88 99 00",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-12-10",
      time: "14:30",
      duration: "45 minutes",
      location: "Career Services Office",
      status: "Pending",
      agenda: "Career planning and internship opportunities",
      notes: "Prepare resume and career goals",
    },
    {
      id: "3",
      advisor: {
        name: "Dr. Paul Essomba",
        title: "Research Supervisor",
        department: "Computer Science",
        email: "p.essomba@iut-douala.cm",
        phone: "+237 6 99 11 22 33",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      date: "2024-11-28",
      time: "16:00",
      duration: "60 minutes",
      location: "Research Lab",
      status: "Completed",
      agenda: "Discuss final year project proposal",
      notes: "Project approved - focus on AI applications",
    },
  ],
};

export function ProfileContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "confirmed":
      case "registered":
        return "bg-green-100 text-green-800";
      case "upcoming":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "interested":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "career":
        return "bg-purple-100 text-purple-800";
      case "workshop":
        return "bg-blue-100 text-blue-800";
      case "networking":
        return "bg-green-100 text-green-800";
      case "seminar":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={mockStudentData.personalInfo.avatar || "/placeholder.svg"}
              alt={mockStudentData.personalInfo.firstName}
            />
            <AvatarFallback className="text-2xl">
              {mockStudentData.personalInfo.firstName.charAt(0)}
              {mockStudentData.personalInfo.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mockStudentData.personalInfo.firstName}{" "}
              {mockStudentData.personalInfo.lastName}
            </h1>
            <p className="text-gray-600">
              {mockStudentData.academicInfo.program} •{" "}
              {mockStudentData.academicInfo.level}
            </p>
            <p className="text-sm text-gray-500">
              Student ID: {mockStudentData.academicInfo.studentId}
            </p>
          </div>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="program">Program</TabsTrigger>
          <TabsTrigger value="orientation">Orientation</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">GPA</CardTitle>
                <TrendingUp className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStudentData.academicInfo.gpa}
                </div>
                <p className="text-muted-foreground text-xs">
                  Current semester
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credits</CardTitle>
                <BookOpen className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStudentData.academicInfo.creditsCompleted}/
                  {mockStudentData.academicInfo.totalCredits}
                </div>
                <Progress
                  value={
                    (mockStudentData.academicInfo.creditsCompleted /
                      mockStudentData.academicInfo.totalCredits) *
                    100
                  }
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Orientation
                </CardTitle>
                <Award className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStudentData.orientationResults.overallScore}%
                </div>
                <p className="text-muted-foreground text-xs">Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Events</CardTitle>
                <Calendar className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStudentData.savedEvents.length}
                </div>
                <p className="text-muted-foreground text-xs">Saved events</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudentData.savedEvents
                    .filter((event) => event.status !== "Completed")
                    .slice(0, 3)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                      >
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-600">
                            {event.date} at {event.time}
                          </p>
                        </div>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">
                        Completed Cybersecurity Seminar
                      </p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">
                        Registered for Tech Career Fair
                      </p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">
                        Met with Academic Advisor
                      </p>
                      <p className="text-xs text-gray-500">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="program" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Program Information</CardTitle>
              <CardDescription>
                Your selected academic program details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Program Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Program:</span>
                      <span className="font-medium">
                        {mockStudentData.academicInfo.program}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Level:</span>
                      <span className="font-medium">
                        {mockStudentData.academicInfo.level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Semester:</span>
                      <span className="font-medium">
                        {mockStudentData.academicInfo.semester}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enrollment Date:</span>
                      <span className="font-medium">
                        {mockStudentData.academicInfo.enrollmentDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Expected Graduation:
                      </span>
                      <span className="font-medium">
                        {mockStudentData.academicInfo.expectedGraduation}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Academic Progress
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-2 flex justify-between">
                        <span className="text-sm font-medium">
                          Credits Completed
                        </span>
                        <span className="text-sm text-gray-600">
                          {mockStudentData.academicInfo.creditsCompleted}/
                          {mockStudentData.academicInfo.totalCredits}
                        </span>
                      </div>
                      <Progress
                        value={
                          (mockStudentData.academicInfo.creditsCompleted /
                            mockStudentData.academicInfo.totalCredits) *
                          100
                        }
                      />
                    </div>
                    <div>
                      <div className="mb-2 flex justify-between">
                        <span className="text-sm font-medium">Current GPA</span>
                        <span className="text-sm font-bold text-green-600">
                          {mockStudentData.academicInfo.gpa}/4.0
                        </span>
                      </div>
                      <Progress
                        value={(mockStudentData.academicInfo.gpa / 4.0) * 100}
                      />
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Status:</strong> On track for graduation in{" "}
                        {mockStudentData.academicInfo.expectedGraduation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orientation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Orientation Results</CardTitle>
              <CardDescription>
                Your comprehensive orientation assessment results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="mb-4 inline-flex h-32 w-32 items-center justify-center rounded-full bg-green-100">
                  <span className="text-3xl font-bold text-green-600">
                    {mockStudentData.orientationResults.overallScore}%
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Overall Score</h3>
                <Badge className="bg-green-100 text-green-800">
                  {mockStudentData.orientationResults.status}
                </Badge>
                <p className="mt-2 text-sm text-gray-600">
                  Completed on{" "}
                  {mockStudentData.orientationResults.completionDate}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockStudentData.orientationResults.strengths.map(
                        (strength, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{strength}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockStudentData.orientationResults.improvements.map(
                        (improvement, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-orange-600" />
                            <span className="text-sm">{improvement}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockStudentData.orientationResults.recommendations.map(
                      (recommendation, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 rounded-lg bg-blue-50 p-3"
                        >
                          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                          <p className="text-sm text-blue-800">
                            {recommendation}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Saved Events</CardTitle>
                <CardDescription>
                  Events you've registered for or shown interest in
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudentData.savedEvents.map((event) => (
                    <div key={event.id} className="rounded-lg border p-4">
                      <div className="mb-2 flex items-start justify-between">
                        <h4 className="font-semibold">{event.title}</h4>
                        <div className="flex gap-2">
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                      </div>
                      <p className="mb-2 text-sm text-gray-600">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advisor Appointments</CardTitle>
                <CardDescription>
                  Your scheduled meetings with advisors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStudentData.advisorAppointments.map((appointment) => (
                    <div key={appointment.id} className="rounded-lg border p-4">
                      <div className="mb-3 flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              appointment.advisor.avatar || "/placeholder.svg"
                            }
                            alt={appointment.advisor.name}
                          />
                          <AvatarFallback>
                            {appointment.advisor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">
                              {appointment.advisor.name}
                            </h4>
                            <Badge
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {appointment.advisor.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {appointment.advisor.department}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>
                            {appointment.date} at {appointment.time}
                          </span>
                          <span className="text-gray-500">
                            ({appointment.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{appointment.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{appointment.advisor.email}</span>
                        </div>
                      </div>

                      <div className="mt-3 rounded bg-gray-50 p-3">
                        <p className="mb-1 text-sm font-medium">Agenda:</p>
                        <p className="text-sm text-gray-600">
                          {appointment.agenda}
                        </p>
                        {appointment.notes && (
                          <>
                            <p className="mt-2 mb-1 text-sm font-medium">
                              Notes:
                            </p>
                            <p className="text-sm text-gray-600">
                              {appointment.notes}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>
                Update your personal and academic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        defaultValue={mockStudentData.personalInfo.firstName}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        defaultValue={mockStudentData.personalInfo.lastName}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={mockStudentData.personalInfo.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      defaultValue={mockStudentData.personalInfo.phone}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      defaultValue={mockStudentData.personalInfo.address}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Academic Information
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="program">Program</Label>
                    <Select defaultValue={mockStudentData.academicInfo.program}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Computer Science">
                          Computer Science
                        </SelectItem>
                        <SelectItem value="Data Science">
                          Data Science
                        </SelectItem>
                        <SelectItem value="Network Engineering">
                          Network Engineering
                        </SelectItem>
                        <SelectItem value="Cybersecurity">
                          Cybersecurity
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Current Level</Label>
                    <Select defaultValue={mockStudentData.academicInfo.level}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Level 1">Level 1</SelectItem>
                        <SelectItem value="Level 2">Level 2</SelectItem>
                        <SelectItem value="Level 3">Level 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <Textarea
                      id="interests"
                      placeholder="Your academic and career interests..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Textarea
                      id="skills"
                      placeholder="Your technical and soft skills..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
