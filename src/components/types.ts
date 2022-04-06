import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  text-align: center;

  button {
    display: inline-block;
    color: white;
    background: dodgerblue;
    height: 3.2rem;
    line-height: 3.2rem;
    margin-left: 0.5rem;
    padding: 0 1.6rem;
    border: 0;
    border-radius: 0.5rem;
    outline: none;
  }

  input {
    width: 20rem;
    height: 2.4rem;
    line-height: 2.4rem;
    margin-bottom: 0.8rem;
    padding: 0.2rem 0.8rem;
    border: 0.2rem solid #ccc;
    border-radius: 0.4rem;
  }

  section {
    display: inline-block;
    position: relative;
  }

  .gallery {
    margin-top: 3rem;
    display: grid;
    max-width: 1024px;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
  }

  .gallery__item {
    position: relative;
    line-height: 0;
    overflow: hidden;
  }

  .gallery__title {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(90, 0, 10, 0.4);
    color: #fff;
    font-size: 1.5em;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .gallery__img {
    width: 100%;
    height: auto;
    object-fit: cover;
    filter: blur(0px);
    -webkit-filter: blur(0px);
    transition: filter 0.2s ease-in;
    transform: scale(1.1);
  }

  .gallery__item:hover {
    .gallery__title {
      opacity: 10;
    }
    .gallery__img {
      -webkit-filter: blur(2px);
      filter: blur(2px);
    }
  }

  .search__result {
    z-index: 10;
    position: absolute;
    margin: 0 auto;
    width: 20rem;
    top: 3.2rem;
  }

  .search__result article {
    width: 19.2rem;
    height: 3rem;
    line-height: 3rem;
    padding: 0 1.2rem;
    border: 0.1rem solid #ddd;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  .search__result article:not(:last-child) {
    border-bottom: 0;
  }

  .search__result article:hover {
    background: white;
    color: dodgerblue;
  }
`;
