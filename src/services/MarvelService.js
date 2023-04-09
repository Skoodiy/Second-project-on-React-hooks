import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=72b1594178d077c8f8fe674cc8a53c00";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description
        ? char.description
        : "Description is missing",
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics,
    };
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _transformComics = (comics) => {
    return {
      title: comics.title,
      id: comics.id,
      pageCount: comics.pageCount
        ? `${comics.pageCount} p.`
        : "No information about the number of pages",
      description: comics.description || "Description is missing",
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      language: comics.textObjects[0]?.language || "en-us",
      price: comics.prices[0].price || "NOT AVAILABLE",
    };
  };

  return {
    getAllCharacters,
    getCharacter,
    clearError,
    process,
    setProcess,
    getAllComics,
    getComics,
  };
};

export default useMarvelService;