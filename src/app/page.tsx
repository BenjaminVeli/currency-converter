const page = () => {
  return (
    <div className="bg-white w-full flex justify-center items-center min-h-screen">
      <div className="container">
        <h1 className="text-4xl md:text-6xl font-medium text-center tracking-tighter text-customBlueLight">Currency Flow</h1>
        <p className="text-xl md:text-2xl text-gray-300  text-center my-3 md:my-6">Convertir () a ()</p>
        <div className="flex flex-col gap-8 bg-white rounded-2xl p-6 shadow-2xl">
          <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
            <div className=" rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-2xl font-semibold text-slate-900 hover:bg-gray-150 has-[input:focus]:outline has-[input:focus]:outline-2 has-[input:focus]:outline-blue-400">
              <label htmlFor="amount" className="text-sm font-normal text-gray-400">Cantidad</label>
              <input type="text" className="outline-none w-full" />
            </div>

            <div className=" rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-2xl font-semibold text-greyblue-400 hover:bg-gray-150 has-[input:focus]:outline has-[input:focus]:outline-2 has-[input:focus]:outline-blue-400">
              <label htmlFor="from" className="text-sm font-normal text-gray-400">De</label>
              {/* Input select */}
            </div>

            <div className=" rounded-lg border border-solid border-gray-300 bg-white px-4 py-2 text-2xl font-semibold text-greyblue-400 hover:bg-gray-150 has-[input:focus]:outline has-[input:focus]:outline-2 has-[input:focus]:outline-blue-400">
              <label htmlFor="to" className="text-sm font-normal text-gray-400">A</label>
              {/* Input select */}
            </div>

          </div>
          <div className="flex flex-col md:flex-row justify-between w-full gap-8">
            <p className="text-2xl text-slate-900 font-semibold w-full md:w-auto">(Resutado aca)</p>
            <button className="bg-[#18171c] rounded-sm px-10 py-1 cursor-pointer hover:bg-white border border-[#18171c] transition-all duration-500 text-white hover:text-[#18171c]">
              Enviar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default page