import { useState, useEffect } from "react";

import { Flex } from "@chakra-ui/react";

import { useRouter } from "next/router";

const MainCarouselMain = (props) => {
  const { width, height, yOffset, translateX, display } = props;

  const [index, setIndex] = useState(0);
  const cards = [
    {
      id: "1",

      image: "/images/landing/showcase-1.png",
      alt: "",
    },
    {
      id: "2",
      image: "/images/landing/showcase-2.png",
      alt: "",
    },
    {
      id: "3",
      image: "/images/landing/showcase-3.png",
      alt: "",
    },
  ];

  const mod = (n, m) => {
    let result = n % m;

    // Return a positive value
    return result >= 0 ? result : result + m;
  };

  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % cards.length);
    }, 5000);
  }, [index]);

  return (
    <Flex display={display}>
      {cards.map((item, i) => {
        const indexLeft = mod(index - 1, cards.length);
        const indexRight = mod(index + 1, cards.length);

        let className = "card";

        if (i === index) {
          className = "card card--active";
        } else if (i === indexRight) {
          className = "card card--right";
        } else if (i === indexLeft) {
          className = "card card--left";
        } else className = "card";

        return (
          <img
            key={item.id}
            className={className}
            src={item.image}
            alt={item.alt}
          ></img>
        );
      })}

      <style jsx>{`
        .card {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          width: ${width};
          height: ${height};
          object-fit: cover;
          cursor: pointer;
          z-index: 0;
          opacity: 0;
          transition: 1000ms;
        }

        .card--active {
          transform: translateY(${50 - yOffset}%) scale(1);
          opacity: 1;
          z-index: 99;
        }

        .card--left {
          transform: translateX(-${translateX}) translateY(${25 - yOffset}%)
            scale(0.7);
          transition: 1000ms;
          opacity: 0.5;
        }

        .card--right {
          transform: translateX(${translateX}) translateY(${25 - yOffset}%)
            scale(0.7);
          transition: 1000ms;
          opacity: 0.5;
        }
      `}</style>
    </Flex>
  );
};

export default MainCarouselMain;
