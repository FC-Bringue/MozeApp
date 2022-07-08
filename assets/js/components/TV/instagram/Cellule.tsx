
type AppProps = {
  ligne: any;
};

const Image = ({media}: any) => {
  return (
    <><p>AAAAAAAAAAAAAAA</p>
    <img src={media}/></>
  );
}

const Cellule = ({ ligne }: AppProps) => {
  console.log("ligne", ligne);
  const listeMedia = ligne.layout_content.medias;
  console.log("listeMedia", listeMedia);

  return (
    <div
      className="cellule text-white d-flex flex-column"
      style={{
        width: "45%",
        margin: "0.5em",
        padding: "0.5em",
        minHeight: "20%",
        backgroundColor: "#232932",
      }}
    >

      {listeMedia && listeMedia.map((media: any, index: any) => {
        let getImageUrl;
        media = media.media;
        console.log(index, media);
        if(media.carousel_media){
          getImageUrl = media.carousel_media[0].image_versions2.candidates[0].url;
          console.log("carousel", getImageUrl);
        }
        if(media.image_versions2){
          getImageUrl = media.image_versions2.candidates[0].url;
          console.log("image", getImageUrl);
        }

        return (
          
            <iframe src={getImageUrl} width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
          )
      })}

    </div>
  );
};

export default Cellule;
