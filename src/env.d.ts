/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user: {
      id: number;
      display_name: string;
      role: string;
    } | null;
  }
}