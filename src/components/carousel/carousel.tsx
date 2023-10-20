import Image from "next/image";
import styles from "./carousel.module.css";

export interface CarouselComponentProps {
  heading: string;
  subHeading: string;
  image: string;
}
interface list {
  slides: CarouselComponentProps[];
}
const CarouselComponent = ({ slides }: list) => {
  return (
    <div className={styles.slider}>
      {slides?.map((slide, index) => {
        return (
          <div key={index} className={styles.slide}>
            <div className={styles.content}>
              <h2>{slide.heading}</h2>
              <p>{slide.subHeading}</p>
            </div>
            <Image
              src={slide.image}
              alt="carousel image"
              fill={true}
              quality={35}
              sizes="50vw"
            />
          </div>
        );
      })}
    </div>
  );
};

export default CarouselComponent;
