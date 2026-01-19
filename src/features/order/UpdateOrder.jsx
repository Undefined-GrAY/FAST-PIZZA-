import React from "react";
import Button from "../../ui/Button";
import { useFetcher } from "react-router-dom";

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">MAake priority</Button>
    </fetcher.Form>
  );
}
