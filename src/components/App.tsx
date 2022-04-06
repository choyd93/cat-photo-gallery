import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { catAutoCompleteAsync, catListAsync, catReduceSelector, catSearchAsync } from "src/modules/Slices/catSlice";
import { useTypedSelector } from "src/modules/store";
import defaultCat from "assets/images/default_cat.jpg";
import useDebounce from "src/hooks/useDebounce";
import { Container } from "./types";

const App = () => {
  const dispatch = useDispatch();
  const debounce = useDebounce();
  const { photoList, autoCompleteContent } = useTypedSelector(catReduceSelector);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const autocompleteKeyword = autoCompleteContent.map((catsInfo, idx) => {
    const handleAutocompleteOnClick = () => {
      dispatch(catSearchAsync(catsInfo.name));
      setSearchKeyword("");
    };
    return (
      <article key={idx} onClick={handleAutocompleteOnClick}>
        {catsInfo.name}
      </article>
    );
  });

  const catPhotoList = photoList.map((item, idx) => {
    const { name, image } = item;
    const { url } = image ?? defaultCat;
    return (
      <div className="gallery__item" key={idx}>
        <span className="gallery__title">{name}</span>
        <img className="gallery__img" src={image ? url : defaultCat} alt={name} />
      </div>
    );
  });

  const handleTitleOnChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      if (value.length > 1) {
        dispatch(catAutoCompleteAsync(value));
        setSearchKeyword(value);
      }
      if (value.length === 0) {
        dispatch(catListAsync());
        setSearchKeyword("");
      }
    }, 500);
  };

  useEffect(() => {
    if (photoList.length === 0) dispatch(catListAsync());
  }, []);

  return (
    <Container>
      <h1>😸 고양이 사진 갤러리 😻</h1>
      <section>
        <form>
          <input type="text" onChange={handleTitleOnChange} placeholder="검색어를 입력해주세요." />
          <button type="submit">Search</button>
        </form>
        <div className="search__result">{searchKeyword && autocompleteKeyword}</div>
      </section>
      <section className="gallery">{catPhotoList}</section>
    </Container>
  );
};

export default App;