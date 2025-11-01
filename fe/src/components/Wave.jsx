const WaveUp = () => {
  return (
    <div className="absolute top-15 right-0 left-0 -z-50">
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 390"
        xmlns="http://www.w3.org/2000/svg"
        class="transition delay-150 duration-300 ease-in-out"
      >
        <path
          d="M 0,400 L 0,150 C 185.7333333333333,106.93333333333334 371.4666666666666,63.86666666666666 515,84 C 658.5333333333334,104.13333333333334 759.8666666666668,187.46666666666667 907,209 C 1054.1333333333332,230.53333333333333 1247.0666666666666,190.26666666666665 1440,150 L 1440,400 L 0,400 Z"
          stroke="none"
          stroke-width="0"
          fill="#176b87"
          fill-opacity="1"
          class="path-0 transition-all delay-150 duration-300 ease-in-out"
        ></path>
      </svg>
    </div>
  );
};

const WaveDown = () => {
  return (
    <div className="absolute top-15 right-0 left-0 -z-50">
      <svg
        width="100%"
        height="100%"
        id="svg"
        viewBox="0 0 1440 690"
        xmlns="http://www.w3.org/2000/svg"
        class="transition delay-150 duration-300 ease-in-out"
      >
        <path
          d="M 0,700 L 0,262 C 175.46666666666664,319.6 350.9333333333333,377.2 517,357 C 683.0666666666667,336.8 839.7333333333333,238.8 992,210 C 1144.2666666666667,181.2 1292.1333333333332,221.6 1440,262 L 1440,700 L 0,700 Z"
          stroke="none"
          stroke-width="0"
          fill="#176b87"
          fill-opacity="1"
          class="path-0 transition-all delay-150 duration-300 ease-in-out"
          transform="rotate(-180 720 350)"
        ></path>
      </svg>
    </div>
  );
};

export { WaveUp, WaveDown };
