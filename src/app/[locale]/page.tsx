import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { GithubPanel } from "@/components/sections/GithubPanel";
import { Contact } from "@/components/sections/Contact";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero dict={dict.hero} />
      <About dict={dict.about} />
      <Process dict={dict.process} />
      <Experience dict={dict.experience} />
      <Projects dict={dict.projects} />
      <Stack dict={dict.stack} />
      <GithubPanel dict={dict.github} />
      <Contact dict={dict.contact} />
    </>
  );
}
