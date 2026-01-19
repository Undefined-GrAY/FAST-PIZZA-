import React from "react";
import { useSelector } from "react-redux";

export default function Username() {
  const name = useSelector((state) => state.user.username);
  if (!name) return null;
  return <div className="text-sm font-semibold hidden md:block">{name}</div>;
}
