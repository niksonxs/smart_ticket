
import { Col, UncontrolledCarousel } from "reactstrap";



const ImageCarousel = () => {

  const items = [
    {
      src: require("../../assets/img/theme/chisinau0.jpg"),
      altText: "",
      caption: "",
      header: "",
    },

    {
      src: require("../../assets/img/theme/chisinau1.jpg"),
      altText: "",
      caption: "",
      header: "",
    },

    {
      src: require("../../assets/img/theme/chisinau2.jpg"),
      altText: "",
      caption: "",
      header: "",
    },
  ];

  return (
    <>
      
            <Col className="mb-lg-auto" lg="6">
              <div className="rounded shadow-lg overflow-hidden transform-perspective-right">
                <UncontrolledCarousel items={items} />
              </div>
            </Col>
           
    </>
  );
}

export default ImageCarousel;
