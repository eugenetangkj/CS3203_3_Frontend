import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

/**
This component represents an error alert to be displayed
*/
interface DestructiveAlertProps {
    title?: string;
    description: string;
  }
  


export function DestructiveAlert({ title = "Error", description }: DestructiveAlertProps) {
  return (
    <Alert variant="destructive" className='font-afacad'>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{ title }</AlertTitle>
      <AlertDescription>
        { description }
      </AlertDescription>
    </Alert>
  )
}
