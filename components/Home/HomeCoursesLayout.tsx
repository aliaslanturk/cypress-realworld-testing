import { useState } from "react"
import { RadioGroup } from "@headlessui/react"
import Image from "next/image"
import dynamic from "next/dynamic"

const HomeProgress = dynamic(() => import("./HomeProgress"), {})

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  content: object
  courses: string[]
  progressService: object
}

export default function HomeCoursesLayout({
  courses,
  content,
  progressService,
}: Props) {
  const [selected, setSelected] = useState(courses[0])

  return (
    <div className="features py-28 px-44 mx-auto w-full">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-full">
        <h3 className="mt-2 text-3xl font-bold text-gray-900 tracking-tight sm:text-5xl mb-24 text-center">
          Courses
        </h3>
      </div>

      <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Course Selector */}
        <div className="course-selector lg:block lg:col-span-6">
          <div className="sticky top-6">
            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className="sr-only">
                Server size
              </RadioGroup.Label>
              <div className="space-y-4">
                {courses.map((course, index) => (
                  <RadioGroup.Option
                    key={index}
                    value={course}
                    data-test={`course-${index}`}
                    className={({ checked, active }) =>
                      classNames(
                        checked
                          ? "shadow-2xl border-2 border-indigo-400"
                          : "bg-white opacity-50 border-2 border-gray-200",
                        "rounded-lg px-6 py-4 cursor-pointer flex justify-between items-center"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={() =>
                                classNames(
                                  checked ? "text-gray-900" : "",
                                  active ? "text-gray-900" : "",
                                  "text-gray-900 font-normal text-lg flex justify-between items-center"
                                )
                              }
                            >
                              <Image
                                className="h-8 w-auto sm:h-10"
                                src={`/images/home/course-icons/${course}.svg`}
                                alt="Cypress Logo"
                                height={62}
                                width={75}
                              />
                              {content[course].title}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="div"
                              className="text-gray-500"
                            ></RadioGroup.Description>
                          </div>
                        </div>
                        <RadioGroup.Description
                          as="div"
                          className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                        >
                          <a
                            href={`/${content[course].slug}`}
                            className="inline-flex px-4 py-2 text-base font-medium text-white"
                          >
                            <img
                              src={`/images/home/course-icons/chevron-right.svg`}
                              alt=""
                            />
                          </a>
                        </RadioGroup.Description>
                        <div
                          className={classNames(
                            active ? "border" : "border-2",
                            checked ? "" : "border-transparent",
                            "absolute -inset-px rounded-lg pointer-events-none"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Course Progress */}
        <main className="course-progress lg:col-span-6">
          <div className="relative bg-white overflow-hidden">
            <div className="relative px-4 sm:px-6 lg:px-8">
              <HomeProgress
                course={selected}
                content={content[selected]}
                progressService={progressService}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
