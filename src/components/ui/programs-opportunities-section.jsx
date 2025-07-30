import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";


/**
 * @param {{ icon: React.ElementType, title: string, description: string, link: string }} props
 */
export function ProgramOpportunityCard({ icon: Icon, title, description, link }) {
  return (
    <Card className="flex flex-col h-full border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out bg-white rounded-lg">
      <CardHeader className="flex flex-col items-center p-6 pb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-4 border border-blue-200">
          <Icon className="h-7 w-7" />
        </div>
        <CardTitle className="text-xl font-semibold text-gray-900 text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0 text-center flex flex-col justify-between">
        <CardDescription className="text-gray-600 mb-6 flex-grow leading-relaxed">
          {description}
        </CardDescription>
        <Button asChild variant="outline" className="w-full mt-auto border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
          <Link href={link}>Discover More</Link>
        </Button>
      </CardContent>
    </Card>
  );
}