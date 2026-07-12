"use client";

import React from "react";

// Native scroll — no Lenis, no lag, perfect stability
export default function LenisProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
