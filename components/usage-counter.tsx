"use client";

import { MAX_API_FREE_USAGE } from "@/constants";

import { Card, CardContent, CardFooter } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

export default function FreeTierCounter({
  apiLimitCount = 0,
}: {
  apiLimitCount: number;
}) {
  return (
    <Card className="flex flex-col gap-x-3">
      <CardContent className="space-y-2">
        <p className="text-center text-sm">
          {apiLimitCount} / {MAX_API_FREE_USAGE} Free Generations
        </p>
        <Progress value={(apiLimitCount / MAX_API_FREE_USAGE) * 100} />
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={"premium"}>
          Upgrade
          <Zap />
        </Button>
      </CardFooter>
    </Card>
  );
}
