"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@clerk/nextjs";
import {
  CheckCircle,
  ArrowRight,
  Target,
  BookOpen,
  Users,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Import UI components for input
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"; // Needed for Checkbox labels

// --- Enums from your prisma.txt for demonstration ---
const academicLevels = [
  "BTS1",
  "BTS2",
  "LICENSE1",
  "LICENSE2",
  "LICENSE3",
  "MASTER1",
  "MASTER2",
  "PHD",
];

const learningStyles = [
  "VISUAL",
  "AUDITORY",
  "READ_WRITE",
  "KINESTHETIC",
  "SOLITARY",
  "SOCIAL",
  "LOGICAL",
];

const careerPaths = [
  "Computer Science",
  "Network Engineering",
  "Data Science",
  "Software Development", // Added for more options
  "Cybersecurity", // Added for more options
];
// ---------------------------------------------------

const orientationSteps = [
  {
    id: 1,
    title: "Welcome & Introduction",
    description: "Learn about the intelligent orientation system",
  },
  {
    id: 2,
    title: "Profile Setup",
    description: "Complete your personal and academic profile",
  },
  {
    id: 3,
    title: "Skills Assessment",
    description: "Evaluate your current skills and interests",
  },
  {
    id: 4,
    title: "Career Exploration",
    description: "Discover potential career paths",
  },
  {
    id: 5,
    title: "Personalized Recommendations",
    description: "Receive tailored academic and career guidance",
  },
];

const benefits = [
  {
    icon: Target,
    title: "Personalized Guidance",
    description:
      "Get recommendations tailored to your unique profile and goals",
  },
  {
    icon: BookOpen,
    title: "Academic Planning",
    description: "Discover the best academic paths for your career objectives",
  },
  {
    icon: Users,
    title: "Peer Connections",
    description: "Connect with students who share similar interests and goals",
  },
  {
    icon: Lightbulb,
    title: "Career Insights",
    description: "Learn about industry trends and future opportunities",
  },
];

export function OrientationContent() {
  const { userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New state to store user's answers for each step
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    academicLevel: "",
    interests: "",
    careerGoals: "",
    technicalSkills: "",
    softSkills: "",
    learningStyles: [] as string[], // Array for multi-select
    preferredCareers: [] as string[], // Array for multi-select
  });

  const canStartOrientation = !!userId; // Placeholder: true if user is logged in

  const handleStartOrientation = () => {
    setHasStarted(true);
    setIsModalOpen(true);
    setCurrentStep(1);
  };

  // Handler for all input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for Select components
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for Checkbox groups (for learning styles and preferred careers)
  const handleCheckboxChange = (name: string, value: string, isChecked: boolean) => {
    setFormData((prevData) => {
      const currentArray = prevData[name as keyof typeof prevData] as string[];
      if (isChecked) {
        return {
          ...prevData,
          [name]: [...currentArray, value],
        };
      } else {
        return {
          ...prevData,
          [name]: currentArray.filter((item) => item !== value),
        };
      }
    });
  };

  // Validation logic for each step
  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1:
        return true; // Introduction step, always complete
      case 2: // Profile Setup
        return (
          !!formData.fullName &&
          !!formData.studentId &&
          !!formData.academicLevel &&
          !!formData.interests &&
          !!formData.careerGoals
        );
      case 3: // Skills Assessment
        return !!formData.technicalSkills && !!formData.softSkills && formData.learningStyles.length > 0;
      case 4: // Career Exploration
        return formData.preferredCareers.length > 0;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (isStepComplete(currentStep)) {
      if (currentStep === 4) {
        // Before closing and showing results, you might want to process formData
        console.log("Final Form Data:", formData);
        setIsModalOpen(false); // Close the modal
        setCurrentStep(5); // Advance to the final step (recommendations)
      } else if (currentStep < orientationSteps.length) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      alert("Please complete all required fields for this step."); // Simple alert for missing fields
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = (stepId: number) => {
    switch (stepId) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Welcome to IUT Douala Orientation!
            </h3>
            <p className="text-gray-600">
              Our intelligent orientation system is designed to help you
              make informed decisions about your academic journey. Through a
              series of assessments and evaluations, we'll provide
              personalized recommendations that align with your interests,
              skills, and career aspirations.
            </p>
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="mb-2 font-semibold text-blue-900">
                What to Expect:
              </h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Comprehensive skills and interest assessment</li>
                <li>• Exploration of academic programs and career paths</li>
                <li>
                  • Personalized recommendations based on your profile
                </li>
                <li>• Introduction to relevant platform resources</li>
              </ul>
            </div>
          </div>
        );
      case 2: // Profile Setup - Now with inputs
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Complete Your Profile</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="Your Student ID (e.g., 21B0001)"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="academicLevel">Current Academic Level</Label>
              <Select
                name="academicLevel"
                value={formData.academicLevel}
                onValueChange={(value) => handleSelectChange("academicLevel", value)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  {academicLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Interests & Hobbies</Label>
              <Textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="e.g., Programming, reading, sports, arts..."
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="careerGoals">Career Goals</Label>
              <Textarea
                id="careerGoals"
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleInputChange}
                placeholder="e.g., Become a software engineer, data scientist..."
                rows={3}
                required
              />
            </div>
          </div>
        );
      case 3: // Skills Assessment - Now with inputs
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Skills Assessment</h3>
            <p className="text-gray-600">
              Please provide a self-assessment of your skills and select your preferred learning styles.
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technicalSkills">Technical Skills</Label>
                <Textarea
                  id="technicalSkills"
                  name="technicalSkills"
                  value={formData.technicalSkills}
                  onChange={handleInputChange}
                  placeholder="List your technical skills (e.g., Python, Java, Web Development)"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="softSkills">Soft Skills</Label>
                <Textarea
                  id="softSkills"
                  name="softSkills"
                  value={formData.softSkills}
                  onChange={handleInputChange}
                  placeholder="List your soft skills (e.g., Communication, Teamwork, Problem-solving)"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Preferred Learning Styles</Label>
                <div className="grid grid-cols-2 gap-2">
                  {learningStyles.map((style) => (
                    <div key={style} className="flex items-center space-x-2">
                      <Checkbox
                        id={`learning-style-${style}`}
                        checked={formData.learningStyles.includes(style)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("learningStyles", style, !!checked)
                        }
                      />
                      <Label htmlFor={`learning-style-${style}`}>
                        {style.replace(/_/g, " ").toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')} {/* Format enum for display */}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 4: // Career Exploration - Now with inputs (checkboxes)
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Career Exploration</h3>
            <p className="text-gray-600">
              Select the career paths that interest you the most (you can choose multiple).
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {careerPaths.map((path) => (
                <div key={path} className="flex items-center space-x-2">
                  <Checkbox
                    id={`career-path-${path.toLowerCase().replace(/\s/g, '-')}`}
                    checked={formData.preferredCareers.includes(path)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange("preferredCareers", path, !!checked)
                    }
                  />
                  <Label htmlFor={`career-path-${path.toLowerCase().replace(/\s/g, '-')}`}>
                    {path}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Hero Section - Visible when not yet started */}
        {!hasStarted && (
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Intelligent Orientation System
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
              Discover your academic path with our AI-powered orientation
              system. Get personalized recommendations based on your skills,
              interests, and career goals.
            </p>

            {!canStartOrientation && (
              <div className="mx-auto mb-8 max-w-2xl rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-yellow-800">
                  <strong>Profile Required:</strong> Please complete your
                  profile before starting the orientation process.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Benefits - Only show on initial load */}
        {!hasStarted && (
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <benefit.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Process Overview (Initial) or Personalized Recommendations (Step 5) */}
        {(!hasStarted || currentStep === 5) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">
                {currentStep === 5 ? "Your Orientation Results" : "Orientation Process"}
              </CardTitle>
              <CardDescription>
                {currentStep === 5
                  ? "Here are your personalized academic and career recommendations."
                  : "Our intelligent system guides you through a comprehensive evaluation process."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 5 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Your Personalized Recommendations
                  </h3>
                  <p className="text-gray-600">
                    Based on your profile and assessment results, here are our
                    recommendations for your academic journey:
                  </p>
                  <div className="rounded-lg bg-green-50 p-6">
                    <h4 className="mb-4 font-semibold text-green-900">
                      Recommended Academic Path
                    </h4>
                    {/* Display recommendations based on formData.preferredCareers or other logic */}
                    {formData.preferredCareers.length > 0 ? (
                      <div className="space-y-3">
                        {formData.preferredCareers.map((career) => (
                          <div key={career} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-semibold">{career} Program</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-green-800">
                        No specific career paths selected, but based on your skills, a general Science or Technology program is recommended.
                      </p>
                    )}
                    <p className="mt-4 text-sm text-green-800">
                      Further analysis based on your full profile details (like interests, technical skills: "{formData.technicalSkills}") would refine these.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Next Steps:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Explore the curriculum of recommended programs in detail</li>
                      <li>• Connect with current students and faculty in those fields</li>
                      <li>• Review prerequisite courses and admission requirements</li>
                      <li>• Schedule a meeting with an academic advisor for personalized guidance</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {orientationSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className="flex items-center gap-4 rounded-lg bg-gray-50 p-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                          <span className="font-semibold text-blue-600">
                            {step.id}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {step.description}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {index === 0
                          ? "5 min"
                          : index === 1
                            ? "10 min"
                            : index === 2
                              ? "15 min"
                              : index === 3
                                ? "10 min"
                                : "5 min"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* CTA Button - Only show on initial load */}
        {!hasStarted && (
          <div className="text-center">
            <Button
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={handleStartOrientation}
            >
              {canStartOrientation
                ? "Start Your Orientation"
                : "Get Started"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              Estimated time: 45 minutes
            </p>
          </div>
        )}
      </div>

      {/* The Modal for Steps 1-4 */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <span className="font-semibold text-blue-600">
                  {currentStep}
                </span>
              </div>
              {orientationSteps[currentStep - 1]?.title}
            </DialogTitle>
            <DialogDescription>
              {orientationSteps[currentStep - 1]?.description}
            </DialogDescription>
            <Progress
              value={(currentStep / (orientationSteps.length - 1)) * 100}
              className="h-2 mt-4"
            />
          </DialogHeader>
          <div className="py-6">
            {renderStepContent(currentStep)}
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentStep === 1}
              onClick={handlePreviousStep}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNextStep}
              // Disable "Next Step" until current step's fields are complete
              disabled={!isStepComplete(currentStep)}
            >
              {currentStep === 4 ? "View Recommendations" : "Next Step"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}