/* This example requires Tailwind CSS v2.0+ */
import React from "react"
import Slider from "react-slick"
import HomeCard from "./HomeCard"
import { CheckIcon } from "@heroicons/react/solid"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function HomeSteps({ progressState }) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <nav aria-label="Progress">
      <ol className="overflow-hidden">
        {progressState.map((section, index) => (
          <li
            key={index}
            className={classNames(
              index !== progressState.length - 1 ? "pb-10" : "",
              "relative"
            )}
          >
            {/* Solid Line that connects the checkmarks */}
            {index !== progressState.length - 1 ? (
              <div
                className={`-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full ${
                  progressState[index].status === "completed"
                    ? "bg-indigo-600"
                    : "bg-gray-300"
                }`}
                aria-hidden="true"
              />
            ) : null}

            {/* "Completed" */}
            {progressState[index].status === "completed" && (
              <span className="h-9 flex items-center">
                <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-indigo-600 rounded-full group-hover:bg-indigo-800">
                  <CheckIcon
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                </span>
              </span>
            )}

            {/* "Current" */}
            {progressState[index].status === "current" && (
              <span className="h-9 flex items-center" aria-hidden="true">
                <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-indigo-600 rounded-full">
                  <span className="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                </span>
              </span>
            )}

            {/* "Upcoming" */}
            {progressState[index].status === null && (
              <span className="h-9 flex items-center" aria-hidden="true">
                <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                  <span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
                </span>
              </span>
            )}

            <div
              key={progressState[index].title}
              className="lg:my-12 mx-12 lg:mx-24"
            >
              {/* Section Title */}
              <div className="section-title ml-8 flex flex-col xl:flex-row">
                <a href={section.slug}>
                  <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    {progressState[index].title}
                  </h1>
                </a>
                <span className="mt-4 xl:ml-8">
                  {progressState[index].lessons.length} Lessons
                </span>
              </div>

              {/* Section Description */}
              <p className="mt-3 ml-8 max-w-md text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-12">
                {progressState[index].description}
              </p>

              {/* Slides */}
              <Slider {...settings}>
                {progressState[index].lessons.map((lesson) => (
                  <div key={lesson.title}>
                    <HomeCard lesson={lesson} section={section} />
                  </div>
                ))}
              </Slider>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
