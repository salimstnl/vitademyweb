"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import MaintenancePage from "@/components/maintenance-page";

export default function Modules() {
  const [modules, setModules] = useState<Module[]>([]);
  interface Module {
    id: string;
    slug: string;
    imageURL: string;
    title: string;
    createdDate: string;
    creatorName: string;
    level: string;
    grade: string;
    planet: string;
  }
  interface Planet {
    name: string;
    longName: string;
    description: string;
  }

  useEffect(() => {
    fetch("/learning_modules_full.json")
      .then((res) => res.json())
      .then((data) => setModules(data));
  }, []);

  const planets: Planet[] = [
    {
      name: "Numera",
      longName: "🪐 Planet Numera (Mathematics)",
      description:
        "Welcome to Planet Numera! Where numbers come alive and patterns unlock the secrets of the universe. Whether you're just starting multiplication or diving into algebra, Numera is your home base for math mastery. ✨ Explore formulas, crack puzzles, and conquer calculations. Here are our most popular math modules!",
    },
    {
      name: "Physara",
      longName: "🌀 Planet Physara (Physics)",
      description:
        "Welcome to Planet Physara! A world where motion, energy, and forces rule the skies. From gravity-defying concepts to the mysteries of time and space, Physara lets you discover how the universe works—one experiment at a time. 🔬 Ready to explore the laws of nature? Check out these epic physics modules!",
    },
    {
      name: "Biotera",
      longName: "🌿 Planet Biotera (Biology)",
      description:
        "Welcome to Planet Biotera! Step into the vibrant world of life — from tiny cells to entire ecosystems. On Biotera, you'll uncover how plants grow, animals survive, and how your body keeps you going every day. 🧬 Life is all around us — let’s discover it together! Start with these awesome biology modules.",
    },
    {
      name: "Chemora",
      longName: "⚗️ Planet Chemora (Chemistry)",
      description:
        "Welcome to Planet Chemora! Where elements dance and reactions spark wonder! On Chemora, you’ll mix, measure, and explore the building blocks of matter — safely and scientifically. 💥 From colorful compounds to powerful experiments, here are some explosive chemistry modules to get you started!",
    },
  ];

  const classLevels = [
    {
      name: "SD",
    },
    {
      name: "SMP",
    },
    {
      name: "SMA",
    },
  ] as const;

  type LevelType = (typeof classLevels)[number]["name"];

  const [isLevelSelected, setIsLevelSelected] = useState(true);
  const [levelSelected, setLevelSelected] = useState<LevelType>("SD");

  const [isGradeSelected, setIsGradeSelected] = useState(true);
  const [gradeSelected, setGradeSelected] = useState("Kelas 1");

  const selectedGrades: { [key: string]: string[] } = {
    SD: ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"],
    SMP: ["Kelas 7", "Kelas 8", "Kelas 9"],
    SMA: ["Kelas 10", "Kelas 11", "Kelas 12"],
  };

  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true") {
    return <MaintenancePage />;
  }
  return (
    <div>
      <div className="relative h-[192px] w-full md:h-[256px] lg:h-[320px] xl:h-[576px] 2xl:h-[672px]">
        <Image
          src="/logo-desktop.png"
          alt="Vitademy Logo"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="hidden absolute inset-0 dark:bg-black/70 bg-white/70 w-1/4 backdrop-blur-md mx-12 my-12 p-10 md:flex flex-col justify-between gap-6 rounded-xl overflow-auto">
          <h4 className="text-md font-light text-gray-500 dark:text-gray-300">
            MODULES
          </h4>
          <h1 className="text-5xl font-black">Learn with Vitademy</h1>
          <p>
            Dive into the world of knowledge with Vitademy. From math to
            science, our expert-designed modules help you master new skills,
            expand your understanding, and unlock your potential. Start your
            learning adventure today!
          </p>
          <Button>Get Started</Button>
        </div>
      </div>
      <div className="md:grid md:grid-cols-3">
        <div className="hidden md:block sticky top-20 p-15 h-[100vh]">
          <h1 className="text-4xl font-black mb-8">On this page</h1>
          <div className="flex flex-col gap-4">
            <p className="text-gray-500 dark:text-gray-400 text-xl">
              What is Omnidirectional Learning?
            </p>
            {planets.map((planet) => (
              <p className="text-gray-500 dark:text-gray-400 text-xl">
                {planet.longName}
              </p>
            ))}
          </div>
        </div>
        <div className="col-span-2 p-15">
          <div className="flex flex-col gap-10">
            <section className="md:hidden flex flex-col justify-between gap-6">
              <h4 className="text-md font-light text-gray-500 dark:text-gray-300">
                MODULES
              </h4>
              <h1 className="text-3xl font-black">Learn with Vitademy</h1>
              <p>
                Dive into the world of knowledge with Vitademy. From math to
                science, our expert-designed modules help you master new skills,
                expand your understanding, and unlock your potential. Start your
                learning adventure today!
              </p>
            </section>
            <section id="what-level">
              <h1 className="text-3xl font-black mb-8">
                What level are you in?
              </h1>
              <div className="grid grid-cols-3 gap-3">
                {classLevels.map((classLevel, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setIsLevelSelected(true);
                      setLevelSelected(classLevel.name);

                      const grades = selectedGrades[classLevel.name];
                      if (grades && grades.length > 0) {
                        setGradeSelected(grades[0]);
                      }
                    }}
                    className={`${
                      isLevelSelected && levelSelected == classLevel.name
                        ? "bg-[#b33cfd] dark:bg-[#cd7eff] transition hover:bg-[#c86fff] dark:hover:bg-[#da9eff]"
                        : ""
                    }`}
                  >
                    {classLevel.name}
                  </Button>
                ))}
              </div>
            </section>
            <section id="what-level">
              <h1 className="text-3xl font-black mb-8">
                What grade are you in?
              </h1>
              <div className="grid grid-cols-3 gap-3">
                {selectedGrades[levelSelected].map((grade, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setIsGradeSelected(true);
                      setGradeSelected(grade);
                    }}
                    className={`${
                      isGradeSelected && gradeSelected === grade
                        ? "bg-[#b33cfd] dark:bg-[#cd7eff] transition hover:bg-[#c86fff] dark:hover:bg-[#da9eff]"
                        : ""
                    }`}
                  >
                    {grade}
                  </Button>
                ))}
              </div>
            </section>
            <section id="omnidirectional-learning">
              <h1 className="text-3xl font-black mb-8">
                What is Omnidirectional Learning?
              </h1>
              <div className="flex flex-col gap-4 leading-relaxed">
                <p>
                  Omnidirectional Learning is an approach that helps students
                  connect different concepts across subjects and learning
                  styles. Instead of learning in a straight line — like going
                  from point A to point B — omnidirectional learning encourages
                  you to explore in all directions: visually, logically,
                  practically, and creatively.
                </p>
                <p>
                  This method empowers learners to understand a topic from
                  multiple angles, making the knowledge deeper, more flexible,
                  and more fun to apply in real-life situations.
                </p>
                <p>
                  With omnidirectional learning, you don't have to follow a
                  strict step-by-step path. Start wherever you're
                  curious—division, multiplication, or even algebra—and connect
                  the dots as you go!
                </p>
              </div>
            </section>
            {planets.map((planet) => (
              <section id={planet.name} key={planet.name}>
                <h1 className="text-3xl font-black mb-8">{planet.longName}</h1>
                <div className="flex flex-col gap-4 leading-relaxed">
                  <p>{planet.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic mt-2">
                    Swipe me →
                  </p>
                  <div className="w-full flex flex-row">
                    <Swiper
                      className="cursor-grab active:cursor-grabbing"
                      modules={[Scrollbar]}
                      spaceBetween={20}
                      breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                      }}
                    >
                      {modules
                        .filter(
                          (module) =>
                            module.planet === planet.name &&
                            module.grade === gradeSelected
                        ) // Filter modules by planet
                        .map((module, index) => (
                          <SwiperSlide key={index}>
                            <Link
                              href={`/learn/modules/${encodeURIComponent(
                                module.slug
                              )}`}
                              className="group"
                            >
                              {" "}
                              <div className="flex flex-col">
                                <div className="relative overflow-hidden rounded-2xl">
                                  <Image
                                    src={module.imageURL}
                                    alt="Learning Module Thumbnail"
                                    width={400}
                                    height={200}
                                    className="rounded-2xl ease-in-out duration-200 group-hover:scale-110"
                                  />
                                </div>
                                <div className="py-5">
                                  <h1 className="text-2xl font-bold group-hover:underline">
                                    {module.title}
                                  </h1>
                                  <div className="py-5">
                                    <p className="italic">
                                      {module.createdDate}
                                    </p>
                                    <p className="uppercase text-stone-400">
                                      {module.creatorName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
