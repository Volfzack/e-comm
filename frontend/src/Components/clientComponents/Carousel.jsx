import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa";
import dslr from "../../assets/dslr.jpg";
import earbuds from "../../assets/earbuds.jpg";
import headset from "../../assets/headset.jpg";

const Carousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="embla relative" ref={emblaRef}>
      <div className="embla__container lg:h-[800px] sm:h-[400px] w-full">
        <div className="embla__slide flex items-center justify-center relative">
          <img
            className="w-full h-full object-contain"
            src={dslr}
            alt=""
          />
          <h1 className="lg:text-4xl text-amber-400 font-bold absolute top-5 left-5 lg:top-[300px] lg:left-[50px] sm:top-[100px] sm:left-7">Discount up to 20%</h1>
          <h2 className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text lg:text-3xl font-bold text-transparent absolute bottom-5 left-15 lg:bottom-[200px] lg:left-[300px] sm:bottom-[100px] sm:left-20">New digital camera!</h2>
        </div>
        <div className="embla__slide flex items-center justify-center relative">
          <img
            className="w-full h-full object-contain"
            src={earbuds}
            alt=""
          />
          <h1 className="lg:text-4xl text-amber-400 font-bold absolute top-5 left-5 lg:top-[300px] lg:left-[50px] sm:top-[100px] sm:left-7">Discount up to 15%</h1>
          <h2 className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text lg:text-3xl font-bold text-transparent absolute bottom-0 left-10 lg:bottom-[200px] lg:left-[300px] sm:bottom-[100px] sm:left-20">Stylish wireless headphones!</h2>
        </div>
        <div className="embla__slide flex items-center justify-center relative">
          <img
            className="w-full h-full object-contain"
            src={headset}
            alt=""
          />
          <h1 className="lg:text-4xl text-amber-400 font-bold absolute top-5 left-5 lg:top-[300px] lg:left-[50px] sm:top-[100px] sm:left-7">Discount up to 25%</h1>
          <h2 className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text lg:text-3xl font-bold text-transparent absolute bottom-5 left-8 lg:bottom-[200px] lg:left-[300px] sm:bottom-[100px] sm:left-20">Enjoy the music to the fullest!</h2>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
