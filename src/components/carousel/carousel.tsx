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
              <h1>{slide.heading}</h1>
              <p>{slide.subHeading}</p>
            </div>
            <img src={slide.image} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default CarouselComponent;
