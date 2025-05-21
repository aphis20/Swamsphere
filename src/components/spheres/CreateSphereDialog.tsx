// src/components/spheres/CreateSphereDialog.tsx
"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"; // Assuming you have a toast hook

const formSchema = z.object({
  name: z.string().min(3, "Sphere name must be at least 3 characters.").max(50),
  description: z.string().min(10, "Description must be at least 10 characters.").max(200),
  rules: z.string().optional().describe("Comma-separated DAO governance rules"),
});

type CreateSphereFormValues = z.infer<typeof formSchema>;

interface CreateSphereDialogProps {
  onSphereCreated: (data: CreateSphereFormValues) => void; // Callback after successful creation
}

export function CreateSphereDialog({ onSphereCreated }: CreateSphereDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateSphereFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      rules: "",
    },
  });

  function handleFormSubmit(data: CreateSphereFormValues) {
    // Here you would typically call an API to create the sphere
    console.log("Creating sphere:", data);
    onSphereCreated(data); 
    toast({
      title: "Sphere Created!",
      description: `The sphere "${data.name}" has been successfully proposed.`,
    });
    setIsOpen(false); // Close dialog on submit
    form.reset(); // Reset form for next time
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create Sphere
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Sphere</DialogTitle>
          <DialogDescription>
            Define your community's purpose, tasks, and governance rules.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sphere Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Eco Warriors, AI Art Gen" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe the sphere's mission and focus." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Governance Rules (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Voting period: 7 days, Proposal cost: 50 SPHERE" {...field} />
                  </FormControl>
                   <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit">Create Sphere</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
