import React from "react";
import { useRouter } from "next/router";

export default function RecipeViewer() {
  const router = useRouter();
  const data = router.query;
  console.log(data);
  return (
    <div>
      <div>test:</div>
      <style jsx>{``}</style>
    </div>
  );
}
