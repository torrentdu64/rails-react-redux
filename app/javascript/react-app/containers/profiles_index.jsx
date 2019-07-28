import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchProfiles } from '../actions';

class ProfilesIndex extends Component {
  componentWillMount() {
    this.props.fetchProfiles();
  }



  renderProfiles() {

    const style = {
      background: "white",
      padding: "5px"
    }

    return this.props.profiles.map((profile) => {
      return (
        <div className="row">
          <div className="offset-sm-3 col-sm-6">
            <a href={`/profiles/${profile.id}`} key={profile.id}>
              <div style={style}>
                <h5>{profile.name}</h5>
              </div>
            </a>
          </div>
        </div>
        );
    });
  }

  render() {
    return (
      <div>
        <div className="text-center">
          <h3>list</h3>
        </div>
        <div className="">
         { this.renderProfiles()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profiles: state.profiles
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProfiles }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesIndex);
