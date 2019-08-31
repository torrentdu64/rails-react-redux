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

    const style = {
      background: "white",
      padding: "5px"
    }

    return this.props.profiles.map((profile) => {
      return (
        <div className="card card-cascade" style={{display: 'inline-block', width: 'calc(100% * (1/5) - 10px - 1px)', margin: '10px 0 0 2%', flexGrow: '1' }}>


  <div className="view view-cascade overlay">
    <img className="card-img-top" src={profile.photo.url ? profile.photo.url : "https://mdbootstrap.com/img/Photos/Others/men.jpg"} alt="Card image cap" />
    <a>
      <div className="mask rgba-white-slight"></div>
    </a>
  </div>


  <div className="card-body card-body-cascade text-center">

      <h4 className="card-title"><strong>Billy Coleman</strong></h4>

    <h6 className="font-weight-bold indigo-text py-2">Web developer</h6>
     <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, ex, recusandae. Facere modi sunt, quod quibusdam.
    </p>


    <a type="button" className="btn-floating btn-small btn-fb"><i className="fab fa-facebook-f"></i></a>
        <a type="button" className="btn-floating btn-small btn-tw"><i className="fab fa-twitter"></i></a>

    <a type="button" className="btn-floating btn-small btn-dribbble"><i className="fab fa-dribbble"></i></a>

  </div>


  <div className="card-footer text-muted text-center">
    2 days ago
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
        <div className="" style={{display: 'flex', flexWrap: 'wrap'}} ref={profile => this.profile = profile}>
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
