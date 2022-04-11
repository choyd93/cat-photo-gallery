import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { catAutoCompleteAsync, catListAsync, catReduceSelector, catSearchAsync } from "src/modules/Slices/catSlice";
import { useTypedSelector } from "src/modules/store";
import defaultCat from "assets/images/default_cat.jpg";
import useDebounce from "src/hooks/useDebounce";
import { Container } from "./styles";

const App = () => {
  const dispatch = useDispatch();
  const debounce = useDebounce();
  const { photoList, autoCompleteContent } = useTypedSelector(catReduceSelector);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

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

  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyword.length > 1) {
      dispatch(catSearchAsync(searchKeyword));
      setSearchKeyword("");
    }
  };

  useEffect(() => {
    if (photoList.length === 0) dispatch(catListAsync());
  }, []);

  return (
    <Container>
      <h1>😸 고양이 사진 갤러리 😻</h1>
      <section>
        <form onSubmit={onSubmitSearch}>
          <input type="text" onChange={handleTitleOnChange} placeholder="검색어를 입력해주세요." />
          <button type="submit">Search</button>
        </form>
        <div className="search__result">
          {searchKeyword &&
            autoCompleteContent.map(({ name }, idx) => {
              const handleAutocompleteOnClick = () => {
                dispatch(catSearchAsync(name));
                setSearchKeyword("");
              };
              return (
                <article key={idx} onClick={handleAutocompleteOnClick}>
                  {name}
                </article>
              );
            })}
        </div>
      </section>
      <section className="gallery">
        {photoList.map(({ name, image }, idx) => {
          const { url } = image ?? defaultCat;
          return (
            <div className="gallery__item" key={idx}>
              <span className="gallery__title">{name}</span>
              <img className="gallery__img" src={image ? url : defaultCat} alt={name} />
            </div>
          );
        })}
      </section>
    </Container>
  );
};

export default App;
