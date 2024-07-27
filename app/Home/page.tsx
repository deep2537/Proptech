import React from 'react'
const Home = () => {
  return (
    <div>
    <section className="bg-gray-50" id='Home'>
  <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Welcome to  <br></br>
        <strong className="font-extrabold text-blue-500 sm:block">Iota Square </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      Leading Platform for Real Estate Analytics & Development Planning
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-blue-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-700 sm:w-auto"
          href="/components/Map"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-500 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-700 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Home
