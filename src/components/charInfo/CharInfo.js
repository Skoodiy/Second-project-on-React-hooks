import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import setContent from '../../utils/setContent';

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [props.charId]);
  

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.charId !== prevProps.charId) {
  //     this.updateChar();
  //   }
  // }

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  return (
    <>
      <div className="char__basics">
        <img style={imgStyle} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.available ? (
          comics.items.slice(0, 10).map((item, i) => {
            return (
              <li key={i} className="char__comics-item">
                <Link to={`/comics/${item.resourceURI.match(/\d{3,6}/)}`}>
                  {item.name}
                </Link>
              </li>
            );
          })
        ) : (
          <li>There isn't any comics found</li>
        )}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
