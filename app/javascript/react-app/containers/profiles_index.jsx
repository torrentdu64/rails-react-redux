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
            console.log(profiles);
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

    const style = {
      background: "white",
      padding: "5px"
    }

    return this.props.profiles.map((profile) => {
      return (
        <div className="row">
          <div className="offset-sm-3 col-sm-6">
            <a href={`/profiles/${profile.id}`} key={profile.id}>
              <div style={style} id="image" >

                <img src={this.renderImg(profile)} alt="" height="42" width="42" id="pic1" />
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
  return bindActionCreators({ fetchProfiles, appendMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesIndex);
