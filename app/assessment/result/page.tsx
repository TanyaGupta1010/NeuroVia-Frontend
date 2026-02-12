"use client";

import { Suspense } from "react";
import ResultClient from "./ResultClient";

export const dynamic = "force-dynamic";

export default function ResultPage() {
  return (
    <Suspense fallback={null}>
      <ResultClient />
    </Suspense>
  );
}
