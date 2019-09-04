import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchProfiles, appendMessage } from '../actions';

class ProfilesIndex extends Component {
  componentWillMount() {
    this.props.fetchProfiles();
  }

  componentDidMount() { // For the first channel
    console.log("subscribeActionCable" , this.props)
    this.subscribeActionCable(this.props);
  }

  componentWillReceiveProps(nextProps) { // For after switching channels
    console.log('next', nextProps )
    if (this.props.profiles != nextProps.profiles) {
      console.log('i am enter bc diff props')
      this.subscribeActionCable(nextProps);
    }
  }

  componentWillUnmount() {
    clearInterval(this.refresher);
  }

  // componentDidUpdate() {
  //   this.list.scrollTop = this.list.scrollHeight;
  // }

  subscribeActionCable = (props) => {
    App[`channel_index`] = App.cable.subscriptions.create(
      { channel: 'ChannelsChannel', name: 'index' },
      {
        received: (profiles) => {
          if (profiles.channel === props.selectedChannel) {
            console.log("enter ",profiles);
            props.appendMessage(profiles);
          }
        }
      }
    );
  }

  renderImg = (profile) => {
   return  profile.photo.url

  }




  renderProfiles() {



    return this.props.profiles.map((profile) => {
      return (
        <div className="col-12 col-sm-3">
          <a href={`/profiles/${profile.id}` } className="link-card">
            <div className="card-trip">
              <img  src={profile.photo.url ? profile.photo.url : "https://mdbootstrap.com/img/Photos/Others/men.jpg"} alt="Card image cap" />
              <div className="card-trip-infos">
                <div>
                  <h2>{profile.name}</h2>
                  <p>Short description here!</p>
                  <button>Profile</button>
                </div>
                <h2 className="card-trip-pricing">£99.99</h2>
                <img src="https://kitt.lewagon.com/placeholder/users/krokrob" className="card-trip-user avatar-bordered" />
              </div>
            </div>
          </a>
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
        <div className="container"  ref={profile => this.profile = profile}>
          <div className="row">
             { this.renderProfiles()}
          </div>
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
  return bindActionCreators({ fetchProfiles, appendMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesIndex);
