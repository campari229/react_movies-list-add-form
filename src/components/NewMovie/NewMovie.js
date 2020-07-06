import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    validation: {
      title: true,
      description: true,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
    },
    formIsValid: false,
  };

  formIsValid = () => {
    if (this.state.validation.title
      && this.state.validation.description
      && this.state.validation.imdbId
      && this.state.validation.imdbUrl
      && this.state.validation.imgUrl
      && this.state.movie.title !== ''
      && this.state.movie.description !== ''
      && this.state.movie.imdbId !== ''
      && this.state.movie.imdbUrl !== ''
      && this.state.movie.imgUrl !== ''
    ) {
      this.setState({
        formIsValid: true,
      });
    }
  }

  addInfo = (event) => {
    const { name, value } = event.target;
    const input = event.target;

    input.className = `${name}-input`;

    this.setState(prevState => ({
      movie: {
        ...prevState.movie,
        [name]: value,
      },
    }));

    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        [name]: true,
      },
    }));

    this.formIsValid();
  }

  textValidation = (event) => {
    const { name, value } = event.target;

    if (!value.trim()) {
      this.setState(prevState => ({
        validation: {
          ...prevState.validation,
          [name]: false,
        },
      }));
    }

    this.formIsValid();
  }

  urlValidation = (event) => {
    const input = event.target;
    const { name } = event.target;
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!pattern.test(input.value)) {
      this.setState(prevState => ({
        validation: {
          ...prevState.validation,
          [name]: false,
        },
      }));
    }

    this.formIsValid();
  }

  movieMaker = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state.movie);
  }

  render() {
    return (
      <form
        onSubmit={this.movieMaker}
        className="form"
      >
        <input
          className={this.state.validation.title
            ? 'title-input'
            : 'title-input title-input--error'
          }
          onChange={this.addInfo}
          placeholder="Movie title"
          onBlur={this.textValidation}
          name="title"
        />
        {!this.state.validation.title
          ? <p className="form-error-message">Please enter a title</p>
          : <></>
        }
        <input
          onChange={this.addInfo}
          placeholder="Movie description"
          onBlur={this.textValidation}
          className={this.state.validation.description
            ? 'description-input'
            : 'description-input description-input--error'
          }
          name="description"
        />
        {!this.state.validation.description
          ? <p className="form-error-message">Please enter a description</p>
          : <></>
        }
        <input
          onChange={this.addInfo}
          placeholder="Image URL"
          onBlur={this.urlValidation}
          className={this.state.validation.imgUrl
            ? 'imgUrl-input'
            : 'imgUrl-input imgUrl-input--error'
          }
          name="imgUrl"
        />
        {!this.state.validation.imgUrl
          ? <p className="form-error-message">Please enter a valid imgUrl</p>
          : <></>
        }
        <input
          onChange={this.addInfo}
          placeholder="IMDB URL"
          onBlur={this.urlValidation}
          name="imdbUrl"
          className={this.state.validation.imdbUrl
            ? 'imdbUrl-input'
            : 'imdbUrl-input imdbUrl-input--error'
          }
        />
        {!this.state.validation.imdbUrl
          ? <p className="form-error-message">Please enter a valid imdbUrl</p>
          : <></>
        }
        <input
          onChange={this.addInfo}
          placeholder="IMDB ID"
          onBlur={this.textValidation}
          className={this.state.validation.imdbId
            ? 'imdbId-input'
            : 'imdbId-input imdbId-input--error'
          }
          name="imdbId"
        />
        {!this.state.validation.imdbId
          ? <p className="form-error-message">Please enter a imdbId</p>
          : <></>
        }
        <button
          type="submit"
          disabled={!this.state.formIsValid}
          className="btn"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
