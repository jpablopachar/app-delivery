import delivery from '../assets/delivery.png'
import heroBg from '../assets/heroBg.png'
import { heroData } from '../utils/data'

const HomeContainer = () => {
  return (
    <section id="home" className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center justify-center gap-2 bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Entrega por motocicleta
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] md:text-[4.5rem] font-bold tracking-wide text-headingColor">
          La entrega más rápida en{' '}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            Tu Ciudad
          </span>
        </p>
        <p className="textbase text-textColor text-center md:text-left md:w-[80%]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          illum enim? Cupiditate, quibusdam non autem rerum sint quam omnis?
          Quisquam perspiciatis possimus reiciendis nostrum recusandae tempore
          ex voluptatibus sequi quasi.
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Ordenar Ahora
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={heroBg}
          className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
          alt="hero-bg"
        />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32  py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((item) => (
              <div
                key={item.id}
                className="lg:w-190 xl:w-auto  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={item.imageSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                  alt="I1"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {item.name}
                </p>
                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {item.description}
                </p>
                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span> {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default HomeContainer
