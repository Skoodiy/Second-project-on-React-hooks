import { useState } from "react";
import { Helmet } from 'react-helmet';

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Marvel information portal"
          />
        <title>Marvel information portal</title>
      </Helmet>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSelected={onCharSelected} />

        <CharInfo charId={selectedChar} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;