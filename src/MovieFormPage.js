import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveMovie, fetchMovie, updateMovie } from './actions';
import MovieForm from './MovieForm';

class MovieFormPage extends React.Component {
    
      state = {
        redirect: false
      }
    
      componentDidMount = () => {
        const { match } = this.props;
        if (match.params._id) {
          this.props.fetchMovie(match.params._id);
        }
      }
    
      saveMovie = ({_id, title, cover }) => {
        if (_id) {
          return this.props.updateMovie({ _id, title, cover }).then(
            () => { this.setState({ redirect: true })},
          );
        } else {
          return this.props.saveMovie({ title, cover }).then(
            () => { this.setState({ redirect: true })},
          );
        }
      }
    
      render() {
        return (
          <div>
            {
              this.state.redirect ?
              <Redirect to="/movies" /> :
              <MovieForm
                movie={this.props.movie}
                saveMovie={this.saveMovie}
              />
            }
          </div>
        );
      }
    }
    
    function mapStateToProps(state, props) {
      const {match} = props;
      if (match.params._id) {
        return {
          movie: state.movies.find(item => item._id === match.params._id)
        }
      }
    
      return { movie: null };
    }
    
    export default connect(mapStateToProps, { saveMovie, fetchMovie, updateMovie })(MovieFormPage);