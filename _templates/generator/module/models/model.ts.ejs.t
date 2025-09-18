---
to: src/modules/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>/model/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.model.ts
---
import { Schema, model, Document } from "mongoose";

interface I<%= h.inflection.transform(name, ['pascalCase']) %> extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const <%= h.inflection.transform(name, ['camelCase']) %>Schema = new Schema<I<%= h.inflection.transform(name, ['pascalCase']) %>>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const <%= h.inflection.transform(name, ['pascalCase']) %> = model<I<%= h.inflection.transform(name, ['pascalCase']) %>>(
  "<%= h.inflection.transform(name, ['pascalCase']) %>",
  <%= h.inflection.transform(name, ['camelCase']) %>Schema
);