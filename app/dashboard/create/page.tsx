import { handleSubmission } from "@/app/actions";
import SubmitButton from "@/components/general/SubmitButton";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

export default function CreateBlogroute() {
  // interal server actions

  return (
    <div>
      <Card className="max-w-lg border  mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post to share with the world
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" action={handleSubmission}>
            <div className="flex flex-col gap-2">
              <Label>TItle</Label>
              <Input required type="text" placeholder="title" name="title" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Textarea required placeholder="Content" name="content" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Image URL</Label>
              <Input required type="url" placeholder="Image URL" name="url" />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
